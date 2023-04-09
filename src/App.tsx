import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Top } from "./components/Top";
import { MyComponent } from "./components/stateful/MyComponent";
import { CartService, setSessionId } from "./services/Cart.service";

type Props = {
  id: string;
  name: string;
};

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

  const [user, setuser] = useState<Props>();

  const [cart, setCart] = useState();

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
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-100">
      <Navbar />

      <Top />

      <Footer />

      {user?.name}

      <div>
        <button className="w-6 h-6 m-2 bg-slate-100" onClick={handleCartGet}>
          Get Cart
        </button>
        <button className="w-6 h-6 m-2 bg-slate-500" onClick={handleCartPost}>
          Post Cart
        </button>
      </div>

      <MyComponent />
    </div>
  );
};
