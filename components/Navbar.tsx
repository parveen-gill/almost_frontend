"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CityDropdown from "./cityDropdown";
import LoginModal from "./loginModal";
import { FaUser } from "react-icons/fa6";

const Navbar: React.FC = () => {
  const [city, setCity] = useState("Delhi");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cities = ["Delhi", "Jaipur", "Mumbai", "Chennai", "Pune"];
   const[isLoggedIn,setIsLoggedIn]=useState(false);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token)
    {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  },[])

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
   
   }
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

        {isLoggedIn ? (
  <div className="flex gap-3">
    {/* Profile Button */}
    <button className="w-12 h-12 p-4 bg-[#a1c4df] text-white rounded-full hover:bg-[#90b9d5] transition">
          <FaUser/>
    </button>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-[#dfb1a1] text-white rounded-full hover:bg-[#dda390] transition"
    >
      Logout
    </button>
  </div>
) : (
  <LoginModal />
)}

           
         
        {/* </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
