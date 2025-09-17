import { Edit3, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const field = (label, value) => (
  <div className="w-1/2 px-2 mb-4">
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      className="w-full border rounded px-3 py-2 text-sm bg-white"
      value={value}
      readOnly
    />
  </div>
);

export default function ProfileDetails() {
  return (
    <div className="">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <div className="flex gap-2 items-center">
            <HomeIcon className="text-primary" />
            <h2 className="text-xl font-semibold text-primary">
              Admin Profile
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            Lorem Ipsum is simply dummy text
          </p>
        </div>
        <div className="ml-auto">
          <Button>Logout</Button>
        </div>
      </div>

      <div className="relative">
        {/* Edit button top-right inside card -> navigates to settings */}
        <Link
          to="/dashboard/settings"
          aria-label="Edit profile settings"
          className="absolute right-4 top-4 bg-white border rounded-full p-2 shadow flex items-center justify-center"
        >
          <Edit3 size={16} className="text-primary" />
        </Link>

        <div className="flex gap-8">
          {/* Left: avatar column */}
          <div className="flex-shrink-0 flex flex-col items-center ">
            <Avatar className="w-24 h-24 border">
              <AvatarImage
                src={`https://picsum.photos/seed/${Math.floor(
                  Math.random() * 10000
                )}/200`}
                alt="avatar"
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </div>

          {/* Right: details and fields */}
          <div className="flex-1 pt-8">
            <h3 className="text-xl font-bold mb-4">Profile Details</h3>

            <div className="flex flex-wrap -mx-2">
              {field("Name", "Davis Vaccaro")}
              {field("Date Of Birth", "12/12/1994")}
              {field("Email Address", "example@gmail.com")}
              {field("Address", "San Jose, California, USA")}
              {field("Country", "USA")}
              {field("Phone Number", "+1 9874 562103")}
              {field("Gender", "Male")}
              {field("Postal Code", "700001")}
              {field("City", "San Jose")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
