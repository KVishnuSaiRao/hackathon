import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import logo from "./logo.svg";
import userIcon from "./user.svg"; // Correctly import the user icon

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center  bg-gradient-to-r from-red-700 to-indigo-700">
        <Image src={logo} alt="Company Logo" height={100} width={200} className="p-2"/> 
    </header>
  );
};

export default Header;
