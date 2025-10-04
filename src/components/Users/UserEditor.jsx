import { AvatarUploader } from "@/components/Properties/AvatarUploader";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CountrySelect } from "@/components/Users/CountrySelect";
import { StateSelect } from "@/components/Users/StateSelect";
import { CitySelect } from "@/components/Users/CitySelect";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/ui/loading-button";
import extractApiError from "@/lib/errorHandler";
import { RootFormErrors } from "@/components/RootFormErrors";
import DatePicker from "@/components/ui/DatePicker";

export const UserEditor = ({ onSubmit, initialValues = null }) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: "",
      userType: "",
      userCategory: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      date: "",
      idNumber: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
    }
  }, [initialValues]);

  const USER_TYPES = ["Buyer", "Renter", "Seller", "Contractor", "Builder"];

  const GENDERS = ["Male", "Female", "Other"];

  const USER_CATEGORIES = [
    "N/A",
    "Electrical Contractor",
    "Plumbing Contractor",
    "HVAC Contractor",
    "Roofing Contractor",
    "Carpentry Contractor",
    "Painting Contractor",
    "Masonry Contractor",
    "Landscape Contractor",
    "Maintenance Contractor",
    "Builder",
    "Other",
  ];

  async function handleSubmit(data) {
    try {
      await onSubmit(data);
    } catch (error) {
      const message = extractApiError(error);
      form.setError("root", { message });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Profile Section */}
          <h2 className="text-lg font-semibold mb-4 ml-[86px]">
            Profile Details
          </h2>
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Image */}
            <AvatarUploader />

            {/* Profile Inputs */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First Name" {...field} />
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
                      <Input placeholder="Enter Last Name" {...field} />
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
                      <Input placeholder="Enter Phone Number" {...field} />
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
                      <Input
                        type="email"
                        placeholder="Enter Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded w-full">
                          <SelectValue placeholder="Select User Type" />
                        </SelectTrigger>
                        <SelectContent
                          VPClassName="p-0"
                          className="border-0 shadow-none"
                        >
                          {USER_TYPES.map((type) => (
                            <SelectItem
                              className="border bg-accent focus:bg-primary focus:text-white"
                              key={type}
                              value={type}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent
                          VPClassName="p-0"
                          className="border-0 shadow-none"
                        >
                          {GENDERS.map((g) => (
                            <SelectItem
                              className="border bg-accent focus:bg-primary focus:text-white"
                              key={g}
                              value={g}
                            >
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded w-full">
                          <SelectValue placeholder="Select User Category" />
                        </SelectTrigger>
                        <SelectContent
                          VPClassName="p-0"
                          className="border-0 shadow-none"
                        >
                          {USER_CATEGORIES.map((cat) => (
                            <SelectItem
                              className="border bg-accent focus:bg-primary focus:text-white"
                              key={cat}
                              value={cat}
                            >
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="ml-24">
            <h2 className="text-lg font-semibold mb-4">User Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Street Address" {...field} />
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
                    <FormControl>
                      <StateSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      />
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
                    <FormControl>
                      <CitySelect
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      />
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
                    <FormControl>
                      <Input type="number" placeholder="Zip" {...field} />
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
                    <FormControl>
                      <CountrySelect
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Other Details */}
            <h2 className="text-lg font-semibold mb-4">Other Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Aadhar/PAN"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <RootFormErrors errors={form.formState.errors.root} />

            {/* Submit Button */}
            <div>
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                size="lg"
                className="w-full rounded"
              >
                {initialValues ? "Update" : "Add"} User
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
