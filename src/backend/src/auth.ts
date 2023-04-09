import bcrypt from "bcrypt";
import express from "express";
import { Model } from "objection";
import db from "./db";
import { User } from "./models/User";

// Configure Objection.js
Model.knex(db);

// Define custom authentication middleware
export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ message: "Missing email or password" });
    return;
  }

  try {
    const user = await User.query().where({ email }).first();

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
  
    const isPasswordValid =  bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    req.session.userId = user.id;
    res.locals.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Example usage in Express.js route

// Define isAuthenticated middleware
export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  User.query()
    .findById(userId)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};
