// components/Footer.tsx

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full  bg-white border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto py-8 flex flex-col md:flex-row items-center justify-around">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.svg" // place your logo inside /public folder
            alt="Almost US Logo"
            width={250}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Tagline */}
        <p className="mt-4 md:mt-0 text-3xl font-medium text-gray-800 text-center md:text-right">
          Reconnect With The Moments{" "}
          <span className="text-teal-600  font-bold flex flex-start">
            That Almost Slipped Away.
          </span>
        </p>
      </div>

      {/* Middle Nav */}
      <div className="bg-[#F9F9F9] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-18 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          {/* Left Nav */}
          <div className="flex space-x-8 mb-4 md:mb-0">
            <a href="/" className="hover:text-teal-600 font-medium">
              Home
            </a>
            <a href="/posts" className="hover:text-teal-600 font-medium">
              Posts
            </a>
            <a href="/signin" className="hover:text-teal-600 font-medium">
              Sign In
            </a>
            <a href="/profile" className="hover:text-teal-600 font-medium">
              Profile
            </a>
          </div>

          {/* Right Nav */}
          <div className="flex space-x-8 text-[#003b4aa9]">
            <a href="/privacy-policy" className="hover:text-teal-600 font-medium">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-teal-600 font-medium">
              Terms & Condition
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        2025 © Copyright Almost US
      </div>
    </footer>
  );
}
