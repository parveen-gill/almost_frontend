"use client";
import { Filter, FilterIcon } from "lucide-react";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const SidebarFilters = () => {
  const [open, setOpen] = useState({
    category: true,
    date: true,
    city: true,
  });

  return (
    <aside className="w-64 p-10 border-r border-gray-200 bg-[#EDF6F9] sticky top-0 h-screen overflow-y-auto">
      <h2 className="font-semibold text-gray-700 mb-6 flex gap-2.5 items-center "><svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.7916 14H10.3775M5.28965 14H3.20831M5.28965 14C5.28965 13.3255 5.5576 12.6786 6.03457 12.2016C6.51154 11.7246 7.15845 11.4567 7.83298 11.4567C8.50751 11.4567 9.15442 11.7246 9.63139 12.2016C10.1084 12.6786 10.3763 13.3255 10.3763 14C10.3763 14.6745 10.1084 15.3214 9.63139 15.7984C9.15442 16.2754 8.50751 16.5433 7.83298 16.5433C7.15845 16.5433 6.51154 16.2754 6.03457 15.7984C5.5576 15.3214 5.28965 14.6745 5.28965 14ZM24.7916 21.7082H18.0856M18.0856 21.7082C18.0856 22.3829 17.817 23.0305 17.34 23.5076C16.8629 23.9847 16.2158 24.2527 15.5411 24.2527C14.8666 24.2527 14.2197 23.9835 13.7427 23.5066C13.2658 23.0296 12.9978 22.3827 12.9978 21.7082M18.0856 21.7082C18.0856 21.0335 17.817 20.387 17.34 19.9099C16.8629 19.4329 16.2158 19.1648 15.5411 19.1648C14.8666 19.1648 14.2197 19.4328 13.7427 19.9098C13.2658 20.3867 12.9978 21.0336 12.9978 21.7082M12.9978 21.7082H3.20831M24.7916 6.29184H21.1691M16.0813 6.29184H3.20831M16.0813 6.29184C16.0813 5.6173 16.3493 4.9704 16.8262 4.49343C17.3032 4.01646 17.9501 3.7485 18.6246 3.7485C18.9586 3.7485 19.2894 3.81429 19.5979 3.9421C19.9065 4.06992 20.1869 4.25726 20.4231 4.49343C20.6592 4.7296 20.8466 5.00998 20.9744 5.31855C21.1022 5.62712 21.168 5.95784 21.168 6.29184C21.168 6.62583 21.1022 6.95656 20.9744 7.26513C20.8466 7.5737 20.6592 7.85408 20.4231 8.09025C20.1869 8.32642 19.9065 8.51376 19.5979 8.64157C19.2894 8.76939 18.9586 8.83517 18.6246 8.83517C17.9501 8.83517 17.3032 8.56721 16.8262 8.09025C16.3493 7.61328 16.0813 6.96637 16.0813 6.29184Z" stroke="#00A5AA" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
Filters</h2>

      {/* Category */}
      <div className="mb-6">
        <button
          onClick={() => setOpen({ ...open, category: !open.category })}
          className="flex justify-between w-full text-gray-600 font-medium mb-2 items-center"
        >
          Category
          <FiChevronDown
            className={`transition-transform ${
              open.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {open.category && (
          <ul className="space-y-1 text-sm text-gray-600 pl-2">
            <li>Work</li>
            <li>Friendship</li>
            <li>Confession</li>
            <li>Relationship</li>
            <li>Travel</li>
            <li>Someone</li>
            <li>Health</li>
          </ul>
        )}
      </div>

      {/* By Date */}
      <div className="mb-6">
        <button
          onClick={() => setOpen({ ...open, date: !open.date })}
          className="flex justify-between w-full text-gray-600 font-medium mb-2"
        >
          By Date
          <FiChevronDown
            className={`transition-transform ${
              open.date ? "rotate-180" : ""
            }`}
          />
        </button>
        {open.date && (
          <ul className="space-y-1 text-sm text-gray-600 pl-2">
            <li>Today</li>
            <li>Yesterday</li>
            <li>This Week</li>
            <li>This Month</li>
          </ul>
        )}
      </div>

      {/* Popular City */}
      <div>
        <button
          onClick={() => setOpen({ ...open, city: !open.city })}
          className="flex justify-between w-full text-gray-600 font-medium mb-2"
        >
          Popular City
          <FiChevronDown
            className={`transition-transform ${
              open.city ? "rotate-180" : ""
            }`}
          />
        </button>
        {open.city && (
          <ul className="space-y-1 text-sm text-gray-600 pl-2">
            <li>Delhi</li>
            <li>Chandigarh</li>
            <li>Jaipur</li>
            <li>Mumbai</li>
            <li>Agra</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default SidebarFilters;
