import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { PhotosCollage } from "./PhotosCollage";
import {AvatarUploader} from "./AvatarUploader";

const categories = [
  "Furnished Apartments",
  "Unfurnished Apartments",
  "Furnished Home",
  "Unfurnished Home",
  "Penthouse",
  "Studio Apartments",
];

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").optional(),
  category: z.string().min(1, "Select a category"),
  available: z.enum(["RENT", "SALE"]).default("RENT"),
  // features is a map of featureKey => boolean
  features: z.record(z.boolean()).optional().default({}),
  photos: z.array(z.string().nullable()).optional().default([]),
  avatar: z.string().nullable().optional(),
  propertyCost: z.string().optional(),
  yearBuild: z.string().optional(),
  plotSize: z.string().optional(),
  finishedSqFt: z.string().optional(),
  bedRooms: z.string().optional(),
  fullBaths: z.string().optional(),
  halfBaths: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  whenToSell: z.string().optional(),
  reasonForSelling: z.string().optional(),
  listingPrice: z.string().optional(),
  listingPlotSize: z.string().optional(),
  listingDescription: z.string().optional(),
});

export function PropertyEditor() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      category: "",
      available: "RENT",
      features: {},
      photos: [null, null, null, null, null, null, null],
      avatar: null,
    },
  });

  // Build default feature keys for the groups used below so we can
  // initialize form state easily. We'll keep keys safe for object paths.
  const slug = (s) =>
    s
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

  const appliances = [
    "Upgrading my home",
    "Garbage Disposal",
    "Refrigerator",
    "Microwave",
    "Dryer",
    "Trash Compactor",
    "Range Oven",
    "Washer",
    "Freezer",
  ];

  const floors = [
    "Carpet",
    "Laminate",
    "Softwood",
    "Concrete",
    "Linoleum-Vinyl",
    "Tile",
    "Hardwood",
    "Slate",
    "Other",
  ];

  const others = [
    "Security Systems",
    "Patio/Balcony",
    "Central Heating",
    "Basement",
    "Central AC",
    "Furnished",
    "Deck",
    "Fireplace",
    "Pool",
    "Porch",
  ];

  const parking = [
    "Carport",
    "Garage attached/Balcony",
    "Garage Attached",
    "On street",
    "Off Street",
    "None",
  ];

  const rooms = [
    "Breakfast Nik",
    "Master Bath",
    "Workshop",
    "Dining Room",
    "Office",
    "Sun Room",
    "Laundry Room",
    "Pantry",
    "Walk-in Closet Yard",
    "Library",
    "Recreation Room",
    "Family Room",
  ];

  const views = ["Mountain", "Territorial", "City", "Park", "Water"];

  // Initialize features defaults if not present
  React.useEffect(() => {
    const current = form.getValues("features") || {};
    const allLabels = [
      ...appliances,
      ...floors,
      ...others,
      ...parking,
      ...rooms,
      ...views,
    ];
    let changed = false;
    allLabels.forEach((label) => {
      const key = slug(label);
      if (!(key in current)) {
        current[key] = false;
        changed = true;
      }
    });
    if (changed) form.setValue("features", current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    console.log("Validated data:", data);
    // TODO: send to API
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-start gap-6">
          <AvatarUploader form={form} name="avatar" size={24} />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Owner Details</h3>
            <p className="text-sm text-gray-500">
              Provide the owner's contact information below.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <hr className="my-6 border-t" />

        <div>
          <h3 className="text-xl font-semibold">Property Details</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5 items-center">
              <div>
                <label className="text-sm block mb-2 text-gray-600">
                  Available For
                </label>
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="RENT" />
                        <span className="text-sm">RENT</span>
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="SALE" />
                        <span className="text-sm">SALE</span>
                      </label>
                    </RadioGroup>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="propertyCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="yearBuild"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Build</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plotSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finishedSqFt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finished Sq. Ft.</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedRooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bed Rooms</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullBaths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Baths</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="halfBaths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1/2 Baths</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* About The Property Section */}
        <hr className="my-6 border-t" />
        <div>
          <h3 className="text-xl font-semibold">About The Property</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whenToSell"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When do he want to sell</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonForSelling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for selling</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Listing Details Section */}
        <hr className="my-6 border-t" />
        <div>
          <h3 className="text-xl font-semibold">Listing Details</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <FormField
              control={form.control}
              name="listingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingPlotSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Size</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormLabel>Listing Description</FormLabel>
              <textarea
                className="min-h-[120px] w-full rounded border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Enter here"
                {...form.register("listingDescription")}
              />
            </div>

            <div className="col-span-2">
              <FormLabel className="text-sm block mb-3 text-gray-600">
                Photos
              </FormLabel>

              {/* Extracted collage component */}
              <PhotosCollage form={form} />
            </div>
          </div>
        </div>

        {/* Home Features Section (unchanged checklists) */}
        <hr className="my-6 border-t" />
        <div>
          <h3 className="text-xl font-semibold">Home Features</h3>

          <div className="mt-4 space-y-6">
            {/* Appliances */}
            <div>
              <h4 className="font-medium mb-2">Appliances</h4>
              <div className="flex flex-wrap gap-4">
                {appliances.map((a) => {
                  const key = slug(a);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>{a}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Floors */}
            <div>
              <h4 className="font-medium mb-2">Floors</h4>
              <div className="flex flex-wrap gap-4">
                {floors.map((f) => {
                  const key = slug(f);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>{f}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Others (small subset for brevity) */}
            <div>
              <h4 className="font-medium mb-2">Others</h4>
              <div className="flex flex-wrap gap-4">
                {others.map((o) => {
                  const key = slug(o);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>{o}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Parking */}
            <div>
              <h4 className="font-medium mb-2">Parking</h4>
              <div className="flex flex-wrap gap-4">
                {parking.map((p) => {
                  const key = slug(p);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>{p}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Rooms (small subset) */}
            <div>
              <h4 className="font-medium mb-2">Rooms</h4>
              <div className="flex flex-wrap gap-4">
                {rooms.map((r) => {
                  const key = slug(r);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(v) => field.onChange(!!v)}
                          />
                          <span>{r}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            {/* Views */}
            <div>
              <h4 className="font-medium mb-2">Views</h4>
              <div className="flex flex-wrap gap-4">
                {views.map((v) => {
                  const key = slug(v);
                  return (
                    <FormField
                      control={form.control}
                      key={key}
                      name={`features.${key}`}
                      render={({ field }) => (
                        <label className="inline-flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={(val) => field.onChange(!!val)}
                          />
                          <span>{v}</span>
                        </label>
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full bg-[#800020]">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
