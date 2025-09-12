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

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-sm">{label}</Label>}
      {children}
    </div>
  );
}

const appliances = [
  "Upgrading my home",
  "Garbage Disposal",
  "Refrigerator",
  "Microwave",
  "Dryer",
  "Trash Compactor",
  "Freezer",
  "Range Oven",
  "Washer",
];

const floors = ["Hardwood"];

const others = [
  "Security Systems",
  "Patio/Balcony",
  "Central Heating",
  "Basement",
  "Central AC",
  "Furnished",
  "Deck",
  "Porch",
  "Jetted Bathtub",
  "Fireplace",
  "Spa/Jacuzzi",
  "Fenced Yard",
  "Sprinkler System",
  "Pool",
];

const parking = ["Garage Attached"];

const rooms = [
  "Breakfast Nik",
  "Master Bath",
  "Workshop",
  "Dining Room",
  "Mud Room AC",
  "Solarium-Atrium",
  "Family Room",
  "Office",
  "Sun Room",
  "Laundry Room",
  "Pantry",
  "Walk-in Closet Yard",
  "Library",
  "Recreation Room",
];

const views = ["Water"];

export function PropertyDetailsContent({ enquiry }) {
  return (
    <div className="space-y-6 w-full">
      {/* Top summary card */}
      <Card className="relative gap-0">
        <CardHeader>
          <div className="absolute right-8 -top-8 flex flex-col">
            <span className="text-xs text-muted-foreground">Available For</span>
            <div className="text-center bg-primary text-white w-44 py-0.5 rounded shadow-md">
              SALE
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
                Street Address: 47 W 13th St
              </CardTitle>
              <CardDescription className="mt-1">City: New York</CardDescription>
              <CardDescription className="mt-1">Zip: 10011</CardDescription>
            </div>

            {/* Owner column */}
            <div className="flex-1">
              <div className="flex flex-col items-start md:items-end">
                <div className="text-sm font-medium">
                  Owner Name: <span className="font-normal">Jakob Calzoni</span>
                </div>
                <div className="mt-2 text-sm">
                  Phone No: <span className="font-normal">+1 7768 945 630</span>
                </div>
                <div className="mt-1 text-sm">
                  Email ID:{" "}
                  <span className="font-normal">example@gmail.com</span>
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
              <Input defaultValue="Furnished Apartments" />
            </Field>
            <Field label="Available For">
              <Input defaultValue="SALE" />
            </Field>

            <Field label="Finished Sq. Ft.">
              <Input defaultValue="990" />
            </Field>
            <Field label="Bed Rooms">
              <Input defaultValue="4" />
            </Field>

            <Field label="Full Baths">
              <Input defaultValue="2" />
            </Field>
            <Field label="1/2 Baths">
              <Input defaultValue="1" />
            </Field>

            <Field label="Year Build">
              <Input defaultValue="1987" />
            </Field>
            <Field label="Plot Size">
              <Input defaultValue="1000 Sq. Ft." />
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
                <Input defaultValue="47 W 13th St" />
              </Field>
              <Field label="Zip">
                <Input defaultValue="10011" />
              </Field>
              <Field label="When do he want to sell">
                <Input defaultValue="> 3 months" />
              </Field>
            </div>

            <div className="space-y-4">
              <Field label="City">
                <Input defaultValue="New York" />
              </Field>
              <Field label="Country">
                <Input defaultValue="USA" />
              </Field>
              <Field label="Reason for selling">
                <Input defaultValue="Upgrading my home" />
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
                <Input defaultValue="$110,000" />
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
                    initialImages={[
                      "https://images.unsplash.com/photo-1501183638714-8f3c5a6c5d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                      "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    ]}
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
                {appliances.map((a) => (
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
                {floors.map((f) => (
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
                {others.map((o) => (
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
                {parking.map((p) => (
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
                {rooms.map((r) => (
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
                {views.map((v) => (
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
  );
}
