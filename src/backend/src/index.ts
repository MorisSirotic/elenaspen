import dotenv from "dotenv";
import express from "express";
import { products } from "./api/product-api";
import { users } from "./api/user-api";
import db from "./db";
import { carts } from "./api/cart-api";
import { cartItems } from "./api/cart_item-api";
import { orderItems } from "./api/order_item-api";

dotenv.config();

const app = express();

const { PORT } = process.env;

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

app.use(express.json());
//TODO add user authentication to verify which items the user can access
app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);
app.use("/carts", cartItems);
app.use("/orders", orderItems);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server sssmssssd");
});

app.get("/api", (req, res) => {
  res.send({ message: "Hello, I work!" });
});

app.get("/api/users", async (req, res) => {
  const ar = (await db.select("*").from("users")).at(0);

  res.send(ar);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is runninssssgs at http://localhost:${PORT}`);
});
