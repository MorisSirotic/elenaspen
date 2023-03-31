import { useEffect, useState } from "react";
import { CardProduct } from "./components/CardProduct";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Top } from "./components/Top";
import axios from "axios";

type Props = {
  id: string;
  name: string;
};
export const App = () => {
  const [user, setuser] = useState<Props>();

  useEffect(() => {
    axios.get<Props>("http://localhost:8000/api/users").then((val) => {
      setuser(val.data);
      console.log(val.data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-100">
      <Navbar />

      <Top />

      <Footer />

      {user?.name}
    </div>
  );
};
