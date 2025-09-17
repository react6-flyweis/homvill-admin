import React from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import overviewIcon from "@/assets/icons/overview.svg";
import usersIcon from "@/assets/icons/users.svg";
import propertiesIcon from "@/assets/icons/properties.svg";
import contractsIcon from "@/assets/icons/contracts.svg";
import chatIcon from "@/assets/icons/chat.svg";
import auditLogIcon from "@/assets/icons/audit-log.svg";
import subadminIcon from "@/assets/icons/subadmin.svg";
import bannersIcon from "@/assets/icons/banners.svg";
import subscriptionIcon from "@/assets/icons/subscription.svg";
import earningsIcon from "@/assets/icons/earnings.svg";
import promoIcon from "@/assets/icons/promo-code.svg";
import reviewsIcon from "@/assets/icons/reviews.svg";
import queryIcon from "@/assets/icons/query.svg";
import termsIcon from "@/assets/icons/terms.svg";
import privacyIcon from "@/assets/icons/privacy.svg";
import pushIcon from "@/assets/icons/push-notification.svg";
import helpIcon from "@/assets/icons/help.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const menuItems = [
  { label: "Overview", path: "/dashboard/home", icon: overviewIcon },
  { label: "Users", path: "/dashboard/users", icon: usersIcon },
  { label: "Properties", path: "/dashboard/properties", icon: propertiesIcon },
  { label: "Contracts", path: "/dashboard/contracts", icon: contractsIcon },
  { label: "Chat", path: "/dashboard/chat", icon: chatIcon },
  { label: "Audit Log", path: "/dashboard/audit-logs", icon: auditLogIcon },
  { label: "Add Sub Admin", path: "/dashboard/sub-admin", icon: subadminIcon },
  { label: "Banners", path: "/dashboard/banners", icon: bannersIcon },
  {
    label: "Subscriptions",
    path: "/dashboard/subscribe",
    icon: subscriptionIcon,
  },
  { label: "Earning", path: "/dashboard/earning", icon: earningsIcon },
  { label: "Promo Code", path: "/dashboard/promocode", icon: promoIcon },
  { label: "Reviews", path: "/dashboard/review", icon: reviewsIcon },
  { label: "User’s Query", path: "/dashboard/userquery", icon: queryIcon },
  { label: "Terms & Condition", path: "/dashboard/terms", icon: termsIcon },
  { label: "Privacy & Policy", path: "/dashboard/privacy", icon: privacyIcon },
  { label: "Push Notification", path: "/dashboard/push", icon: pushIcon },
  { label: "Help & Support", path: "/dashboard/support", icon: helpIcon },
];

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="bg-gray-50  border-r border-primary">
      {/* <Sidebar className="shrink-0 w-60 bg-gray-50 border-r border-[#8A1538] flex flex-col"> */}
      {/* Logo */}
      <SidebarHeader className="p-6 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-32" />
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="flex-1 py-4 space-y-1 m-2 hide-scrollbar">
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <NavLink
                to={item.path}
                // className={({ isActive }) =>
                //   `flex items-center gap-3 px-6 py-2 text-[15px] rounded-lg transition-all ${
                //     isActive
                //       ? "bg-[#8A1538] text-white font-medium"
                //       : "text-gray-700 hover:bg-gray-200"
                //   }`
                // }
              >
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    className="px-4 py-2 h-10 gap-3 data-[active=true]:bg-primary data-[active=true]:text-white text-gray-700 hover:bg-gray-200 font-medium [&>img]:size-max-w-4 [&>img]:size-max-w-4 [&>img]:shrink-0 data-[active=true]:[&>img]:invert data-[active=true]:[&>img]:brightness-0"
                  >
                    <img src={item.icon} alt={`${item.label} icon`} />
                    {item.label}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
