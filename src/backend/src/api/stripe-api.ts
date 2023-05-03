import { log } from "console";
import express, { NextFunction, Request, Response } from "express";
import { Stripe } from "stripe";
import { store } from "..";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/CartItem";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";
import { Product } from "../models/Product";
import { Mailer } from "../util/mailer";

const router = express.Router();

const { STIPE_PRIVATE_KEY } = process.env;
const { MAIL_RECEPIENT_DEV, MAIL_OWNER } = process.env;
router.use(express.static("public"));
router.use(express.json());

const stripe = new Stripe(String(STIPE_PRIVATE_KEY), {
  apiVersion: "2022-11-15",
});

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

const calculateOrderAmount = (items: any[]) => {
  let total = 1;
  if (items && items.length >= 1) {
    items.map((i) => {
      log(i.product.price);
      total += i.product.price * 1; //i.quantity;
    });
  }
  return (total * 100).toFixed(2);
};
const calculateFee = (total: number) => {
  return total * 0.03 + 30;
};
// router.post("/cpi", async (req, res) => {
//   const { items } = req.body;

//   const session = req.headers.authorization;
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: Number(calculateOrderAmount(items)),
//     currency: "eur",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//     metadata: {
//       items: JSON.stringify(items),
//       sessId: String(session),
//     },
//   });

//   res.json({
//     clientSecret: paymentIntent.client_secret,
//     items: items,
//   });
// });

const createOrder = async (
  session: string,
  email: string,
  orderItems: any[]
) => {
  if (!session || !orderItems) {
    log("first if statment(shouldn't be here)");
    log("SESSION:" + session);
    log("ITEMS:" + orderItems);
    return;
  }

  log("BEGINING");
  const sessionData = await new Promise<any>((resolve, reject) => {
    store.get(session, (err: any, session: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
  const trx = await Order.startTransaction();

  //TODO, add shipping address implementation later, i.e get it from the User
  try {
    const order = await Order.query(trx).insert({
      userId: sessionData.userId,
      totalAmount: 0,
      shippingAddress: email,
    });
    //TODO: COME HERE
    await Promise.all(
      orderItems.map(async (item: OrderItem) => {
        const { productId, quantity } = item;
        log("MAPPING ITEM IN THE LOOP");
        log("ID:" + productId);
        log("QUANTITY:" + quantity);
        const product = await Product.query(trx).findById(productId);
        log("PRODUCT:" + product);

        if (!product) {
          log("PRODUCT NOT FOUND");
          await trx.rollback();
          return;
        }

        // if (product.stock < quantity) {
        //   await trx.rollback();
        //   //TODO: throw an error here
        //   return;
        // }

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
        });
      })
    );

    await trx.commit();

    log("MAILER DEBUG U STRIPUI HHHEHEHEH");
    const cart = await Cart.query().where({ user_id: sessionData.userId });
    log("CART" + cart[0]);

    const cartItems = await cart[0]
      .$relatedQuery("cart_items")
      .withGraphFetched("product");

    log("CARTITEMS CONST" + cartItems);
    Mailer.sendMail({
      content: Mailer.generateHTML(
        `Your order has been received. You will be emailed by the author to provide more details about your request.`,
        cartItems
      ),
      recipient: String(MAIL_RECEPIENT_DEV),
      subject: `Order #${order.id}`,
    });

    Mailer.sendMail({
      content: Mailer.generateHTML(
        `Items ordered`,
        cartItems,
        "Customer: " + email
      ),
      recipient: String(MAIL_OWNER),
      subject: `New Order From Customer | Order #${order.id}`,
    });

    log("MAIL RECEIEPIEN DEV: " + String(MAIL_RECEPIENT_DEV));
    CartItem.query()
      .delete()
      .whereIn(
        "product_id",
        cartItems.map((item: any) => item.productId)
      )
      .then((aj) => {
        log("||||||||||||||||||||||||||");
        log(aj);
      })
      .catch((err) => {
        log("log cart item error");
        log(err);
      });

   
  } catch (error) {
    log(error);
    log("error u kreaciji order, trx rollback");
    await trx.rollback();
  }
};

router.post("/cpi", async (req, res) => {
  const { items } = req.body;

  const formattedItems: any = [];

  //const price = await stripe.prices.retrieve("your_price_id");

  const session = req.headers.authorization;

  items.map((item: any) => {
    const { id, cartId, productId, quantity } = item;

    formattedItems.push({ id, cartId, productId, quantity });
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(calculateOrderAmount(items)),
    // transfer_data: {
    //   destination: "acct_1N0BCYIGigXASqGF",
    //   amount: Number(calculateFee(Number(calculateOrderAmount(items))).toFixed(0)),
    // },
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      items: JSON.stringify(formattedItems),
      sessId: String(session),
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    items: formattedItems,
  });
});

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (request, response) => {
    const event = request.body;

    switch (event.type) {
      case "payment_intent.succeeded":
        const _paymentIntent = event.data.object;

        log("i work");
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      case "charge.succeeded":
        const paymentIntent = event.data.object;

        // Retrieve the items data from the metadata
        const items = JSON.parse(paymentIntent.metadata.items);

        const session = paymentIntent.metadata.sessId;

        const email = event.data.object.billing_details.email;
        createOrder(session, email, items);
        log("I GOT THE RESPONSE FORM STRIPE");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
export { router as stripe };
