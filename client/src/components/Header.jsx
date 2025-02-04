import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { appContent } from "../context/appContext";

const Header = () => {
  const { userData } = useContext(appContent);
  return (
    <div className="flex items-center flex-col mt-20 text-center px-4 text-gray-800">
      {/* Ensure the image path is correct */}
      <img
        src={assets.header_img}
        alt="header"
        className="w-36 h-36 rounded-full mb-6"
      />

      <h1 className="flex items-center text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : " Developer"}!
        <img className="w-8 aspect-square" src={assets.hand_wave} alt="wave" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to My Page
      </h2>

      <p className="mb-8 max-w-lg">
        Hello, my name is Harishankar Banjare, and I am a MERN stack developer.
        🚀 I specialize in building dynamic and scalable web applications using
        MongoDB, Express.js, React, and Node.js. Let's build something amazing
        together! 💻✨
      </p>

      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-pink-300 hover:text-white transition-all cursor-pointer">
        Get Started
      </button>
    </div>
  );
};

export default Header;
