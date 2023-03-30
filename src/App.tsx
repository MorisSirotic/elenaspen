import { CardProduct } from "./components/CardProduct";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Top } from "./components/Top";

export const App = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-neutral-100">
      <Navbar />

<Top/>

      

      <Footer/>
    </div>
  );
};
