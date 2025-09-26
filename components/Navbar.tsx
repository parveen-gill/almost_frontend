"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CityDropdown from "./cityDropdown";
import LoginModal from "./loginModal";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "@/authcontext";

const Navbar: React.FC = () => {
  const [city, setCity] = useState("Delhi");
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
  <nav className="w-full bg-white shadow-sm py-4 px-6">
  <div className="max-w-[1200px] mx-auto flex justify-between items-center">
    {/* Left: Logo */}
    <Link href="/">
      <img
        src="/images/logo.svg"
        alt="ALMO Logo"
        width={150}
        height={50}
        className="object-contain"
      />
    </Link>

    {/* Right: Dropdown, Auth Buttons */}
    <div className="flex items-center space-x-4">
      {/* City Dropdown */}
      <CityDropdown selectedCity={city} onCityChange={setCity} />

      {isLoggedIn ? (
        <div className="flex gap-3">
          {/* Profile Icon */}
          <Link href="/profile">
          <button className="w-12 h-12 p-4 bg-[#a1c4df] text-white rounded-full hover:bg-[#90b9d5] transition">
            <FaUser />
          </button>
            </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#dfb1a1] text-white rounded-full hover:bg-[#dda390] transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
        >
          Sign In
        </button>
      )}
    </div>
  </div>

  {/* Login Modal */}
  <LoginModal
    isOpen={isLoginModalOpen}
    onClose={() => setIsLoginModalOpen(false)}
  />
</nav>

  );
};

export default Navbar;
