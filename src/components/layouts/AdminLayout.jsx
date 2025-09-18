import React from "react";

import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider style={{ fontFamily: "Poppins" }}>
      {/* Sidebar */}
      <AppSidebar />
      {/* Main Content */}
      <SidebarInset className="max-h-screen @container relative flex flex-1 flex-col">
        {/* Top bar */}
        <TopBar />

        {/* Page layout */}
        <div className="flex-1 p-6 pt-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
