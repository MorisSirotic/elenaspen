import express from "express";
import dotenv from "dotenv";
import db from "./db";

dotenv.config();

const app = express();

const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME, DB_CLIENT, PORT } =
  process.env;

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

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server sssmssd");
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
