import express, { NextFunction, Request, Response } from "express";
import db from "../db";
import { Product } from "../models/Product";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// GET all products
router.get("/", async (req: Request, res: Response) => {
  const products = await db.select().from("products");
  res.json(products);
});

// GET a single product by ID
router.get("/:id", async (req: Request, res: Response) => {
  const product = await Product.query().findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// POST a new product
// router.post("/", async (req: Request, res: Response) => {
//   log(req.body);
//   try {
//     const product = await Product.query().insert(req.body);
//     res.json(product);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// PUT/UPDATE a product by ID
// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const product = await Product.query().patchAndFetchById(
//       req.params.id,
//       req.body
//     );
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// DELETE a product by ID
// router.delete("/:id", async (req: Request, res: Response) => {
//   const numRowsDeleted = await Product.query().deleteById(req.params.id);
//   if (numRowsDeleted === 1) {
//     res.sendStatus(204);
//   } else {
//     res.status(404).json({ message: "Product not found" });
//   }
// });

export { router as products };
