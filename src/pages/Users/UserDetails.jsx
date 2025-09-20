import React from "react";
import { PenLine } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserById } from "@/queries/user";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: u = {}, isLoading, isError, error } = useGetUserById(id);

  if (isLoading) {
    return (
      <PageLayout title="Users details" description="Loading user...">
        <div className="space-y-6">
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <div className="flex items-center gap-6">
              <Skeleton className="rounded-full size-20" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout title="Users details" description="Error">
        <div className="p-6 text-destructive">
          Error loading user: {String(error)}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Users details - ${u.Name || u.name || "User"}`}
      description="User profile and details"
    >
      <div className="rounded-lg border p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-6">
          {/* Left: avatar + main info */}
          <div className="flex items-center gap-6">
            <Avatar className="size-20">
              <AvatarImage src={u.user_image} alt={u.Name} />
              <AvatarFallback>
                {u.Name?.charAt(0) + u.last_name?.charAt(0) || "??"}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <div className="font-medium">
                Name: {u.Name || u.name} {u.last_name || ""}
              </div>
              <div className="">Phone No: {u.phone}</div>
              <div className="">Email ID: {u.email}</div>
            </div>
          </div>

          {/* Middle/right: address block */}
          <div className="flex-1 px-8">
            <div className="">Street Address: {u.location || "-"}</div>
            <div className="">
              City:{" "}
              {u.City_id?.City_name ||
                u.City_id?.City_name ||
                u.City_id?.City_name ||
                "-"}
            </div>
            <div className="">Zip: {"-"}</div>
          </div>

          {/* Edit icon on the far right */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Edit user"
              onClick={() => navigate(`/dashboard/users/${id}/edit`)}
            >
              <PenLine weight="fill" className="size-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Property card - matches the attached design */}
      <div className="rounded-lg border p-6 bg-white shadow-sm">
        <h3 className="text-base font-semibold mb-6">Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium block mb-2">
              Street Address
            </label>
            <Input value={u.location || "-"} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">City</label>
            <Input
              value={
                (u.City_id && (u.City_id.City_name || u.City_id.City_name)) ||
                "-"
              }
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Zip</label>
            <Input value={"-"} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Country</label>
            <Input
              value={(u.Country_id && u.Country_id.Country_name) || "-"}
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Role</label>
            <Input value={(u.Role_id && u.Role_id.role_name) || "-"} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              Onboarding Date
            </label>
            <Input
              value={
                u.OnboardingDate
                  ? new Date(u.OnboardingDate).toLocaleDateString()
                  : "-"
              }
              readOnly
            />
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
            <Input value={u.Name || u.firstName || "-"} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Last Name</label>
            <Input value={u.last_name || "-"} readOnly />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">
              Phone Number
            </label>
            <Input value={u.phone || "-"} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">
              Email Address
            </label>
            <Input value={u.email || "-"} readOnly />
          </div>

          <div>
            <label className="text-xs text-muted-foreground">User Type</label>
            <Input value={(u.Role_id && u.Role_id.role_name) || "-"} readOnly />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Category</label>
            <Input
              value={
                (u.Responsibility_id &&
                  u.Responsibility_id.Responsibility_name) ||
                "-"
              }
              readOnly
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
