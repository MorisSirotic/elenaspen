import { log } from "console";
import express, { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Guest } from "../models/Guest";
import { User } from "../models/User";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// Get a specific cart
router.get("/", async (req: Request, res: Response) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(204).send();
  }

  try {
    const cart = await Cart.query()
      .where("user_id", userId)
      .withGraphFetched("cart_items.product")
      .first();

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/",
  async (req: Request<{ guest: Guest; items: CartItem[] }>, res: Response) => {
    const { items } = req.body;

    const userId = req.session.userId;

    const sessionCart = req.session.cart;
    const sessionGuest = req.session.guest;
    const sessionCartItems = items;

    let cart: any;

    if (userId) {
      // Request is from the user, not the guest
      const user = await User.query().findById(userId);
      if (user) {
        // If user is logged in, create a cart for the user
        cart = await Cart.query().findOne({ user_id: user.id });
        if (!cart) {
          cart = await Cart.query().insert({ userId: user.id });
        }

        // Add items to the user's cart
        for (const item of items) {
          const existingItem = await CartItem.query().findOne({
            cart_id: cart.id,
            product_id: item.productId,
          });
          if (existingItem) {
            existingItem.quantity += item.quantity;
            await existingItem
              .$query()
              .update({ quantity: existingItem.quantity });
          } else {
            await CartItem.query().insert({
              cartId: cart.id,
              productId: item.productId,
              quantity: item.quantity,
            });
          }
        }
      }
    } else {
      // Request is from a guest

      log(sessionCartItems);
      if (sessionGuest && sessionCart) {
        // Guest is still in session, update its cart
        cart = sessionCart;
        for (const item of items) {
          const existingItem = sessionCartItems.find(
            (sessionItem: CartItem) => sessionItem.productId === item.productId
          );
          if (existingItem) {
            existingItem.quantity += item.quantity;
            await existingItem
              .$query()
              .update({ quantity: existingItem.quantity });
          } else {
            await CartItem.query().insert({
              cartId: item.cartId,
              productId: item.productId,
              quantity: item.quantity,
            });
          }
        }
      } else {
        // Guest is either new or its session has expired
        const user = await User.query().insert({});
        const newGuest = await Guest.query().insert({ userId: user.id });
        cart = await Cart.query().insert({ userId: user.id });

        // Add items to the guest's cart
        for (const item of items) {
          await CartItem.query().insert({
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
          });
        }

        req.session.cart = cart;
        req.session.guest = newGuest;
        req.session.userId = user.id;
        req.session.save();
      }
    }

    const cartItems = await CartItem.query()
      .where({ cart_id: cart!.id })
      .withGraphFetched("product");

    res.status(201).json({ cart: cart, items: cartItems });
  }
);

export { router as carts };
