import axios from "axios";
import { ReactNode, useState } from "react";
import { FaGrinStars, FaHeart, FaPenFancy } from "react-icons/fa";
import pen from "../assets/pen.png";
import { ListProduct } from "./ListProduct";

export const Top = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; active: boolean }>({
    active: false,
    message: "",
  });

  const disabledButton = "bg-gray-500 cursor-not-allowed hover:bg-gray-500";

  return (
    <div className="flex flex-col h-full w-full shrink items-center">
      <div className="flex w-full h-full items-center md:items-stretch flex-col md:flex-row justify-between max-w-6xl  bg-orange-200 ">
        <div className="flex flex-col max-w-[300px] justify-evenly p-4">
          <h2 className="text-2xl">
            <span className="font-semibold text-4xl">Elena's Pen:</span>{" "}
            Unlocking Worlds with Words - Professional Author Services for Hire
          </h2>
          <span className="text-sm py-2">
            Get your own custom fanfiction and immerse yourself in it!
          </span>

    <span className="flex flex-col font-bold py-2">
            
            <span className="underline"> Read more below!</span>
          </span>

          {/* <span className="flex flex-col font-bold py-2">
            Get Notified On Discounts
            <span className="underline"> Subscribe Below!</span>
          </span> */}

          {/* <div className="flex ">
            <input
              disabled={subscribed}
              className="flex w-full max-w-md sm:flex-row flex-col p-2 sm:bg-white rounded-s-full outline-none"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />

            <div
              className={`flex flex-col bg-yellow-300 rounded-e-full items-center p-2 hover:bg-orange-400 cursor-pointer
            ${subscribed ? disabledButton : ""}`}
            >
              <button
                disabled={subscribed}
                className="px-2"
                onClick={() => {
                  // Send email data as JSON in request body
                  const emailData = {
                    content: {
                      msg: "Subscriber's Email Address: ",
                      email: email,
                      subject: "New Discount Subscriber",
                    },
                  };

                  axios
                    .post("https://elenaspen.com/api/email/", emailData)
                    .then((res) => {
                      setSubscribed(true);

                      setError({ ...error, active: !error.active });
                    })
                    .catch((err) => {
                      setError({
                        active: !error.active,
                        message: err.response.data.error,
                      });
                    });
                }}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div> */}
          <div className="flex self-center text-red-500 font-bold text-xl">
            {error.active ? String(error.message) : ""}
          </div>
        </div>

        <div className="flex self-center w-80 h-80 sm:w-96 sm:h-96 bg-white rounded-full ">
          <img src={pen} className="m-auto w-full h-full rounded-full"></img>
        </div>
      </div>

      <div className="flex w-full mt-6">
        <CardTop
          title="Immersive"
          message="Indulge in your favorite fandoms"
          icon={<FaGrinStars className="flex  m-auto" size="40" />}
        />
        <CardTop
          title="Erotic"
          message="18+ fanfiction is also available"
          icon={<FaHeart className="flex  m-auto" size="40" />}
        />
        <CardTop
          title="Requests"
          message="Custom fanfic tailored to your liking"
          icon={<FaPenFancy className="flex  m-auto" size="40" />}
        />
      </div>
      <ListProduct />
      {/* <div className="flex flex-col  sm:w-full md:flex-row p-2 justify-center items-center">
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
      </div> */}

      <div className="flex items-center flex-wrap sm:flex-nowrap">
        {/* <CardBottom /> */}
        {/* <CardBottomMailForm /> */}
      </div>
    </div>
  );
};

const CardTop = (props: {
  title: string;
  message: string;
  icon: ReactNode;
}) => {
  const { title, message, icon } = props;
  return (
    <div className="flex  flex-col container bg-orange-300 h-52 m-2 rounded-3xl p-2 align-center">
      <h2 className="font-semibold pb-2">{title}</h2>
      <p className="text-sm">{message}</p>
      {icon}
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
