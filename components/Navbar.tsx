"use client";

import React, { useState } from "react";
import Link from "next/link";
import CityDropdown from "./cityDropdown";
import LoginModal from "./loginModal";

const Navbar: React.FC = () => {
  const [city, setCity] = useState("Delhi");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cities = ["Delhi", "Jaipur", "Mumbai", "Chennai", "Pune"];

  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
   
     <div className="flex items-center">
  <img
    src="/images/logo.svg"       
    alt="ALMO Logo"       
    width={150}           
    height={50}           
    className="object-contain"
  />
</div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* City Dropdown */}
         <CityDropdown selectedCity={city} onCityChange={setCity} />

        {/* Sign In Button
        <Link href="/login"> */}
          {/* <button className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition">
            Sign In
          </button> */}
          <LoginModal/>
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
