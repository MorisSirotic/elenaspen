import React from "react";
import { OrderItem } from "./Order";
import { useLoaderData } from "react-router-dom";
import { CartItem } from "./Cart";

export const Checkout = () => {
  const data = useLoaderData() as CartItem[];

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-lg shadow-md">
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

      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Name</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="John"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Last Name</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Doe"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Email Address</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="email@address.com"
          />
        </label>
        {data.length <= 0 && (
          <button disabled
            type="submit"
            className="bg-slate-900 opacity-5 text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Add Items To Your Cart
          </button>
        )}
        {data.length > 1 && (
          <button
            type="submit"
            className="bg-red-300 text-white font-semibold py-2 px-4 rounded-md w-full"
          >
            Pay Now
          </button>
        )}
      </form>
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
