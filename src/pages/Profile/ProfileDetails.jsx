import { Edit3, HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useGetUserByAuth } from "@/queries/user";

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
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);
  const clearToken = useAuthStore((s) => s.clearToken);

  const { data: user, isLoading } = useGetUserByAuth();

  function handleLogout() {
    // clear auth state and navigate to login
    try {
      clearToken();
      clearUser();
    } finally {
      navigate("/login");
    }
  }

  const fullName = `${user?.Name || ""} ${user?.last_name || ""}`.trim() || "—";
  const email = user?.email || "—";
  const phone = user?.phone || "—";
  const country = user?.Country_id?.Country_name || user?.Country || "—";
  const city = user?.City_id?.City_name || user?.City || "—";

  // Render skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="space-y-1">
            <div className="w-48 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-64 h-3 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-8">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 border animate-pulse" />
            </div>

            <div className="flex-1 pt-8">
              <div className="w-40 h-6 bg-gray-200 rounded mb-4 animate-pulse" />

              <div className="flex flex-wrap -mx-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-1/2 px-2 mb-4">
                    <div className="w-24 h-3 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="w-full h-10 bg-white border rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <Button onClick={handleLogout}>Logout</Button>
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
                src={user?.user_image}
                alt="avatar"
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {(user?.Name?.charAt?.(0) || "") +
                  (user?.last_name?.charAt?.(0) || "") || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Right: details and fields */}
          <div className="flex-1 pt-8">
            <h3 className="text-xl font-bold mb-4">Profile Details</h3>

            <div className="flex flex-wrap -mx-2">
              {field("Name", fullName)}
              {field(
                "Onboarding Date",
                user?.OnboardingDate
                  ? new Date(user.OnboardingDate).toLocaleDateString()
                  : "—"
              )}
              {field("Email Address", email)}
              {field("Address", city + ", " + country)}
              {field("Country", country)}
              {field("Phone Number", phone)}
              {field("Gender", user?.gender || "—")}
              {/*  */}
              {field("City", city)}
              {field("Employee ID", user?.Employee_id || "—")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
