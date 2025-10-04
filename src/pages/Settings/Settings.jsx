import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AvatarUploader } from "@/components/Properties/AvatarUploader";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { EditIcon } from "lucide-react";
import { ChangePasswordDialog } from "@/components/Settings/ChangePasswordDialog";

const schema = z.object({
  avatar: z.string().nullable(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  gender: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

import { useGetUserByAuth } from "@/queries/user";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { RootFormErrors } from "@/components/RootFormErrors";
import { CountrySelect } from "@/components/Users/CountrySelect";
import { CitySelect } from "@/components/Users/CitySelect";
import { useUpdateProfile } from "@/mutations/user";
import { useAuthStore } from "@/store/authStore";
import { DatePicker } from "@/components/ui/DatePicker";
import extractApiError from "@/lib/errorHandler";

export default function Settings() {
  const [pwdOpen, setPwdOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: null,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      gender: "",
      address: "",
      postalCode: "",
      country: "",
      city: "",
    },
  });
  const authUser = useAuthStore((s) => s.user);
  const userId = authUser?.user_id;

  const { data: apiUser } = useGetUserByAuth();

  // when apiUser is available, map fields and reset the form
  useEffect(() => {
    if (!apiUser) return;

    const user = apiUser;

    const mapped = {
      avatar: user.user_image || null,
      firstName: user.Name || "",
      lastName: user.last_name || "",
      phone: user.phone || "",
      email: user.email || "",
      gender: user.gender || "",
      dateOfBirth: user.birthday || "",
      address: "",
      postalCode: "",
      country: user.Country_id?.Country_name || "",
      city: user.City_id?.City_name || "",
      password: "",
    };

    form.reset(mapped);
  }, [apiUser, form]);
  const { mutateAsync } = useUpdateProfile();

  // submit handler: uses the shared query mutation
  const onSubmit = async (data) => {
    const payload = {
      id: userId,
      Name: data.firstName,
      last_name: data.lastName,
      birthday: data.dateOfBirth,
      ...data,
    };
    try {
      await mutateAsync(payload);
      toast.success("Profile updated successfully");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: extractApiError(error) || "Failed to update profile",
      });
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <div className="flex gap-2 items-center">
            <h2 className="text-xl font-semibold text-primary">Settings</h2>
          </div>
          <p className="text-sm text-gray-500">Manage your profile details</p>
        </div>
      </div>

      <div className="flex gap-8 relative">
        <div>
          {/* AvatarUploader works with RHF by using form.watch / form.setValue */}
          <AvatarUploader form={form} name="avatar" size={24} />
        </div>

        <div className="flex-1 pt-8">
          <h3 className="text-xl font-bold mb-4">Profile Details</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="First name" />
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
                        <Input {...field} placeholder="Last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth</FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
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
                        <Input {...field} placeholder="Phone number" />
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
                        <Input type="email" {...field} placeholder="Email" />
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
                        <Input {...field} placeholder="Gender" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Postal Code" />
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
                        <CountrySelect {...field} />
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
                        <CitySelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <PasswordInput {...field} placeholder="Password" />
                          <button
                            type="button"
                            aria-label="Change password"
                            onClick={() => setPwdOpen(true)}
                            className="ml-2 text-primary p-2 rounded hover:bg-gray-100"
                          >
                            <EditIcon />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <RootFormErrors errors={form.formState.errors.root} />

              <div className="flex justify-center mt-6">
                <LoadingButton
                  isLoading={form.formState.isSubmitting}
                  type="submit"
                  className="rounded w-40"
                >
                  Save
                </LoadingButton>
              </div>
            </form>
          </Form>
          <ChangePasswordDialog
            open={pwdOpen}
            currentPassword={apiUser?.password || ""}
            onOpenChange={(v) => setPwdOpen(!!v)}
          />
        </div>
      </div>
    </div>
  );
}
