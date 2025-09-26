"use client";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<"base" | "email" | "signup" | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

   const [currentPath, setCurrentPath] = useState("/"); // default to "/"

useEffect(() => {
  setCurrentPath(window.location.pathname); // safe on client side
}, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Step control
  useEffect(() => {
    if (isOpen) setStep("base");
    else setStep(null);
  }, [isOpen]);


  useEffect(() => {
  if (isOpen) {
    
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
     
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }
}, [isOpen]);

  // Signup
  const onSubmit = async (data: any) => {
    try {
      await axios.post(`${BASE_URL}/user/sign`, data);
      toast.success("Successfully registered");
      reset();
      setStep("base");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // Login
 const onLogin = async (data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/log`, data);
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.data.user));
    toast.success("Login Successful");
    reset();
    onClose();

    // Redirect to current page
    window.location.href = currentPath || "/";
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Login Failed");
  }
};


  // Google Login
  const loginWithGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/google`, {
        token: tokenResponse.access_token,
      });
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.details));
      toast.success("Login Successful");
      onClose();

      window.location.href = currentPath || "/";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Google login failed");
    }
  },
});


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        {/* BASE STEP */}
        {step === "base" && (
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

            <div className="mb-8">
              <img src="/images/logo.svg" alt="AlmostUS Logo" className="h-14 mx-auto" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-6">Log In</h1>

            <button onClick={() => loginWithGoogle()} className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
              <FaApple size={22} />
              <span className="text-gray-700 font-medium">Continue with Apple</span>
            </button>

            <button onClick={() => setStep("email")} className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition">
              <MdEmail size={22} />
              <span className="text-gray-700 font-medium">Continue with Email</span>
            </button>

            <p className="mt-4">
              Don’t have an account?{" "}
              <button onClick={() => setStep("signup")} className="text-teal-600 font-semibold hover:underline">
                Sign up
              </button>
            </p>
          </div>
        )}

        {/* EMAIL STEP */}
        {step === "email" && (
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-8 relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

            <div className="flex justify-center mb-6">
              <Image src="/images/logo.svg" alt="Almost US Logo" width={160} height={60} className="object-contain" />
            </div>

            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Log In</h2>

            <form className="space-y-5" onSubmit={handleSubmit(onLogin)}>
              <div>
                <label className="block text-sm font-medium text-left mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    }
                  })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-left mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
              </div>

              <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                Log In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <a href="/forgot-password" className="text-teal-600 hover:underline">I forgot my password</a>
              <p className="mt-4">
                Don’t have an account?{" "}
                <button onClick={() => setStep("signup")} className="text-teal-600 font-semibold hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        )}

        {/* SIGNUP STEP */}
        {step === "signup" && (
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

            <div className="mb-8">
              <img src="/images/logo.svg" alt="AlmostUS Logo" className="h-10 mx-auto" />
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-6">Create Account</h1>

            <form className="space-y-4 text-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg"
                  {...register("first_name", {
                    required: "First name is required",
                    pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces allowed" }
                  })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg"
                  {...register("last_name", {
                    required: "Last name is required",
                    pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces allowed" }
                  })}
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                {...register("password", {
                  required: "Password is required",
                  pattern: { value: /^.{8,}$/, message: "Password must be at least 8 characters" },
                })}
              />

              <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition">
                Sign Up
              </button>
            </form>

            <p className="mt-6 text-gray-600 text-sm text-center">
              Already have an account?{" "}
              <button onClick={() => setStep("base")} className="text-teal-600 font-medium hover:underline">
                Log In
              </button>
            </p>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}
