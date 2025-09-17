"use client";

import { useState } from "react";
import { Search } from "lucide-react"; // icon library

interface Location {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function LocationSearchInput({
  onSelect,
}: {
  onSelect: (loc: Location) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (value: string) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`,
        {
          headers: {
            "User-Agent": "almostus.in/1.0 (contact@almostus.in)",
            "Accept-Language": "en",
          },
        }
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Location search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Bar */}
      <div className="flex items-center w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-teal-500">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          placeholder="Search for your city"
          onChange={(e) => searchLocation(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-xs text-gray-500 mt-2">Searching...</p>
      )}

      {/* Dropdown Results */}
      {results.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-56 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => {
                setQuery(place.display_name);
                setResults([]);
                onSelect(place);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700 border-b last:border-b-0"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
