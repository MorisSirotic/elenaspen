import express, { Request, Response } from "express";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { Product } from "../models/Product";
import { log } from "console";

const router = express.Router();

// GET all order items in an order
router.get("/:id/order_items", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderItems = await OrderItem.query()
      .where({ order_id: id })
      .withGraphFetched("product");
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve order items" });
  }
});

// GET an order item by ID
router.get(
  "/:order_id/order_items/:id",
  async (req: Request, res: Response) => {
    const { order_id, id } = req.params;
    try {
      // make sure the order exists first
      const order = await Order.query().findById(order_id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      // then fetch the order item by ID and make sure it belongs to the order
      const orderItem = await OrderItem.query()
        .findById(id)
        .where({ order_id })
        .withGraphFetched("product");
      if (orderItem) {
        res.json(orderItem);
      } else {
        res.status(404).json({ error: "Order item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve order item" });
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  log(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
  );
  const { order_items } = req.body;
  // const { user_id } = req.session;
  //TODO Change this later to the code above. Install express-session
  const user_id = 1;

  const trx = await Order.startTransaction();

  //TODO, add shipping address implementation later, i.e get it from the User
  try {
    const order = await Order.query(trx).insert({
      user_id,
      total_amount: 0,
      shipping_address: "Testerska 12",
    });

    const orderItems = await Promise.all(
      order_items.map(async (item: any) => {
        const { product_id, quantity } = item;
        const product = await Product.query(trx).findById(product_id);

        if (!product) {
          await trx.rollback();
          return res
            .status(404)
            .json({ error: `Product with id ${product_id} not found` });
        }

        if (product.stock < quantity) {
          await trx.rollback();
          return res.status(400).json({
            error: `Product with id ${product_id} does not have enough stock`,
          });
        }

        await Product.query(trx)
          .findById(product_id)
          .patch({ stock: product.stock - quantity });

        order.total_amount += quantity * product.price;

        await Order.query(trx)
          .findById(order.id)
          .patch({ total_amount: order.total_amount });

        log("-------------------------------------------------------");
        log(order);

        return OrderItem.query(trx).insert({
          order_id: order.id,
          product_id,
          quantity,
          //   priceSold: product.price,
        });
      })
    );

    await trx.commit();
    res.json({ order, order_items: orderItems });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    res.status(500).json({ error: "Unable to create order" });
  }
});

// CREATE a new order item in an order
router.post("/:order_id/order_items", async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    // make sure the order exists first
    const order = await Order.query().findById(order_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    // then create the new order item
    const orderItem = await OrderItem.query().insert({
      order_id: order.id,
      product_id,
      quantity,
    });
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Unable to create order item" });
  }
});

// UPDATE an order item in an order
router.put(
  "/:order_id/order_items/:id",
  async (req: Request, res: Response) => {
    const { order_id, id } = req.params;
    const { product_id, quantity } = req.body;
    try {
      // make sure the order exists first
      const order = await Order.query().findById(order_id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      // then fetch the order item by ID and make sure it belongs to the order
      const orderItem = await OrderItem.query()
        .findById(id)
        .where({ order_id });
      if (orderItem) {
        // then update the order item
        await orderItem.$query().patch({ product_id, quantity });
        res.json(orderItem);
      } else {
        res.status(404).json({ error: "Order item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to update order item" });
    }
  }
);

export { router as orderItems };
