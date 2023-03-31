import { useEffect, useState } from "react";
import { CardProduct } from "./components/CardProduct";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Top } from "./components/Top";
import axios from "axios";

type Props = {
  message: string;
};
export const App = () => {
 

  const [message, setMessage] = useState<Props>({ message: "kmkmkm" });

  useEffect(() => {

    axios.get<Props>("http://localhost:8000/api").then((val) => {

    console.log(val);
    
      setMessage(val.data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-100">
      <Navbar />

      <Top />

      <Footer />

      {message.message}
    </div>
  );
};
