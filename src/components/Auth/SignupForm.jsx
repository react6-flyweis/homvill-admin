import React from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";

const signupSchema = z
  .object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm({ onSubmit: onSubmitProp }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values) => {
    if (onSubmitProp) {
      onSubmitProp(values);
    } else {
      // Default behaviour: navigate to login after signup
      navigate("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-[20px] text-[#7C838A] mb-1">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Email here"
                  {...field}
                  className="w-full mpx-4 py-3 border bg-[#B0BAC340] border-gray-300 rounded-lg text-sm h-12"
                />
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
              <FormLabel className="block text-[20px] text-[#7C838A] mb-1">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your Password here"
                  {...field}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 bg-[#B0BAC340] rounded-lg text-sm h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-[20px] text-[#7C838A] mb-1">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Re-Enter your Password here"
                  {...field}
                  className="w-full mb-4 px-4 py-3 border border-gray-300 bg-[#B0BAC340] rounded-lg text-sm h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center">
          <Button
            type="submit"
            className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[24px] h-12"
          >
            Register Now
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;
