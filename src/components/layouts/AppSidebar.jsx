import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserCog,
  FaCar,
  FaMoneyBill,
  FaCogs,
  FaPlus,
  FaFileAlt,
  FaGift,
  FaQuestionCircle,
} from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import logo from "@/assets/logo.svg";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";

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

export const AppSidebar = () => {
  return (
    <Sidebar className="bg-gray-50 border-r border-[#8A1538]">
      {/* <Sidebar className="shrink-0 w-60 bg-gray-50 border-r border-[#8A1538] flex flex-col"> */}
      {/* Logo */}
      <SidebarHeader className="p-6 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-32" />
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="flex-1 py-4 space-y-1 m-2 overflow-y-auto hide-scrollbar">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-2 text-[15px] rounded-lg transition-all ${
                isActive
                  ? "bg-[#8A1538] text-white font-medium"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
