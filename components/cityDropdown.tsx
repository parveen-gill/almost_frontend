"use client";

import React, { useState } from "react";

interface CityDropdownProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const popularCities = [
  { name: "Delhi", icon: "/images/india-gate.png" },
  { name: "Jaipur", icon: "/images/jaipur.png" },
  { name: "Agra", icon: "/images/agra.png" },
  { name: "Mumbai", icon: "/images/mumbai.png" },
  { name: "Chandigarh", icon: "/images/chandigarh.png" },
  { name: "Pune", icon: "/images/pune.png" },
  { name: "Chennai", icon: "/images/chennai.png" },
  { name: "Hyderabad", icon: "/images/hyderabad.png" },
];

const otherCities = Array.from({ length: 35 }, (_, i) => `City ${i + 1}`);

const CityDropdown: React.FC<CityDropdownProps> = ({
  selectedCity,
  onCityChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  

  const allCities = [
    ...popularCities.map((c) => c.name),
    ...otherCities,
  ];


  const filteredCities = search
    ? allCities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-2 rounded-full hover:bg-gray-100 transition"
      >
        {selectedCity} <span className="ml-2">&#9662;</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[550px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for your city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          {/* results */}
          {search ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      onCityChange(city);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                  >
                    {city}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm col-span-2">
                  No results found
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Popular Cities */}
              
              <div className="text-teal-500 font-medium mb-2">Popular Cities</div>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {popularCities.map((city) => (
                  <div
                    key={city.name}
                    onClick={() => {
                      onCityChange(city.name);
                      setOpen(false);
                    }}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer border ${selectedCity === city.name
                        ?"bg-[linear-gradient(200deg,#EDF6F9,#FFF2EB)] border border-[#003B4A]"
                        : "bg-white border border-gray-300"
                      } hover:bg-gray-100`}
                  >
                    <img
                      src={city.icon}
                      alt={city.name}
                      className="w-8 h-8 mb-1"
                    />
                    <span className="text-sm">{city.name}</span>
                  </div>
                ))}
              </div>

              {/* Other Cities */}
              <div className="text-teal-500 font-medium mb-2">Other Cities</div>
              <div className="grid grid-cols-5 gap-1 text-sm text-gray-500">
                {otherCities.map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      onCityChange(city);
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:text-teal-500"
                  >
                    {city}
                  </div>
                ))}
              </div>

              <div
                className="text-center mt-4 text-orange-300 cursor-pointer hover:underline"
                onClick={() => setOpen(false)}
              >
                Hide all cities
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
