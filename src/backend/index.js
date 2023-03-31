import express from "express";
import { config } from "dotenv";

config();

console.log();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server ssmss");
});

app.get("/api", (req, res) => {
  res.send({ message: "Hello, I work!" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
