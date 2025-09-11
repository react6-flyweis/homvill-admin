import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserCog,
  FaCar,
  FaMoneyBill,
  FaBell,
  FaCogs,
  FaPlus,
  FaFileAlt,
  FaGift,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import logo from "../components/assets/logo.svg";
import profilePic from "../components/assets/home.svg";

const menuItems = [
  { label: "Overview", path: "/dashboard/home", icon: <FaTachometerAlt /> },
  { label: "Users", path: "/dashboard/users", icon: <FaUserCog /> },
  { label: "Properties", path: "/dashboard/properties", icon: <FaCar /> },
  { label: "Contracts", path: "/dashboard/contracts", icon: <FaCar /> },
  { label: "Chat", path: "/dashboard/chat", icon: <FaMoneyBill /> },
  { label: "Audit Log", path: "/dashboard/audit-logs", icon: <FaCogs /> },
  { label: "Add Sub Admin", path: "/dashboard/sub-admin", icon: <FaPlus /> },
  { label: "Banners", path: "/dashboard/banners", icon: <FaFileAlt /> },
  {
    label: "Subscriptions",
    path: "/dashboard/subscribe",
    icon: <MdOutlineSubscriptions />,
  },
  { label: "Earning", path: "/dashboard/earning", icon: <FaMoneyBill /> },
  { label: "Promo Code", path: "/dashboard/promocode", icon: <FaGift /> },
  { label: "Reviews", path: "/dashboard/review", icon: <FaGift /> },
  {
    label: "User’s Query",
    path: "/dashboard/userquery",
    icon: <FaQuestionCircle />,
  },
  {
    label: "Terms & Condition",
    path: "/dashboard/terms",
    icon: <FaQuestionCircle />,
  },
  {
    label: "Privacy & Policy",
    path: "/dashboard/privacy",
    icon: <FaQuestionCircle />,
  },
  {
    label: "Push Notification",
    path: "/dashboard/push",
    icon: <FaQuestionCircle />,
  },
  {
    label: "Help & Sipport",
    path: "/dashboard/support",
    icon: <FaQuestionCircle />,
  },
];

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizePath = (path) => path.replace(/\/+$/, "");
  const currentPath = normalizePath(location.pathname);

  return (
    <div style={{ fontFamily: "Poppins" }} className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-60 bg-gray-50 border-r border-[#8A1538] flex flex-col">
        {/* Logo */}
        <div className="p-6 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        {/* Menu */}
        <ul className="flex-1 py-4 space-y-1 m-2 overflow-y-auto hide-scrollbar">
          {menuItems.map((item, index) => {
            const isActive =
              item.path === "/dashboard/home"
                ? currentPath === "/dashboard/home"
                : currentPath.startsWith(item.path);

            return (
              // <NavLink
              //   key={index}
              //   to={item.path}
              //   className={`flex items-center gap-3 px-6 py-2 text-[15px] rounded-lg transition-all ${
              //     isActive
              //       ? "bg-[#8A1538] text-white font-medium"
              //       : "text-gray-700 hover:bg-gray-200"
              //   }`}
              // >
              //   {item.icon}
              //   {item.label}
              // </NavLink>
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2 text-[15px] rounded-lg transition-all ${
                    isActive || currentPath.startsWith(item.path)
                      ? "bg-[#8A1538] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            );
          })}
        </ul>
      </div>

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
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
