import { log } from "console";
import express, { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { Product } from "../models/Product";

const router = express.Router();

// GET an order item by ID
router.get("/", async (req: Request, res: Response) => {
  const userId = req.session.userId; // get userId from session
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // find all orders for the user
    const orders = await Order.query().where("user_id", userId);

    // find order_items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.query().where("order_id", Number(order.id));
        return { ...order, items };
      })
    );

    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
});

// GET all order items in an order
router.get("/:id/order_items", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderItems = await OrderItem.query()
      .where({ orderId: id })
      .withGraphFetched("product");
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve order items" });
  }
});

// GET an order item by ID
router.get("/:orderId/order_items/:id", async (req: Request, res: Response) => {

  const userId = req.session.userId; // get userId from session
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // find all orders for the user
    const orders = await Order.query().where("user_id", userId);

    // find order_items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.query().where("order_id", Number(order.id));
        return { ...order, items };
      })
    );

    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  log(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
  const { orderItems } = req.body;
  //const { id } = req.session;

  //TODO Change this later to the code above. Install express-session
  const userId = 1;

  const trx = await Order.startTransaction();

  //TODO, add shipping address implementation later, i.e get it from the User
  try {
    const order = await Order.query(trx).insert({
      userId,
      totalAmount: 0,
      shippingAddress: "Testerska 12",
    });
    //TODO: COME HERE
    const newOrderItems = await Promise.all(
      orderItems.map(async (item: OrderItem) => {
        const { productId, quantity } = item;
        const product = await Product.query(trx).findById(productId);

        if (!product) {
          await trx.rollback();
          return res
            .status(404)
            .json({ error: `Product with id ${productId} not found` });
        }

        if (product.stock < quantity) {
          await trx.rollback();
          return res.status(400).json({
            error: `Product with id ${productId} does not have enough stock`,
          });
        }

        await Product.query(trx)
          .findById(productId)
          .patch({ stock: product.stock - quantity });

        order.totalAmount += quantity * product.price;

        await Order.query(trx)
          .findById(Number(order.id))
          .patch({ totalAmount: order.totalAmount });

    
        return OrderItem.query(trx).insert({
          orderId: order.id,
          productId,
          quantity,
          //   priceSold: product.price,
        });
      })
    );

    await trx.commit();
    res.json({ order, newOrderItems });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    res.status(500).json({ error: "Unable to create order" });
  }
});

// CREATE a new order item in an order
router.post("/:orderId/order_items", async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;
  try {
    // make sure the order exists first
    const order = await Order.query().findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    // then create the new order item
    const orderItem = await OrderItem.query().insert({
      orderId: order.id,
      productId: productId,
      quantity,
    });
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Unable to create order item" });
  }
});

// UPDATE an order item in an order
router.put("/:orderId/order_items/:id", async (req: Request, res: Response) => {
  const { orderId, id } = req.params;
  const { productId, quantity } = req.body;
  try {
    // make sure the order exists first
    const order = await Order.query().findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    // then fetch the order item by ID and make sure it belongs to the order
    const orderItem = await OrderItem.query().findById(id).where({ orderId });
    if (orderItem) {
      // then update the order item
      await orderItem.$query().patch({ productId, quantity });
      res.json(orderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update order item" });
  }
});

export { router as orderItems };
