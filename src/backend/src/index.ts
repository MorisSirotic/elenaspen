import bcrypt from "bcrypt";
import KnexSessionStore from "connect-session-knex";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { carts } from "./api/cart-api";
import { cartItems } from "./api/cart_item-api";
import { orderItems } from "./api/order_item-api";
import { products } from "./api/product-api";
import { users } from "./api/user-api";
import { authenticate, isAuthenticated } from "./auth";
import db from "./db";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/CartItem";
import { User } from "./models/User";
import { stripe } from "./api/stripe-api";

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

const { PORT } = process.env;

const StoreFactory = KnexSessionStore(session);

const store = new StoreFactory({ knex: db });

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:8000"]; // Update with your frontend's origin
  const origin = req.headers.origin;
  if (allowedOrigins.includes(String(origin))) {
    res.setHeader("Access-Control-Allow-Origin", String(origin));
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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

app.listen(PORT, () => {
  console.log(`[server]: Server is runninssssgs at http://localhost:${PORT}`);
});
