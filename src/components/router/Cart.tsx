import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getSessionId } from "../../services/Cart.service";

export const Cart = () => {

  const data = useLoaderData() as any[];

  const [uiData, setUiData] = useState(data);

  useEffect(() => {

  }, [uiData])

  return (
    <div className="flex flex-col items-center">
      {uiData.map((item, index) => {
        return (
          <Item
            key={index}
            item={{
              id: item.id,
              product: item.product,
              quantity: item.quantity,
            }}
            onIncrease={() => {
           
            }}
            onDecrease={() => {
           
            }}
            onRemove={() => {
             
              axios
                .delete(`https://elenaspen.com/api/cart/${item.id}`, {
                  headers: { Authorization: getSessionId() },
                })
                .then((res) => {
                  if (res.status === 200) {
                    // Remove the item from the array of items
                    const updatedItems = [...data]; // Make a copy of the items array
                    updatedItems.splice(index, 1); // Remove the item at the given index
                    setUiData(updatedItems); // Update the state with the updated items array
                  }
                });
            }}
          />
        );
      })}

      {uiData.length <= 0 && <div className="h-fit"> Cart is empty</div>}

      {uiData.length >= 1 && (
        <div className="w-full max-w-sm">
          <Link className="" to="/checkout">
            <button className="w-full bg-orange-300 hover:bg-orange-400 p-2 mt-6">
              Checkout
            </button>
          </Link>
        </div>
      )}
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
    <div className="w-full max-w-md flex items-center justify-between py-2 border-b border-gray-300 p-4">
      <div>
        <h3 className="text-lg font-medium">{item.product.name}</h3>
        <p className="text-gray-500">
          ${Number(item.product.price).toFixed(2)}
        </p>
      </div>

      {/* <div className="flex items-center m-auto">
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
      </div> */}

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 focus:outline-none  rounded-full self-start ml-8 p-0.5"
      >
        x
      </button>
    </div>
  );
};
