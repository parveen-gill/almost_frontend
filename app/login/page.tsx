"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Logo */}
      <div className="mb-10">
        <img
          src="/images/logo.svg" 
          alt="Almostus Logo"
          className="h-14 mx-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Log In</h1>

      {/* Google Login */}
      <button className="w-full max-w-xs flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
        <FcGoogle size={22} />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      {/* Apple Login */}
      <button className="w-full max-w-xs flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
        <FaApple size={22} />
        <span className="text-gray-700 font-medium">Continue with Apple</span>
      </button>

      {/* Email Login */}
      <button className="w-full max-w-xs flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
        <MdEmail size={22} className="text-gray-700" />
        <span className="text-gray-700 font-medium">Continue with Email</span>
      </button>

    
      <p className="mt-8 text-gray-600 text-sm">
        Don’t you have an account?{" "}
        <a href="/signup" className="text-teal-600 font-medium hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
