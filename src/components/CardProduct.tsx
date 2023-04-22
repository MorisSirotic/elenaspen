import { useState } from "react";
import {
  addItemsToCart,
  getSessionId,
  setSessionId,
} from "../services/Cart.service";

export const CardProduct = (props: {
  id: string;
  name: string;
  description: string;
  price: number;
}) => {
  const [buttonText, setButtonText] = useState("Add");
  const [isDisabled, setIsDisabled] = useState(false);

  const disabledButton = isDisabled
    ? "bg-gray-400 text-white hover:bg-gray-400"
    : "";

  const [isError, setIsError] = useState(false);

  const errorButton = isError
    ? "flex self-center text-red-500 font-semibold text-2xl"
    : "hidden";

  return (
    <div className="flex flex-col sm:flex-row m-2  items-center bg-orange-200 shadow-lg">
      <img
        className="w-full h-full md:w-3/6 max-w-sm  object-cover"
        src="https://via.placeholder.com/400/300"
      />

      <div className="flex h-full flex-col w-full self-start p-8  max-w-sm ">
        <span className="text-2xl font-semibold pb-2 self-center">
          {props.name}
        </span>
        <span className="pb-2 self-center"> {props.description}</span>
        <div className="flex justify-around mt-auto p-2">
          <div>
            <span className="inline-block  rounded-full px-3 py-1 text-2xl font-semibold text-gray-700 mr-2">
              ${props.price}
            </span>
          </div>
          <button
            disabled={isDisabled}
            onClick={() => {
              setButtonText("Added");
              setIsDisabled(true);

              addItemsToCart([{ productId: props.id, quantity: 1 }])
                .then((res) => {
                  if (!getSessionId()) {
                    setSessionId(res.sessId);
                  }

                  setTimeout(() => {
                    setButtonText("Add");
                    setIsDisabled(false);
                    setIsError(false);
                  }, 500);
                })
                .catch((err) => {
                  console.log(err);

                  setButtonText("-");
                  setIsError(true);
                });
            }}
            className={`text-2xl w-full bg-orange-300 rounded-full  hover:bg-yellow-400 ${disabledButton}`}
          >
            {buttonText}
          </button>
        </div>
        <div className={`${errorButton}`}>
          Error Adding Item To The Cart. Please Try Again Later
        </div>
      </div>
    </div>
  );
};
