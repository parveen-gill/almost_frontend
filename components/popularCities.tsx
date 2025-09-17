import React from "react";

// Use ReactNode instead of JSX.Element
interface City {
  name: string;
  icon: React.ReactNode;
}

const cities: City[] = [
  { name: "Delhi", icon: <i className="ri-map-pin-line text-2xl"></i> },
  { name: "Jaipur", icon: <i className="ri-building-line text-2xl"></i> },
  { name: "Agra", icon: <i className="ri-home-line text-2xl"></i> },
  { name: "Mumbai", icon: <i className="ri-building-2-line text-2xl"></i> },
  { name: "Chandigarh", icon: <i className="ri-landscape-line text-2xl"></i> },
  { name: "Pune", icon: <i className="ri-bank-line text-2xl"></i> },
  { name: "Surat", icon: <i className="ri-building-3-line text-2xl"></i> },
  { name: "Chennai", icon: <i className="ri-home-2-line text-2xl"></i> },
  { name: "Udaipur", icon: <i className="ri-hotel-line text-2xl"></i> },
  { name: "Hyderabad", icon: <i className="ri-gateway-line text-2xl"></i> },
];

const PopularCity: React.FC = () => {
  return (
    <div className="my-12 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Popular City</h2>
        <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
          Other Cities <span className="ml-2">▼</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-6">
        {cities.map((city) => (
          <div
            key={city.name}
            className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-lg hover:shadow-md cursor-pointer transition"
          >
            <div className="text-sky-500 mb-2">{city.icon}</div>
            <p className="text-sm font-medium text-slate-800">{city.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCity;
