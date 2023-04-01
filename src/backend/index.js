import express from "express";
import { config } from "dotenv";

import knex from "knex";

config();

console.log();
const app = express();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME, DB_CLIENT, PORT } =
  process.env;

const db = knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:8000"]; // Update with your frontend's origin
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
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




app.get("/", (req, res) => {
  res.send("Express + TypeScript Server ssmss");
});

app.get("/api", (req, res) => {
  res.send({ message: "Hello, I work!" });
});

app.get("/api/users", async (req, res) => {
  const ar = (await db.select("*").from("users")).at(0);

  res.send(ar);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
