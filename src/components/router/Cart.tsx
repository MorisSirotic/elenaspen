import { Link, useLoaderData } from "react-router-dom";

export const Cart = () => {
  const data = useLoaderData() as CartItem[];
  {
    console.log(data);
  }
  return (
    <div className="flex flex-col">
 

      {data.map((item, index) => {
        return  <Item key={index}
        item={{
          id: item.id,
         product: item.product,
          quantity: item.quantity,
        }}
        onIncrease={() => {
          console.log("on increase");
        }}
        onDecrease={() => {
          console.log("on increase");
        }}
        onRemove={() => {
          console.log("on remove");
        }}
      /> 
      })}
      {/* <Item
        item={{
          id: 1,
          product: {
            name: "Name of the product",
            price: 22.55,
          },
          quantity: 1,
        }}
        onIncrease={() => {
          console.log("on increase");
        }}
        onDecrease={() => {
          console.log("on increase");
        }}
        onRemove={() => {
          console.log("on remove");
        }}
      /> */}
      {data.length <= 0 && <div> Cart is empty
        </div>}

{data.length > 1 &&  <div className="w-full ">
        <Link className="" to="/checkout">
          <button className="w-full bg-red-200 p-2 mt-6">Checkout</button>
        </Link>
      </div>}
     
    </div>
  );
};
export interface CartItem {
  id: number;
  quantity: number;

  product: {
    name: string;
    price: number;
  };
}

interface CartItemProps {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export const Item: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="w-full flex items-center justify-between py-2 border-b border-gray-300 bg-slate-100">
      <div>
        <h3 className="text-lg font-medium">{item.product.name}</h3>
        <p className="text-gray-500">${Number(item.product.price).toFixed(2)}</p>
      </div>
      <div className=" flex items-center">
        <button
          onClick={() => onDecrease(item.id)}
          className="text-gray-500   focus:outline-none px-2 py-1 rounded-md text-4xl"
        >
          -
        </button>
        <p className="mx-2">{item.quantity}</p>
        <button
          onClick={() => onIncrease(item.id)}
          className="text-gray-500 focus:outline-none px-2 py-1 text-2xl  rounded-full"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 focus:outline-none  rounded-full self-start ml-8 p-0.5"
        >
          x
        </button>
      </div>
    </div>
  );
};
