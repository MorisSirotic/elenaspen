import express, { Request, Response, NextFunction } from "express";
import db from "../db";
import { User } from "../models/User";
import { log } from "console";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

//GET all users
router.get("/", async (req: Request, res: Response) => {
  const users = await db.select().from("users");
  res.json(users);
});

// GET a single user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const user = await User.query().findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//TODO Implement save User
// POST a new user
router.post("/", async (req: Request, res: Response) => {
  log(req.body);
  try {
    const user = await User.query().insert(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//TODO Implement save User
// PUT/UPDATE a user by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.query().patchAndFetchById(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a user by ID
// router.delete("/:id", async (req:Request, res:Response) => {
//   const numRowsDeleted = await User.query().deleteById(req.params.id);
//   if (numRowsDeleted === 1) {
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

export { router as users };
