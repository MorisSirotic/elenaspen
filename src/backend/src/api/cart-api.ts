import { log } from "console";
import express, { NextFunction, Request, Response } from "express";
import { store } from "..";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Guest } from "../models/Guest";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { User } from "../models/User";
import { Mailer } from "../util/mailer";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

// Get a specific cart
router.get("/", async (req: Request, res: Response) => {
  const session = req.headers.authorization;
  log(session);

  if (!session) {
    res.status(204).send();
    return;
  }

  //const sessionId = req.params.id; // Get session ID from request params

  // Retrieve session data from KnexSessionStore
  const sessionData = await new Promise<any>((resolve, reject) => {
    store.get(session, (err: any, session: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });

  const userId = sessionData.userId;

  if (!userId) {
    res.status(401).json({ error: "Session expired" });
    return;
  }

  try {
    const cart: any = await Cart.query()
      .where("user_id", userId)
      .withGraphFetched("cart_items.product")
      .first();

    if (!cart) {
      return res.status(404).json({ error: "Cart is empty" });
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

    //prevents incorrect type from being passed
    if (!items && !Array.isArray(items)) {
      res.status(404).send({ error: "Bad items array format" });
      return;
    }

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

    res
      .status(201)
      .json({ cart: cart, items: cartItems, sessId: req.session.id });
  }
);

router.post("/checkout", async (req, res) => {
  // 1. Get the user/guest from the session
  const { userId } = req.session;
  if (!userId) {
    res.status(500).send({ error: "Invalid Request. ID:I-95" });
    return;
  }

  const user = await User.query().findOne({ id: userId });
  const account = user;

  if (!account) {
    res.status(404).send({ error: "User is missing" });
    return;
  }

  const sessionCart = await Cart.query().findOne({ user_id: account.id });

  if (!sessionCart) {
    res.status(404).send({ error: "Cart is missing" });
    return;
  }

  const cartItems = await CartItem.query()
    .where({ cart_id: sessionCart!.id })
    .withGraphFetched("product");

  // 2. Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item: any) => total + item.product.price * item.quantity,
    0
  );
  //TODO ADD SHIPPING ADDRESS
  // 3. Create the order
  const order = await Order.query().insert({
    userId: account.id,
    totalAmount: totalPrice,
    shippingAddress: "",
  });

  // 4. Create the order items
  const orderItems = cartItems.map((item: CartItem) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
  }));

  // Insert order items one by one
  for (const orderItem of orderItems) {
    await OrderItem.query().insert(orderItem);
  }

  //Send Email
  const { MAIL_RECEPIENT_DEV } = process.env;

  for (const cartItem of cartItems) {
    const inner: any = cartItem;
    log(inner.product);
  }

  Mailer.sendMail({
    content: Mailer.generateHTML(`Your order has been received.`, cartItems),
    recipient: String(MAIL_RECEPIENT_DEV),
    subject: `Order #${order.id}`,
  });

  // 5. Delete the cart
  // await CartItem.query()
  //   .delete()
  //   .whereIn(
  //     "product_id",
  //     cartItems.map((item: CartItem) => item.productId)
  //   );
  // await Cart.query().deleteById(sessionCart.id);

  // 6. Send response
  res.status(200).json({ order: "Success!" });
});

export { router as carts };
