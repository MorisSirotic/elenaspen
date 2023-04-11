import { useEffect } from "react";
import { CartService, setSessionId } from "./services/Cart.service";

const items = [
  {
    productId: 1,
    quantity: 3,
  },
  {
    productId: 2,
    quantity: 20,
  },
];

export const App = () => {
  const cartService = new CartService();

  // Store userId in local storage when it changes
  useEffect(() => {}, []);

  const handleCartGet = () => {
    cartService.getCart().then((res) => {
      console.log("GET Cart response below");

      console.log(res);
      console.log("||||||||||||||||||||||||||||");
    });
  };

  const handleCartPost = () => {
    cartService.postCart(items).then((res) => {
      console.log("POST Cart response below");
      setSessionId(res.sessId);
      console.log(res);

      console.log("||||||||||||||||||||||||||||");
    });
  };

  return (
 <>
<button onClick={handleCartPost}> POST</button>
 </>
  );
};
