import React from "react";
import logo from "@/assets/logo.svg"; // replace with your logo file
import houseImage from "@/assets/group2.svg"; // replace with your left image
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
        <div className="absolute top-6 right-6 text-sm text-gray-600 flex items-center gap-1">
          English (US) <span className="text-xs">▼</span>
        </div>

        <h2 className="text-[26px] text-center text-[#000000] font-semibold mb-6">
          Forgot Password
        </h2>

        <label className="block text-[20px] text-[#7C838A] mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your Email here"
          className="w-full mb-4 rounded-xl px-4 py-3 border bg-[#B0BAC340] border-gray-300 rounded-lg text-sm "
        />

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/otp")}
            className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[24px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
