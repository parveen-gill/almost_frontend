
"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
export default function LoginModal() {
  const [step, setStep] = useState<"base" | "email" |"signup"| null>(null);

   const BASE_URL=process.env.NEXT_PUBLIC_API_URL;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  

  //signup api
  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/sign`, data);
      
      toast.success('Successfully registerd');
     
      reset();
       setStep("base"); 

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };


  //login
   const onLogin=async(data:any)=>{
    try{
       const res=await axios.post(`${BASE_URL}/user/log`,data);
       console.log("response",res);
       localStorage.setItem("token", res.data.data.token);
       localStorage.setItem("user", JSON.stringify(res.data.data.user));
       window.location.href="/";
       toast.success("Login Successfull");
       reset();
       
       
    }
    catch(error:any){
      console.log(error);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  }


  //Google-login
 const loginWithGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
    
     const res=await axios.post(`${BASE_URL}/user/google`, {
        token: tokenResponse.access_token,
      });

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.details));

      toast.success("Login Successful");
   
      setStep(null);
      window.location.href = "/";

    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Google login failed");
    }
  },
});



  return (
    <>
    
      <button
        onClick={() => setStep("base")}
        className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
      >
        Sign In
      </button>

      {/* Background Overlay */}
      {step && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          {/* Base Login Modal */}
          {step === "base" && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
            {/* Close Button */}
            <button
              onClick={() => setStep(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Logo */}
            <div className="mb-8">
              <img
                src="/images/logo.svg" 
                alt="AlmostUS Logo"
                className="h-14 mx-auto"
              />
            </div>

            {/* Title */}
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Log In</h1>

            {/* Google Login */}
            <button  onClick={() => loginWithGoogle()}  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
              <FcGoogle size={22} />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            {/* Apple Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
              <FaApple size={22} />
              <span className="text-gray-700 font-medium">Continue with Apple</span>
            </button>

            {/* Email Login */}
            <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
      >
            <MdEmail size={22} />
        <span className="text-gray-700 font-medium">Continue with Email</span>
      </button>

            {/* Footer */}
            <p className="mt-4">
                           Don’t you have an account?{" "}
                           <button onClick={()=>setStep("signup")}className="text-teal-600 font-semibold hover:underline">
                             Sign up
                           </button>
                         </p>
          </div>
        </div>
          )}

          {/* Email Login Modal */}
          {step === "email" && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                     {/* Modal Box */}
                     <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative">
                       {/* Close Button */}
                       <button
                         onClick={() => setStep(null)}
                         className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                       >
                         ✕
                       </button>
           
                       {/* Logo */}
                       <div className="flex justify-center mb-6">
                         <Image
                           src="/images/logo.svg"
                           alt="Almost US Logo"
                           width={160}
                           height={60}
                           className="object-contain"
                         />
                       </div>
           
                       {/* Heading */}
                       <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
                         Log In
                       </h2>
           
                       {/* Login Form */}
                       <form className="space-y-5"onSubmit={handleSubmit(onLogin)}>
                         {/* Email */}
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                             Email
                           </label>
                           <input
                             type="email"
                             placeholder="Enter your email address"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                         {...register("email",{
          required:"Email is required",
          pattern:{
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
            message:"Enter a valid email address"
          }
        })}/>
        {errors.email && <p style={{color:"red"}}>{errors.email.message as string}</p>}
  
                         </div>
           
                         {/* Password */}
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1 text-left ">
                             Password
                           </label>
                           <input
                             type="password"
                             placeholder="Enter Password"
                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            {...register("password",{
          required:"Password is required",
          minLength:{value:6,message:"Password must be at least 6 characters long"},
            
        })} />
                         </div>
           
                         {/* Stay Logged In */}
                         <div className="flex items-center gap-2">
                           <input
                             id="remember"
                             type="checkbox"
                             className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                           />
                           <label htmlFor="remember" className="text-sm text-gray-600">
                             Stay logged in
                           </label>
                         </div>
           
                         {/* Submit Button */}
                         <button
                           type="submit"
                           className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
                         >
                           Log In
                         </button>
                       </form>
           
                       {/* Footer Links */}
                       <div className="mt-6 text-center text-sm text-gray-600">
                         <a href="/forgot-password" className="text-teal-600 hover:underline">
                           I forget my password
                         </a>
                         <p className="mt-4">
                           Don’t you have an account?{" "}
                           <button onClick={()=>setStep("signup")}className="text-teal-600 font-semibold hover:underline">
                             Sign up
                           </button>
                         </p>
                       </div>
                     </div>
                   </div>
          )}


          {/* Sigup Login modal */}
          {step === "signup" && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    {/* Modal Box */}
    <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center relative">
      {/* Close Button */}
      <button
        onClick={() => setStep(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* Logo */}
      <div className="mb-8">
        <img
          src="/images/logo.svg"
          alt="AlmostUS Logo"
          className="h-10 mx-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Create Account</h1>

      {/* Google Signup */}
      <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-50 transition">
        <FcGoogle size={22} />
        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>

      {/* Apple Signup */}
      <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-6 hover:bg-gray-50 transition">
        <FaApple size={22} />
        <span className="text-gray-700 font-medium">Continue with Apple</span>
      </button>

      {/* Inline Signup Form */}
      <form className="space-y-4 text-left" onSubmit={handleSubmit(onSubmit)}>
        {/* First + Last Name */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
             {...register("first_name", {
              required: true, pattern: {
                value: /^[A-Za-z\s]+$/,
                message: " Firstame should only contain letters and spaces"
              }
            })}
          />
           {errors.first_name && (
            <p className="signup-errors">{errors.first_name.message as string}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          {...register("last_name", {
              required: true, pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name should only contain letters and spaces"
              }
            })}

          />
          {errors.last_name && (
            <p className="signup-errors">{errors.last_name.message as string}</p>
          )}    
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}

          />
          {errors.email && (
            <p className="signup-errors">{errors.email.message as string}</p>
          )}


        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
        {...register("password", {
              required: "Phone is required",
              pattern: {
                 value: /^.{8,}$/,
                 message: "Password must be at least 8 characters long",
              },
            })}

          />
          {errors.password && (
            <p className="signup-errors">{errors.password.message as string}</p>
          )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-gray-600 text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={() => setStep("base")}
          className="text-teal-600 font-medium hover:underline"
        >
          Log In
        </button>
      </p>
    </div>
  </div>
)}
           <ToastContainer position="top-right"  />
        </div>
      )}
    </>
  );
}
