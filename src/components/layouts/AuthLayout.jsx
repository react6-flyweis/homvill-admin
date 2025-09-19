import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

import logo from "@/assets/logo.svg";
import houseImage from "@/assets/group.svg";

export default function AuthLayout() {
  const authStore = useAuthStore((state) => state);

  if (authStore.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen font-sans bg-[#D3DDE6]">
      {/* Left Side */}
      <div className="w-2/5 flex justify-center items-center relative">
        {/* Logo */}
        <Link to="/">
          <div className="absolute top-6 left-16">
            <img src={logo} alt="Logo" className="w-[182px] h-[38px]" />
          </div>
        </Link>

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
        className="flex-1 flex flex-col justify-center px-24 bg-white rounded-tl-2xl rounded-bl-2xl shadow-lg"
      >
        {/* Language Selector */}
        <div className="absolute top-6 right-6 text-sm text-gray-600 flex items-center gap-1">
          English (US) <span className="text-xs">▼</span>
        </div>

        <div className="max-w-md mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
