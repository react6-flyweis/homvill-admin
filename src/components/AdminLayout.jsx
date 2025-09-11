import React from "react";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import profilePic from "../components/assets/home.svg";
import { AppSidebar } from "./layouts/AppSidebar";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="flex h-screen overflow-hidden font-sans"
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="w-full bg-white h-16 border-b border-[#8A1538] flex justify-end items-center px-6">
          {/* Search */}
          {/* <input
            type="text"
            placeholder="Search..."
            className="w-1/3 px-4 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none"
          /> */}

          <div className="flex items-center justify-end gap-4">
            {/* Notifications */}
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FaBell className="text-gray-600 text-lg" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-xl z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="font-semibold text-gray-800">
                      Notifications
                    </h2>
                    <button onClick={() => setIsOpen(false)}>
                      <IoMdClose className="text-xl text-gray-500 hover:text-gray-800" />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 flex items-start gap-3 border-b"
                      >
                        <div className="bg-gray-100 p-2 rounded-md">
                          <FaBell className="text-pink-600 text-lg" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm text-gray-800 font-medium">
                            <span className="font-bold">John Doe</span> has
                            raised a concern.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            March 16, 2025 &nbsp; 2:33 pm
                          </p>
                        </div>
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <img
              src={profilePic}
              alt="Profile"
              className="h-10 w-10 rounded-full border object-cover"
            />
          </div>
        </div>

        {/* Main Dashboard */}
        <main className="flex-1 overflow-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
