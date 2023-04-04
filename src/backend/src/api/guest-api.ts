import express, { Request, Response } from "express";
import { CartItem } from "../models/CartItem";
import { Guest } from "../models/Guest";
import { Order } from "../models/Order";
import { User } from "../models/User";
import knex from "knex";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { log } from "console";

const router = express.Router();

// Get all guests
router.get("/", async (req: Request, res: Response) => {
  try {
    const guests = await Guest.query().select();
    res.json(guests);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single guest by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const guest = await Guest.query()
      .findById(req.params.id)
      .withGraphFetched("user");
    if (!guest) throw new Error("Guest not found");
    res.json(guest);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

//Create a new guest
//router.post("/", async (req: Request, res: Response) => {});

//Create a new guest
router.post("/", async (req: Request, res: Response) => {
  const { country, address1, address2, city, zip, cartItems } = req.body;

  const { firstName, lastName, email, phone } = req.body.customer;

  const user = await User.query().findOne("email", email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Create the guest
    const guest = await Guest.query().insert({
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
      email,
      phone,
      country,
      address1,
      address2,
      city,
      zip,
    });

    // Create the order
    const order = await Order.query().insert({
      userId: guest.userId,
      totalAmount: 0,
      shippingAddress: `${address1}, ${
        address2 || ""
      }, ${city}, ${zip}, ${country}`,
    });

    // Create the order items
    const cartItemIds = cartItems.map((cartItem: CartItem) => cartItem.id);
    const cartItemsFromDB = await CartItem.query()
      .whereIn("id", cartItemIds)
      .select("product_id", "quantity");

    log(cartItemIds);
    log("--");
    log(cartItemsFromDB);
    log("------------------------||||---------------------");

    cartItemsFromDB.map(ii => log(ii.productId))

    const orderItems = cartItemsFromDB.map((cartItem: CartItem) => ({
      orderId: order.id,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    await Order.relatedQuery("items").for(order.id).insert(orderItems);

    //TODO: GET THE PRODUCT PRICE
    // Update the total amount of the order
    const totalPrice = cartItemsFromDB.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.quantity * 22,
      0
    );
    await Order.query().findById(order.id).patch({ totalAmount: totalPrice });

    // Delete the cart items
    await CartItem.query().whereIn("id", cartItemIds).delete();

    res.status(201).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

// Update an existing guest
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const guest = await Guest.query().findById(req.params.id);
    if (!guest) throw new Error("Guest not found");
    const updatedGuest = await guest.$query().patch(req.body);
    res.json(updatedGuest);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a guest by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const guest = await Guest.query().findById(req.params.id);
    if (!guest) throw new Error("Guest not found");
    await guest.$query().delete();
    res.json({ message: "Guest deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { router as guests };
