import { useLoaderData } from "react-router-dom";
import { Product } from "../backend/src/models/Product";
import { CardProduct } from "./CardProduct";

export const ListProduct = () => {
  const data = useLoaderData() as Product[];

  return (
    <div className="flex flex-wrap justify-center my-4">
      {data.map((item) => {
        return <CardProduct key={item.id} id={item.id} name={item.name} description={item.description} price={item.price} />;
      })}
    </div>
  );
};

