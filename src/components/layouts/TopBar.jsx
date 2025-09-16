import { BellIcon, SettingsIcon } from "lucide-react";
import { Button } from "../ui/button";

import profilePic from "@/assets/home.svg";
import { NotificationsDrawer } from "../Notifications/NotificationsDrawer";

export function TopBar() {
  return (
    <div className="w-full  bg-white h-16 border-b border-[#8A1538] flex justify-end items-center px-6">
      {/* Search */}
      {/* <input
            type="text"
            placeholder="Search..."
            className="w-1/3 px-4 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none"
          /> */}

      <div className="flex items-center justify-end gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-200 rounded-full"
        >
          <SettingsIcon className="text-blue-500 size-5" />
        </Button>

        <NotificationsDrawer>
          <Button
            variant="ghost"
            size="icon"
            className="bg-gray-200 rounded-full relative"
          >
            <BellIcon className="text-pink-500 size-5" />
            <span className="absolute top-1 right-1 w-2 h-2 border-2 border-pink-500 rounded-full" />
          </Button>
        </NotificationsDrawer>

        {/* Profile */}
        <img
          src={profilePic}
          alt="Profile"
          className="h-10 w-10 rounded-full border object-cover"
        />
      </div>
    </div>
  );
}
