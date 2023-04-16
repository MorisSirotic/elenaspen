import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const Root = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-orange-100">
      <Navbar />

      <div className="m-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
