import bcrypt from "bcrypt";
import KnexSessionStore from "connect-session-knex";
import { log } from "console";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import isEmail from "validator/lib/isEmail";
import { carts } from "./api/cart-api";
import { cartItems } from "./api/cart_item-api";
import { orderItems } from "./api/order_item-api";
import { products } from "./api/product-api";
import { stripe } from "./api/stripe-api";
import { users } from "./api/user-api";
import { authenticate, isAuthenticated } from "./auth";
import db from "./db";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/CartItem";
import { User } from "./models/User";
import { Mailer } from "./util/mailer";
import cors from "cors";
import fs from "fs";
import https from "https";

//guest
export interface GuestFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

declare module "express-session" {
  interface SessionData {
    userId: number;
    guest: GuestFields;
    cart: Cart;
    items: CartItem[];
  }
}

dotenv.config();

const app = express();

const { PORT, MAIL_RECEPIENT_DEV } = process.env;

const StoreFactory = KnexSessionStore(session);

export const store = new StoreFactory({ knex: db });

app.use(
  cors({
    origin: "https://elenaspen.com:5173",
    allowedHeaders: [
      "Origin",
      " X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

//TODO: CHANGE THE SECRET LATER
app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      // maxAge: 30000, // 30 seconds for testing
    },
    genid: () => randomUUID(),
    resave: true,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.json());

app.post("/encrypt", async (req, res) => {
  const { password } = req.body;

  new Promise((resolve, reject) => {
    resolve(bcrypt.hash(password, 10));
  }).then((val) => res.send(val));

  // res.json({ message: "Login successful" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with email already exists
  const existingUser = await User.query().findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with that email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user
    const user = await User.query().insert({
      name,
      email,
      password: hashedPassword,
    });

    // Set the user session
    // TODO: ADD EMAIL VERIFICATION SO PERHAPS THIS WILL BE REDUDANT IN THE FUTURE
    req.session.userId = user.id;

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/api/test",(req,res) => {
  res.send("Yep");
})
app.post("/email", (req, res) => {
  const { msg, email, subject }: any = req.body.content;

  try {
    if (!isEmail(email)) {
      res.status(403).send("email format is wrong");
      return;
    } else {
      Mailer.sendMail({
        content: msg + " " + email,
        recipient: String(MAIL_RECEPIENT_DEV),
        subject,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }

  // res.json({ message: "Login successful", user: res.locals.user });
});

app.post("/login", authenticate, (req, res) => {
  res.json({ message: "Login successful", user: res.locals.user });
});

app.get("/profile", isAuthenticated, (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

app.use("/users", users);
app.use("/products", products);
app.use("/cart", carts);
app.use("/carts", cartItems);
app.use("/orders", orderItems);
app.use("/stripe", stripe);
// Load the SSL certificates
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/elenaspen.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/elenaspen.com/fullchain.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/elenaspen.com/chain.pem",
  "utf8"
);

const credentials = {
  // Create a credentials object with the SSL certificates
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpsServer = https.createServer(credentials, app); // Create an HTTPS server with the S$

httpsServer.listen(3001, () => {
  // Start the HTTPS server on port 3001
  console.log("Server listening on port 3001 with HTTPS!");
});
