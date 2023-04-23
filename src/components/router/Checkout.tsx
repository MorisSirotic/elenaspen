import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getSessionId } from "../../services/Cart.service";
import { CartItem } from "./Cart";
import Stripe from "./Stripe";

export const Checkout = () => {
  const stripePromise = loadStripe(
    "pk_live_51MuJc4I5TlZGfanfHahFq0ejZ0wn2wsYUGjGfkxPbgHYyjYOKDyxKPe7FgR0eiNODCR2sl4fhYJczbwqu9qrOvza00y2SBNJxa"
  );

  const data = useLoaderData() as CartItem[];
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://elenaspen.com/api/stripe/cpi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(getSessionId()),
      },
      body: JSON.stringify({ items: data, sessId: getSessionId() }), // Include sessId in the request body
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-lg ">
      <div className="pb-8">
        {data.map((item, index) => {
          return (
            <CheckoutItem
              key={index}
              name={item.product.name}
              price={item.product.price}
            />
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-6"></h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance: { theme: "stripe" } }}
          stripe={stripePromise}
        >
          <Stripe />
        </Elements>
      )}
    </div>
  );
};

export const CheckoutItem = (props: { name: string; price: number }) => {
  return (
    <div className="w-full flex justify-around my-2 border-b">
      <img className="w-20" src="https://via.placeholder.com/400/300" />
      <div className="flex items-center p-4">{props.name}</div>

      <div className="flex items-center p-4">€{props.price}</div>
    </div>
  );
};

