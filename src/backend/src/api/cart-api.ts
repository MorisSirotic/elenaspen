import express, { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { log } from "console";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// Get all carts
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const carts = await Cart.query();
//     res.json(carts);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get a specific cart
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const cart = await Cart.query().findById(req.params.id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new cart
router.post("/", async (req: Request, res: Response) => {
  log("klmkmmk")
  try {
    const cart = await Cart.query().insert(req.body);
    res.json(cart);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update a specific cart
// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     const cart = await Cart.query().findById(req.params.id);
//     if (cart) {
//       const updatedCart = await Cart.query().updateAndFetchById(
//         req.params.id,
//         req.body
//       );
//       res.json(updatedCart);
//     } else {
//       res.send("Cart doesn't exist");
//     }
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// });

export { router as carts };
