import KnexSessionStore from "connect-session-knex";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import { carts } from "./api/cart-api";
import { cartItems } from "./api/cart_item-api";
import { orderItems } from "./api/order_item-api";
import { products } from "./api/product-api";
import { users } from "./api/user-api";
import db from "./db";
import { guests } from "./api/guest-api";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
//guest
export interface GuestFields {
  customer: Customer;

  country: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

declare module "express-session" {
  interface SessionData {
    guest: GuestFields;
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
//TODO add user authentication to verify which items the user can access

// app.use("/", (req: Request, res: Response) => {
//   const guest: GuestFields = {
//     customer: {
//       firstName: "Testerman",
//       lastName: "Test-a-lot",
//       email: "test@test-mail.com",
//       phone: "123456789",
//     },
//     address1: "Test Address",
//     city: "Testcity",
//     country: "Testerlandia",
//     zip: "123",
//     address2: "It also has an address1",
//   };

//   //req.session.guest = guest;

//   // req.sessionStore.get(req.sessionID, (err, sess) => {
//   //   if (sess && sess.guest) {
//   //     sess.guest.country = "Diff Country122ssss";
//   //     req.sessionStore.set(req.sessionID, sess);
//   //     req.session.save();
//   //   }

//   //res.end(`id: ${req.sessionID} \n ${req.session.guest?.country}`);
//   // });
// });

app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);
app.use("/carts", cartItems);
app.use("/orders", orderItems);
app.use("/checkout/guest", guests);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server sssmssssd");
});

app.get("/api", (req: Request, res: Response) => {
  res.send({ message: "Hello, I work!" });
});

app.get("/api/users", async (req: Request, res: Response) => {
  const ar = (await db.select("*").from("users")).at(0);

  res.send(ar);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is runninssssgs at http://localhost:${PORT}`);
});

// req.sessionStore.get(req.sessionID, (err, sess) => {
//   if (sess && sess.guest) {
//     log(sess.guest);
//     log("her----------------------------------------e");
//     sess.guest.country = "Diff Country122s";
//     req.sessionStore.set(req.sessionID, sess);
//   }
//   //req.session.save();
// });

// const n = req.session.views || 0;
// req.session.views = n + 1;
// req.session.save();
// res.end(`id: ${req.sessionID} \n ${req.session.guest?.country}`);
