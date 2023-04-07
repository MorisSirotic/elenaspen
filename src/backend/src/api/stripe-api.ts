import express, { Request, Response, NextFunction } from "express";
import db from "../db";
import { Stripe } from "stripe";
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

const { STIPE_PRIVATE_KEY } = process.env;

router.use(express.static("public"));
router.use(express.json());

const stripe = new Stripe(String(STIPE_PRIVATE_KEY), {
  apiVersion: "2022-11-15",
});

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

const calculateOrderAmount = (items: any[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/cpi", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

export { router as stripe };
