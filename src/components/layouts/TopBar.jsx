import { BellIcon, SettingsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { NotificationsDrawer } from "../Notifications/NotificationsDrawer";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function TopBar() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  return (
    <div className="w-full py-2 flex justify-between items-center px-4 border-b-2 border-primary">
      {/* Search */}

      <div className="relative w-1/3">
        <SearchIcon className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search here..."
          className="pl-10 h-8 bg-muted rounded-md border-0"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-200 rounded-full"
          onClick={() => navigate("/dashboard/settings")}
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
        <button onClick={() => navigate("/dashboard/profile")}>
          <Avatar className="h-10 w-10 rounded-full border overflow-hidden">
            <AvatarImage
              src={user?.user_image}
              alt={user?.name || "Profile"}
              className="object-cover"
            />
            <AvatarFallback>
              {user.Name.charAt(0) + user?.last_name?.charAt(0) || "??"}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
}
