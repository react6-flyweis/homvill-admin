import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { AvatarUploader } from "@/components/Properties/AvatarUploader";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AddUserForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      userType: "",
      userCategory: "",
      street: "",
      city: "",
      zip: "",
      country: "",
      date: "",
      idNumber: "",
    },
  });

  useEffect(() => {
    let timer;
    if (isOpen) {
      // Close modal and navigate after 2 seconds
      timer = setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard/users");
      }, 2000);
    }
    return () => clearTimeout(timer); // cleanup timer
  }, [isOpen, navigate]);

  function onSubmit(data) {
    // Replace with real API call
    console.log("New user:", data);
    setIsOpen(true);
  }

  return (
    <div className="">
      {/* Header */}
      <div
        onClick={() => navigate("/dashboard/users")}
        className="flex items-center gap-2 mb-1"
      >
        <ArrowLeft size={20} className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Add A User</h1>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <SelectTrigger className="rounded-md w-full">
                            <SelectValue placeholder="Select User Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Buyer">Buyer</SelectItem>
                            <SelectItem value="Renter">Renter</SelectItem>
                            <SelectItem value="Seller">Seller</SelectItem>
                            <SelectItem value="Contractor">
                              Contractor
                            </SelectItem>
                            <SelectItem value="Builder">Builder</SelectItem>
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
                          <SelectTrigger className="rounded-md w-full">
                            <SelectValue placeholder="Select User Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="N/A">N/A</SelectItem>
                            <SelectItem value="Electrical Contractor">
                              Electrical Contractor
                            </SelectItem>
                            <SelectItem value="Plumbing Contractor">
                              Plumbing Contractor
                            </SelectItem>
                            <SelectItem value="HVMC Contractor">
                              HVMC Contractor
                            </SelectItem>
                            <SelectItem value="Roofing Contractor">
                              Roofing Contractor
                            </SelectItem>
                            <SelectItem value="Carpentry Contractor">
                              Carpentry Contractor
                            </SelectItem>
                            <SelectItem value="Painting Contractor">
                              Painting Contractor
                            </SelectItem>
                            <SelectItem value="Masonry Contractor">
                              Masonry Contractor
                            </SelectItem>
                            <SelectItem value="Landscape Contractor">
                              Landscape Contractor
                            </SelectItem>
                            <SelectItem value="Maintenance Contractor">
                              Maintenance Contractor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      {/* <FormDescription>
                        Apartment / Items / Plumbing / Painting etc.
                      </FormDescription> */}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="City" {...field} />
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
                        <Input placeholder="Zip" {...field} />
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
                        <Input placeholder="Country" {...field} />
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
                        <Input type="date" {...field} />
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
                        <Input placeholder="Aadhar/PAN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="w-full bg-[#8A1538] text-white py-2 rounded-md"
                >
                  Add
                </Button>
              </div>
            </div>
          </form>
        </Form>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] h-[300px]  text-center">
              {/* Icon */}
              <div className="flex justify-center mt-12 mb-6">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-pink-400">
                  <Check className="w-8 h-8 text-white" />
                  {/* Dots animation effect */}
                  <span className="absolute w-24 h-24 rounded-full border-4 border-pink-200 animate-ping"></span>
                </div>
              </div>

              {/* Message */}
              <p className="text-[#8A1538] font-medium mt-16 text-lg">
                A New User Added Successfully
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserForm;
