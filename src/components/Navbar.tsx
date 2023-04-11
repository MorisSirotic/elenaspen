import {
  FaArrowDown,
  FaChevronDown,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import logo from "../assets/react.svg";
import { Link } from "react-router-dom";

type LinkProps = {
  value: string;
  url: string;
};
export const Navbar = () => {
  const links: Array<LinkProps> = [
    {
      url: "/",
      value: "link1",
    },
    {
      url: "/",
      value: "link2",
    },
    {
      url: "/",
      value: "link3",
    },
    {
      url: "/",
      value: "link4",
    },
  ];

  return (

    <form onSubmitCapture={(e) => {

      e.preventDefault()
      console.log("captured");
    }}>

    <div className="flex row w-full h-14 bg-red-300 items-center justify-between">
      <div className="items-center flex-col w-[20%] max-w-fit bg-teal-500 flex justify-start text-white mr-4">
        <Link to="/">
     
        <img src={logo} />
        </Link>
        {/* <FaChevronDown /> */}

        {/* <Dropdown /> */}
      </div>
{/* 
      <div className="flex  h-8 bg-slate-200 items-center justify-start rounded-full p-2">
        <div className="flex">
          <FaSearch className="w-6 h-6 mr-1" />
          <input className="w-full  border-gray-500 bg-transparent focus:outline-none" />
        </div>
      </div> */}

      <div className="flex w-[30%] max-w-[100px] justify-around">
        <Link to="/cart">
        <FaShoppingCart className="w-6 h-6" />
        </Link>        


        {/* <FaUser className="w-6 h-6" /> */}
      </div>
    </div>
          
    </form>
  );
};

const Dropdown = () => {
  return (
    <div className="absolute top-14 left-0 w-[70%] h-56 bg-slate-300 z-50">
      Sidemenu
    </div>
  );
};
/* <ul className="flex row w-[50%]  text-stone-800 items-center justify-evenly bg-red-500">
        {links.map((item) => {
          return <li className="">{item.value}</li>;
        })}
      </ul> */
