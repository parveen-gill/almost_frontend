import React from "react";
import PopularCity from "../components/popularCities";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
     <section
  className="bg-cover bg-center bg-no-repeat py-16 text-center"
  style={{ backgroundImage: "url('/images/Frame 2.jpg')" }}
>
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

      {/* Popular City Section */}
      <PopularCity />
    </div>
  );
}
