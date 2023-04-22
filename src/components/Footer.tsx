import { FaTumblr } from "react-icons/fa";

import axios from "axios";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; active: boolean }>({
    active: false,
    message: "",
  });

  const disabledButton = "bg-gray-500 cursor-not-allowed hover:bg-gray-500";

  return (
    <div className="flex h-44 pt-4 flex-col w-full bg-orange-200 ">
      <div className="flex mx-2 justify-evenly items-center">
        <span className="w-full h-1 bg-black" />
        <span className="w-full font-semibold text-2xl text-center text-black m-auto">
          Elena's Pen
        </span>
        <span className="w-full h-1 bg-black" />
      </div>

      <div className="w-full flex justify-evenly text-xs">
        {/* <div className="flex flex-col uppercase  [&>a]:py-2 [&>a:hover]:text-red-300">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
          <a href="/">About</a>
        </div> */}

        <div className="flex h-20 flex-col text-base items-center">
          <div className="flex w-full justify-evenly  [&>a:hover]:text-orange-400">
            {/* <a href="/" target="_blank">
              <FaInstagram className="w-6 h-6" />
            </a> */}

            <a href="/" target="_blank">
              <FaTumblr className="w-6 h-6" />
            </a>

            {/* <a href="/" target="_blank">
              <FaFacebook className="w-6 h-6" />
            </a> */}
          </div>
          <div className="h-12 my-2 w-1 bg-black self-center shrink-0" />

          {/* <div
            id="this"
            className="flex w-full flex-col [&>p]:py-2 text-center p-4"
          >
            <p>Weekly Newsletter</p>
            <input
              disabled={subscribed}
              placeholder="Name@Email.com"
              className="border-2 w-full outline-none py-2 px-1 border-b-0 border-black"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <button
              disabled={subscribed}
              className={`border-2 p-2 bg-yellow-300  border-black hover:bg-orange-400 cursor-n cursor-pointer
              ${subscribed ? disabledButton : ""}
        
              `}
              onClick={() => {
                const emailData = {
                  content: {
                    msg: "Subsriber's Email Address: ",
                    email: email,
                    subject: "New Weekly Newsletter Subscriber",
                  },
                };

                axios
                  .post("https://elenaspen.com/api/email/", emailData)
                  .then((res) => {
                   
                    setError({ ...error, active: false });
                    setSubscribed(true);
                  })
                  .catch((err) => {
                
                    setError({
                      active: !error.active,
                      message: err.response.data.error,
                    });
                  });
              }}
            >
              {subscribed ? "Thank You For Subscribing" : "Subscribe"}
            </button>
            <div className="text-red-500 font-bold text-xl">
              {error.active ? String(error.message) : ""}
            </div>
          </div> */}

          <span className="py-2">&copy; 2023 | Elena's Pen</span>
        </div>

        {/* <div className="flex flex-col  uppercase [&>a]:py-2 [&>a:hover]:text-red-300">
          <a href="/">Shipping Information</a>
          <a href="/">Returns / Exchanges</a>
          <a href="/">Contact</a>
        </div> */}
      </div>
    </div>
  );
};
