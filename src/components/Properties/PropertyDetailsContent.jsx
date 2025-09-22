import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PhotosCollage } from "@/components/Properties/PhotosCollage";
import { PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

import soldBanner from "@/assets/sold-banner.png";
import rentedBanner from "@/assets/rented-banner.png";
import { Skeleton } from "@/components/ui/skeleton";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm">{label}</Label>}
      {children}
    </div>
  );
}

export function PropertyDetailsContent({
  enquiry,
  tourDetails,
  contract,
  property,
  loading,
  error,
  onRetry,
}) {
  // Render skeleton placeholders while loading
  if (loading) {
    return (
      <div className="space-y-6 w-full">
        {/* Top summary skeleton */}
        <div className="p-4 bg-card rounded-md shadow-sm">
          <div className="flex items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-full" rounded={false} />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-1/3 h-3" />
            </div>
            <div className="w-36">
              <Skeleton className="w-full h-8" />
            </div>
          </div>
        </div>

        {/* Several card skeletons to mimic details */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-card rounded-md shadow-sm">
            <Skeleton className="w-full h-6 mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10 md:col-span-2" />
            </div>
          </div>

          <div className="p-4 bg-card rounded-md shadow-sm">
            <Skeleton className="w-full h-6 mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-32 md:col-span-2" />
            </div>
          </div>

          <div className="p-4 bg-card rounded-md shadow-sm">
            <Skeleton className="w-full h-6 mb-3" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render an error state when `error` prop is present
  if (error) {
    const message =
      typeof error === "string"
        ? error
        : error?.message || "Something went wrong while loading the property.";

    return (
      <div className="w-full">
        <Card className="border border-rose-200 bg-rose-50">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="text-rose-700">Error</CardTitle>
              <div className="text-sm text-rose-700">Failed to load</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 text-sm text-rose-800">{message}</div>
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() =>
                    onRetry ? onRetry() : window.location.reload()
                  }
                >
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  // derive status from property if available
  const statusFromProp = (
    property?.Properties_Status_id?.Pro_Status || ""
  ).toLowerCase();
  let status = "available"; // possible values: 'available', 'rented', 'sold'
  if (statusFromProp === "rent" || statusFromProp === "rented")
    status = "rented";
  else if (statusFromProp === "sold") status = "sold";
  else status = property?.Status === false ? "sold" : "available";

  return (
    <div className="relative">
      {status !== "available" && (
        <div className="absolute left-1/2 -translate-x-1/2 top-20 bg-pink-100 p-1 px-2 rounded shadow-lg text-primary z-10 flex font-semibold items-center justify-center">
          <p className="">
            Sorry, this property is no longer available — it has been {status}.
          </p>
        </div>
      )}

      {status !== "available" && (
        <div className="absolute rounded-full border-2 border-primary right-15 -top-15 bg-white w-28 h-28 overflow-hidden shadow-xl z-50 flex items-center justify-center">
          <img
            src={status === "sold" ? soldBanner : rentedBanner}
            alt="overlay"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          "space-y-6 w-full relative",
          status !== "available" && "opacity-30"
        )}
      >
        {/* Top summary card */}
        <Card className="relative gap-0">
          <CardHeader
            className={cn(status === "available" ? "flex" : "hidden ")}
          >
            <div className="absolute right-8 -top-8 flex flex-col">
              <span className="text-xs text-muted-foreground">
                {contract ? "Category" : "Available For"}
              </span>
              <div className="text-center bg-primary text-white w-44 py-0.5 rounded shadow-md">
                {contract
                  ? contract.category
                  : property?.Properties_for
                  ? property.Properties_for.toUpperCase() === "SELL"
                    ? "SALE"
                    : property.Properties_for.toUpperCase()
                  : "SALE"}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 w-full">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center">
                {/* use Avatar component */}
                <img
                  // random user avatar
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="property"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Address column */}
              <div className="flex-1">
                <CardTitle className="text-base">
                  Street Address: {property?.Property_Address || "47 W 13th St"}
                </CardTitle>
                <CardDescription className="mt-1">
                  City: {property?.Property_city || "New York"}
                </CardDescription>
                <CardDescription className="mt-1">
                  Zip: {property?.Property_zip || "10011"}
                </CardDescription>
              </div>

              {/* Owner column */}
              <div className="flex-1">
                <div className="flex flex-col items-start md:items-end">
                  <div className="text-sm font-medium">
                    Owner Name:{" "}
                    <span className="font-normal">
                      {[property?.Owner_Fist_name, property?.Owner_Last_name]
                        .filter(Boolean)
                        .join(" ") || "Jakob Calzoni"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    Phone No:{" "}
                    <span className="font-normal">
                      {property?.Owner_phone_no || "+1 7768 945 630"}
                    </span>
                  </div>
                  <div className="mt-1 text-sm">
                    Email ID:{" "}
                    <span className="font-normal">
                      {property?.Owner_email || "example@gmail.com"}
                    </span>
                  </div>
                </div>
              </div>

              <CardAction>
                <Button variant="ghost" aria-label="Edit property">
                  <PencilLine className="w-5 h-5 text-rose-600" />
                </Button>
              </CardAction>
            </div>
          </CardContent>
        </Card>

        {/* Tour Requested By - render only when tourDetails is passed */}
        {tourDetails && (
          <Card
            className={
              tourDetails.status === "approved"
                ? "bg-emerald-50"
                : tourDetails.status === "rejected"
                ? "bg-rose-50"
                : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <CardTitle>Tour Requested By</CardTitle>
                </div>

                {tourDetails.status === "approved" ? (
                  <div className=" text-emerald-700 rounded px-3 py-1 text-sm font-medium">
                    Tour Approved
                  </div>
                ) : tourDetails.status === "rejected" ? (
                  <div className=" text-rose-700 rounded px-3 py-1 text-sm font-medium">
                    Tour Rejected
                  </div>
                ) : (
                  <div className="flex gap-6">
                    <Button
                      variant="link"
                      className="text-emerald-600 font-medium"
                    >
                      Approve Tour
                    </Button>
                    <Button
                      variant="link"
                      className="text-rose-600 font-medium"
                    >
                      Reject Tour
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name">
                  <Input defaultValue={tourDetails.fullName || ""} />
                </Field>

                <Field label="Tour Mode">
                  <Input defaultValue={tourDetails.mode || ""} />
                </Field>

                <Field label="Scheduled ON">
                  <Input defaultValue={tourDetails.scheduledOn || ""} />
                </Field>

                <Field label="Time">
                  <Input defaultValue={tourDetails.time || ""} />
                </Field>

                <Field label="Phone Number">
                  <Input defaultValue={tourDetails.phone || ""} />
                </Field>

                <Field label="Email">
                  <Input defaultValue={tourDetails.email || ""} />
                </Field>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Property Offer Enquired By - render only when showEnquiry is true */}
        {enquiry && (
          <Card className={{ "bg-green-50": enquiry.sold }}>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Property Offer Enquired By</CardTitle>
                <div className="absolute left-1/2 -translate-x-1/2 bg-red-100 rounded w-48 py-2 text-center font-bold text-red-700">
                  Sold for $105,000
                </div>
                <a href="#" className="text-sm text-emerald-600 font-medium">
                  Contact Them
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name">
                  <Input defaultValue="Mathew Joe" />
                </Field>

                <Field label="Trough">
                  <Input defaultValue="Webiste" />
                </Field>

                <Field label="Enquiry ON">
                  <Input defaultValue="05-04-2025" />
                </Field>

                <Field label="Time">
                  <Input defaultValue="12:00 PM" />
                </Field>

                <Field label="Phone Number">
                  <Input defaultValue="+1 7854 945 630" />
                </Field>

                <Field label="Email">
                  <Input defaultValue="heavenhor23@gmail.com" />
                </Field>
              </div>
            </CardContent>
          </Card>
        )}

        {/* About The Owner */}
        <Card>
          <CardHeader>
            <CardTitle>About The Owner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Field label="First Name">
                  <Input defaultValue="Jakob" />
                </Field>

                <Field label="Phone Number">
                  <Input defaultValue="+1 7768 945 630" />
                </Field>
              </div>

              <div className="space-y-4">
                <Field label="Last Name">
                  <Input defaultValue="Calzoni" />
                </Field>

                <Field label="Email Address">
                  <Input defaultValue="example@gmail.com" />
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category / Property details grid */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Category">
                <Input
                  defaultValue={
                    property?.Properties_Category_id?.name ||
                    "Furnished Apartments"
                  }
                />
              </Field>
              <Field label="Available For">
                <Input
                  defaultValue={
                    property?.Properties_for
                      ? property.Properties_for.toUpperCase() === "SELL"
                        ? "SALE"
                        : property.Properties_for.toUpperCase()
                      : "SALE"
                  }
                />
              </Field>

              <Field label="Finished Sq. Ft.">
                <Input
                  defaultValue={property?.Property_finished_Sq_ft || "990"}
                />
              </Field>
              <Field label="Bed Rooms">
                <Input defaultValue={property?.Property_Bed_rooms ?? "4"} />
              </Field>

              <Field label="Full Baths">
                <Input defaultValue={property?.Property_Full_Baths ?? "2"} />
              </Field>
              <Field label="1/2 Baths">
                <Input defaultValue={property?.Property_OneTwo_Baths ?? "1"} />
              </Field>

              <Field label="Year Build">
                <Input defaultValue={property?.Property_year_build ?? "1987"} />
              </Field>
              <Field label="Plot Size">
                <Input
                  defaultValue={property?.Property_Plot_size || "1000 Sq. Ft."}
                />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* About The Property */}
        <Card>
          <CardHeader>
            <CardTitle>About The Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Field label="Street Address">
                  <Input
                    defaultValue={property?.Property_Address || "47 W 13th St"}
                  />
                </Field>
                <Field label="Zip">
                  <Input defaultValue={property?.Property_zip || "10011"} />
                </Field>
                <Field label="When do he want to sell">
                  <Input
                    defaultValue={property?.Property_Why_sell || "> 3 months"}
                  />
                </Field>
              </div>

              <div className="space-y-4">
                <Field label="City">
                  <Input defaultValue={property?.Property_city || "New York"} />
                </Field>
                <Field label="Country">
                  <Input defaultValue={property?.Property_country || "USA"} />
                </Field>
                <Field label="Reason for selling">
                  <Input
                    defaultValue={
                      property?.Property_Reason_Selling || "Upgrading my home"
                    }
                  />
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Listing Details */}
        <Card>
          <CardHeader>
            <CardTitle>Listing Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Field label="Listing Price">
                  <Input
                    defaultValue={
                      property?.Property_Listing_Price ??
                      property?.Property_cost
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(
                            property.Property_Listing_Price ??
                              property.Property_cost
                          )
                        : "$110,000"
                    }
                  />
                </Field>
              </div>

              <div>
                <Field label="Video Link">
                  <Input defaultValue="https://www.youtube.com/watch?v=kBMK4ppEKTM" />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Listing Description">
                  <textarea
                    className="w-full min-h-[140px] rounded-md border border-input bg-transparent px-3 py-3 text-sm leading-relaxed resize-vertical"
                    defaultValue={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.`}
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Photos">
                  <div className="mt-2">
                    <PhotosCollage
                      initialImages={
                        property?.Property_photos?.length
                          ? property.Property_photos.map((p) => p.image)
                          : [
                              "https://images.unsplash.com/photo-1501183638714-8f3c5a6c5d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                            ]
                      }
                      preview={true}
                    />
                  </div>
                </Field>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Home Features */}
        <Card>
          <CardHeader>
            <CardTitle>Home Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Appliances</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.Appliances?.map((a) => (
                    <label
                      key={a}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Floors</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.floors?.map((f) => (
                    <label
                      key={f}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Others</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.others?.map((o) => (
                    <label
                      key={o}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{o}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Parking</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.parking?.map((p) => (
                    <label
                      key={p}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Rooms</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.Rooms?.map((r) => (
                    <label
                      key={r}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Views</h4>
                <div className="flex flex-wrap gap-3">
                  {property?.others?.map((v) => (
                    <label
                      key={v}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox defaultChecked />
                      <span className="text-sm">{v}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
