import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="flex h-80 flex-col w-full">
      <div className="flex mx-2 justify-evenly items-center">
        <span className="w-full h-1 bg-red-200" />
        <span className="w-full text-center text-red-600 m-auto">
          Beauty Co.
        </span>
        <span className="w-full h-1 bg-red-200" />
      </div>

      <div className="w-full flex justify-evenly text-xs">
        <div className="flex flex-col uppercase  [&>a]:py-2 [&>a:hover]:text-red-300">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">About</a>
        </div>

        <div className="flex h-20 flex-col text-base items-center">
          <div className="flex w-full justify-evenly  [&>a:hover]:text-red-300">
            <a href="/" target="_blank">
              <FaInstagram className="w-6 h-6" />
            </a>

            <a href="/" target="_blank">
              <FaGoogle className="w-6 h-6" />
            </a>
            <a href="/" target="_blank">
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
          <div className="h-12 my-2 w-1 bg-red-200 self-center shrink-0" />

          <div
            id="this"
            className="flex w-full flex-col [&>p]:py-2 text-center p-4"
          >
            <p>Weekly Newsletter</p>
            <input
              placeholder="Name@Email.com"
              className="border-2 w-full outline-none py-2 px-1 border-b-0 border-red-300"
            />
            <p className="border-2   border-red-300">Subscribe</p>
          </div>

          <span className="py-2">&copy; 2023 | Beauty Co.</span>
        </div>

        <div className="flex flex-col  uppercase [&>a]:py-2 [&>a:hover]:text-red-300">
          <a href="/">Shipping Information</a>
          <a href="/">Returns / Exchanges</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </div>
  );
};
