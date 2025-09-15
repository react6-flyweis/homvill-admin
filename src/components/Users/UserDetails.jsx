import React from "react";
import { PenLine } from "lucide-react";
import { PageLayout } from "../layouts/PageLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UserDetails() {
  const randomId = Math.floor(Math.random() * 70) + 1;
  const avatarUrl = `https://i.pravatar.cc/150?img=${randomId}`;

  const user = {
    avatar: avatarUrl,
    firstName: "Alzoni",
    lastName: "Jakob",
    phone: "+1 7768 945 630",
    email: "example@gmail.com",
    address: "47 W 13th St",
    city: "New York",
    zip: "10011",
    userType: "Contractor",
    category: "Electrical Contractor",
  };

  return (
    <PageLayout
      title="Users details"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="rounded-lg border p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-6">
          {/* Left: avatar + main info */}
          <div className="flex items-center gap-6">
            <img
              src={user.avatar}
              alt="avatar"
              className="size-20 rounded-full object-cover"
            />
            <div className="">
              <div className="font-medium">
                Name: {user.firstName} {user.lastName}
              </div>
              <div className="">Phone No: {user.phone}</div>
              <div className="">Email ID: {user.email}</div>
            </div>
          </div>

          {/* Middle/right: address block */}
          <div className="flex-1 px-8">
            <div className="">Street Address: {user.address}</div>
            <div className="">City: {user.city}</div>
            <div className="">Zip: {user.zip}</div>
          </div>

          {/* Edit icon on the far right */}
          <div className="flex-shrink-0">
            <Button variant="ghost" size="icon" aria-label="Edit user">
              <PenLine weight="fill" className="size-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Property card - matches the attached design */}
      <div className="rounded-lg border p-6 bg-white shadow-sm">
        <h3 className="text-base font-semibold mb-6">
          Details of the Favorited Property
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium block mb-2">
              Street Address
            </label>
            <Input value={user.address} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">City</label>
            <Input value={user.city} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Zip</label>
            <Input value={user.zip} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Country</label>
            <Input value={"USA"} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">BHK</label>
            <Input value={"5BHK"} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Worth</label>
            <Input value={"$34,00,000"} readOnly />
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">About The User</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">First Name</label>
            <Input value={user.firstName} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Last Name</label>
            <Input value={user.lastName} readOnly />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input value={user.phone} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">
              Email Address
            </label>
            <Input value={user.email} readOnly />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">User Type</label>
            <Input value={user.userType} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Category</label>
            <Input value={user.category} readOnly />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
