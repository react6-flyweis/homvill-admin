import React from "react";
import logo from "../components/assets/logo.svg"; // replace with your logo file
import houseImage from "../components/assets/group.svg"; // replace with your left image
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen font-sans bg-[#D3DDE6]">
      {/* Left Side */}
      <div className="w-1/2 flex justify-center items-center relative">
        {/* Logo */}
        <div className="absolute top-6 left-16">
          <img src={logo} alt="Logo" className="w-[182px] h-[38px]" />
        </div>

        {/* Fixed-size image */}
        <div className="flex-none mt-4">
          <img
            src={houseImage}
            alt="House"
            className="w-auto h-[590px] object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{ fontFamily: "Poppins" }}
        className="w-1/2 flex flex-col justify-center px-24 bg-white rounded-tl-2xl rounded-bl-2xl shadow-lg"
      >
        {/* Language Selector */}
        <div className="absolute top-6 right-6 text-sm text-gray-600 flex items-center gap-1">
          English (US) <span className="text-xs">▼</span>
        </div>

        <h2 className="text-[26px] text-center text-[#000000] font-semibold mb-6">
          Register Here
        </h2>

        {/* Email */}
        <label className="block text-[20px] text-[#7C838A] mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your Email here"
          className="w-full mb-4 rounded-xl px-4 py-3 border bg-[#B0BAC340] border-gray-300 rounded-lg text-sm "
        />

        {/* Password */}
        <label className="block text-[20px] text-[#7C838A] mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your Password here"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 bg-[#B0BAC340] rounded-lg text-sm "
        />
        <label className="block text-[20px] text-[#7C838A] mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Re-Enter your Password here"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 bg-[#B0BAC340] rounded-lg text-sm "
        />

        {/* Remember Me & Forgot Password */}
        {/* <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-[17px] text-[#1D1D1D]">
                <input
                    type="checkbox"
                    className="mr-2 accent-[#8A1538]"
                    defaultChecked
                />
                Remember me
            </label>
            <a href="#" className="text-[17px] text-[#8A1538] font-medium">
                Forgot password?
            </a>
        </div> */}

        {/* Login Button */}
        <div className="flex justify-center">
          <button className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[24px]">
            Register Now
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Register */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="w-[340px] border border-pink-300 text-[#a70f3a] py-2 rounded-lg font-medium hover:bg-pink-50"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
