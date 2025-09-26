'use client';

import React, { useEffect, useState } from "react";
import PopularCity from "../components/popularCities";
import Link from "next/link";
export default function HomePage() {
 
   const [user, setUser] = useState<any>(null);
 
  

 useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for localStorage changes 
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }
}, []);

  return (
    <div>
      {/* Hero Section */}
     <section
  className="bg-cover bg-center bg-no-repeat py-16 text-center"
  style={{ backgroundImage: "url('/images/Frame 2.jpg')" }}>
        <h1 className="text-3xl font-bold text-slate-900">Reconnect With Moments</h1>
        <p className="text-slate-700 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="mt-6 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search Location"
            className="px-4 py-2 rounded-l-lg border border-slate-300 w-60 focus:outline-none"
          />
          <button className="px-4 py-2 bg-sky-500 text-white rounded-r-lg hover:bg-sky-600">Search</button>
        </div>
        <p className="text-sm text-slate-500 mt-2">Auto-detect</p>
      </section>
      
       <div className="mt-8 flex justify-center">
          <Link href="/collective-wall">
            <button className="px-6 py-3 text-white rounded-full hover:bg-[#007d80] transition text-lg font-medium " style={{
    background: "linear-gradient(135deg, #00A5AA, #EDF6F9)"
  }}>
              View All Posts
            </button>
          </Link>
        </div>


      {/* Popular City Section */}
      <PopularCity />
    </div>
  );
}
