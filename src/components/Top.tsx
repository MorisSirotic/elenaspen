import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import woman from "../assets/woman-discount.png";
import { ListProduct } from "./ListProduct";
import { ProductItem } from "./router/Items";
import { useLoaderData } from "react-router-dom";
import { Product } from "../backend/src/models/Product";

export const Top = () => {
  return (
    <div className="flex flex-col h-full w-full bg-gray-200 items-center">
      <div className="flex w-full h-full items-center md:items-stretch flex-col md:flex-row justify-between max-w-6xl  bg-red-500 ">
        <div className="flex flex-col max-w-[400px] justify-evenly p-4">
          <h2 className="text-2xl">Healthy Skin Is A Reflection Of Wellness</h2>
          <span className="text-sm py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            voluptatum natus magnam!
          </span>

          <span className="underline font-bold py-2">View All Products</span>

          <div className="flex w-full  self-end justify-between">
            <div className="flex w-full">
              <span className="flex w-6 h-6 bg-slate-400 rounded-full border-2 items-center justify-center">
                <span className="bg-black w-1 h-1 rounded-full " />
              </span>
              <span className="flex w-6 h-6 bg-slate-400 rounded-full border-2 items-center justify-center">
                <span className="bg-black w-1 h-1 rounded-full " />
              </span>
              <span className="flex w-6 h-6 bg-slate-400 rounded-full border-2 items-center justify-center">
                <span className="bg-black w-1 h-1 rounded-full " />
              </span>
              <span className="flex w-6 h-6 bg-slate-400 rounded-full border-2 items-center justify-center">
                <span className="bg-black w-1 h-1 rounded-full " />
              </span>
            </div>

            <div className="flex">
              <FaChevronLeft />
              <FaChevronRight />
            </div>
          </div>
        </div>

        <div className="flex self-center w-80 h-80 sm:w-96 sm:h-96 bg-yellow-400 rounded-full ">
          <div className="m-auto">ssssssssssssssssss</div>
        </div>
      </div>

      <div className="flex w-full">
        <CardTop title="Skincare" message="Organic ingredients" />
        <CardTop title="Makeup" message="Perfect and natural makeup" />
        <CardTop title=" What's New" message="Shop Our New Arrivals" />
      </div>
      <ListProduct />
      <div className="flex flex-col  sm:w-full md:flex-row p-2 justify-center items-center">
        <div className="w-full max-w-5xl h-96 min-w-[300px] p-2">
          <CardMid
            title="20% Off Spring Sale"
            message="On All Products"
            image={woman}
            bottomTextVisible
          />
        </div>

        <div className="flex flex-col">
          <div className="h-56 mb-4">
            <CardMid
              title="Free Shipping"
              message="On All Orders Over €50"
              image={woman}
            />
          </div>

          <div className=" h-56">
            <CardMid
              title="Collect Points For Extra Discounts"
              message="€1 equals 1 point."
              image={woman}
              bottomTextVisible
            />
          </div>
        </div>
      </div>
      <ListProduct />

      <div className="flex items-center flex-wrap sm:flex-nowrap">
        <CardBottom />
        <CardBottomMailForm />
      </div>
    </div>
  );
};

const CardTop = (props: { title: string; message: string }) => {
  const { title, message } = props;
  return (
    <div className="container bg-red-200 h-52 m-2 rounded-3xl p-2">
      <h2>{title}</h2>
      <p>{message}</p>

      <span>Learn More</span>
    </div>
  );
};

const CardMid = (props: {
  title: string;
  message: string;
  image: string;
  bottomTextVisible?: boolean;
}) => {
  const { title, message, image, bottomTextVisible } = props;
  return (
    <div
      className={`flex flex-col container h-full text-black font-bold bg-red-200  m-2 rounded-3xl p-4 justify-evenly
      
      `}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100%",
      }}
    >
      <h2 className="text-2xl ">{title}</h2>
      <p className="">{message}</p>

      <a className="mt-auto" href="/">
        {bottomTextVisible ? "Shop Now" : ""}
      </a>
    </div>
  );
};

const CardBottom = () => {
  return (
    <div className="container flex flex-col items-center x bg-red-200 h-52 m-2 rounded-3xl p-4">
      <h2>Gift Certificates</h2>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  );
};

const CardBottomMailForm = () => {
  return (
    <div className="container flex h-52 flex-col bg-red-600 m-2 rounded-3xl p-8 bg-[url('https://via.placeholder.com/1920')] items-center">
      <h2 className="text-2xl">Subscribe Now and SAVE</h2>

      <div className="flex max-w-md sm:flex-row flex-col p-2 m-auto sm:bg-white rounded-full ">
        <input
          className="w-full self-center h-10 bg-transparent focus:outline-none rounded-full px-2 bg-white mb-2 sm:mb-0"
          placeholder="Your Email"
        />
        <button className="bg-orange-400 rounded-full p-2 h-10  px-4">
          Subscribe
        </button>
      </div>
    </div>
  );
};
