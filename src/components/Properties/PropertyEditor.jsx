import React from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const currentYear = new Date().getFullYear();

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { PhotosCollage } from "./PhotosCollage";
import { AvatarUploader } from "./AvatarUploader";
import { LoadingButton } from "@/components/ui/loading-button";
import { CategorySelect } from "./CategorySelect";
import { RootFormErrors } from "@/components/RootFormErrors";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").optional(),
  category: z.string().min(1, "Select a category"),
  available: z.enum(["RENT", "SALE"]).default("RENT"),
  // features is a map of featureKey => boolean | undefined (checkboxes can be undefined)
  features: z.record(z.string(), z.boolean().optional()).optional(),
  photos: z.array(z.string().nullable()).optional(),
  avatar: z.string().nullable().optional(),
  propertyCost: z.coerce
    .number({ invalid_type_error: "Property cost is required" })
    .positive({ message: "Property cost must be a positive number" }),
  yearBuild: z.coerce
    .number({ invalid_type_error: "Property year build is required" })
    .int({ message: "Property year build must be a valid year" })
    .min(1800, { message: "Property year build must be a valid year" })
    .max(currentYear + 1, {
      message: "Property year build must be a valid year",
    }),
  plotSize: z.coerce
    .number({ invalid_type_error: "Property plot size is required" })
    .nonnegative({ message: "Property plot size is required" }),
  finishedSqFt: z.coerce
    .number({ invalid_type_error: "Property finished square feet is required" })
    .nonnegative({ message: "Property finished square feet is required" }),
  bedRooms: z.coerce
    .number({ invalid_type_error: "Property bed rooms is required" })
    .int({ message: "Property bed rooms must be a non-negative integer" })
    .nonnegative({
      message: "Property bed rooms must be a non-negative integer",
    }),
  fullBaths: z.coerce
    .number({ invalid_type_error: "Property full baths is required" })
    .int({ message: "Property full baths must be a non-negative integer" })
    .nonnegative({
      message: "Property full baths must be a non-negative integer",
    }),
  halfBaths: z.coerce
    .number({ invalid_type_error: "Property one/two baths is required" })
    .int({ message: "Property one/two baths must be a non-negative integer" })
    .nonnegative({
      message: "Property one/two baths must be a non-negative integer",
    }),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  state: z.string().min(1, "Property state is required"),
  whenToSell: z.string().min(1, "Property why sell is required"),
  reasonForSelling: z.string().min(1, "Property reason selling is required"),
  listingPrice: z
    .string()
    .min(1, "Property listing price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Property listing price must be a positive number"
    ),
  listingPlotSize: z.string().min(1, "Property listing plot size is required"),
  listingDescription: z
    .string()
    .min(1, "Property listing description is required"),
});

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

const slug = (s) =>
  s
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

export function PropertyEditor({ onCreate }) {
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
      propertyCost: "",
      yearBuild: "",
      plotSize: "",
      finishedSqFt: "",
      bedRooms: "",
      fullBaths: "",
      halfBaths: "",
      state: "",
      whenToSell: "",
      reasonForSelling: "",
      listingPrice: "",
      listingPlotSize: "",
      listingDescription: "",
    },
  });

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
      if (!(key in current) || current[key] === undefined) {
        current[key] = false;
        changed = true;
      }
    });
    if (changed) form.setValue("features", current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    // Map form data to backend API shape
    const payload = {
      Properties_Status_id: 4, // Default to 'Available'
      Properties_for: data.available === "SALE" ? "Sell" : "Rent", // ['Sell', 'Rent', 'Buy']
      Properties_Category_id: 1, // TODO: map category to real id if available
      Owner_Fist_name: data.firstName,
      Owner_Last_name: data.lastName,
      Owner_phone_no: data.phone,
      Owner_email: data.email,
      Property_cost:
        typeof data.propertyCost === "number" ? data.propertyCost : undefined,
      Property_year_build:
        typeof data.yearBuild === "number" ? data.yearBuild : undefined,
      Property_Plot_size:
        typeof data.plotSize === "number" ? data.plotSize : data.plotSize,
      Property_finished_Sq_ft:
        typeof data.finishedSqFt === "number"
          ? data.finishedSqFt
          : data.finishedSqFt,
      Property_Bed_rooms:
        typeof data.bedRooms === "number" ? data.bedRooms : undefined,
      Property_Full_Baths:
        typeof data.fullBaths === "number" ? data.fullBaths : undefined,
      Property_OneTwo_Baths:
        typeof data.halfBaths === "number" ? data.halfBaths : undefined,
      Property_Address: data.streetAddress,
      Property_city: data.city,
      Property_zip: data.zip,
      Property_country: data.country,
      Property_state: data.state || "",
      Property_Why_sell: data.whenToSell,
      Property_Reason_Selling: data.reasonForSelling,
      Property_Listing_Price: data.listingPrice
        ? Number(data.listingPrice)
        : undefined,
      Property_Listing_plot_size: data.listingPlotSize,
      Property_Listing_Description: data.listingDescription,
      Property_photos: (data.photos || [])
        .filter(Boolean)
        .map((p, idx) => ({ Title: `Photo ${idx + 1}`, image: p })),
      Appliances: Object.entries(data.features || {})
        .filter(([, v]) => v)
        .map(([k]) => k),
      floors: (floors || [])
        .map((f) => slug(f))
        .filter((k) => (data.features || {})[k]),
      others: (others || [])
        .map((o) => slug(o))
        .filter((k) => (data.features || {})[k]),
      parking: (parking || [])
        .map((p) => slug(p))
        .filter((k) => (data.features || {})[k]),
      Rooms: (rooms || [])
        .map((r) => slug(r))
        .filter((k) => (data.features || {})[k]),
    };

    try {
      // Delegate creation to parent via onCreate prop
      if (typeof onCreate === "function") {
        await onCreate(payload);
      }
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: error.message || "Failed to create property",
      });
    }
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
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
                    <CategorySelect
                      value={field.value}
                      onValueChange={field.onChange}
                    />
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
                    <>
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
                      <FormMessage />
                    </>
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
                      <Input
                        type="number"
                        placeholder="Enter here"
                        {...field}
                      />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
                    <Input type="number" placeholder="Enter here" {...field} />
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
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
              <FormField
                control={form.control}
                name="listingDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="min-h-[120px] w-full rounded border border-input bg-transparent px-3 py-2 text-sm"
                        placeholder="Enter here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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

          <RootFormErrors
            errors={form.formState.errors.root}
            className="mt-5"
          />

          <div className="mt-6">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="w-full bg-[#800020]"
            >
              Add
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
