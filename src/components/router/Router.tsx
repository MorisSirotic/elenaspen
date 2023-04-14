import { createBrowserRouter } from "react-router-dom";
import { CartService } from "../../services/Cart.service";
import { Top } from "../Top";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Items } from "./Items";
import { Order } from "./Order";
import { Root } from "./Root";
import { ProductService } from "../../services/Product.service";
const cartService = new CartService();
const productService = new ProductService();

const getCartData = async () => {
  return await cartService.getCart().then((res) => {
    return res;
  });
};

const getProductData = async () => {
  return await productService.getProducts().then((res) => {
    return res;
  });
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Top />,
        loader: async () => {
          return getProductData();
        }
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: async () => {
          return getCartData();
        },
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/items/:searchTerm",
        element: <Items />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: async () => {
          return getCartData();
        },
      },
    ],
  },
  {
    path: "/test",
    element: <div>Test</div>,
  },
]);
