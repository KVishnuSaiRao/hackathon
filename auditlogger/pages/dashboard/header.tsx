import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import logo from "./logo.svg";
import userIcon from "./user.svg"; // Correctly import the user icon

const Header: React.FC = () => {
  return (
    // bg-gradient-to-r from-red-700 to-indigo-700 pl-12 py-2 pt-3 flex items-center
    <header className="flex justify-between items-center  bg-gradient-to-r from-red-700 to-indigo-700">
      {/* Left side - Company Logo */}
      {/* <div className="text-xl font-bold"> */}
        <Image src={logo} alt="Company Logo" height={100} width={200} className="p-2"/> Provide width and height
      {/* </div> */}

      {/* Right side - User Logo */}
      <div className="flex items-center">
        <Image
          src={userIcon} // Use the imported image
          alt="User Icon"
          height={32}
          width={32}
          className="rounded-full" // Tailwind class for rounded image
        />
      </div>
    </header>
  );
};

export default Header;
