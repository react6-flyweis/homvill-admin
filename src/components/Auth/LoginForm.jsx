import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAdminLogin } from "@/queries/auth";
import { useAuthStore } from "@/store/authStore";
import { RootFormErrors } from "@/components/RootFormErrors";
import { LoadingButton } from "@/components/ui/loading-button";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const mutation = useAdminLogin();
  const setRemember = useAuthStore((s) => s.setRemember);

  const onSubmit = async (values) => {
    try {
      // ensure storage type is set before mutation writes persisted state
      try {
        setRemember(!!values.remember);
      } catch (e) {
        // ignore if storage is unavailable
      }

      await mutation.mutateAsync({
        email: values.email,
        password: values.password,
        role_id: 2,
      });
      navigate("/dashboard");
    } catch (err) {
      form.setError("root", { message: "An error occurred" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <RootFormErrors errors={form.formState.errors.root} />
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
                  type="email"
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

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                    className="mr-2 accent-[#8A1538]"
                  />
                </FormControl>
                <FormLabel className="flex items-center text-[17px] text-[#1D1D1D] !mb-0">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />

          <button
            type="button"
            onClick={() => navigate("/forgot")}
            className="text-[17px] text-[#8A1538] font-medium"
          >
            Forgot password?
          </button>
        </div>

        <div className="flex flex-col items-center">
          <LoadingButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[24px] h-12"
          >
            Log In
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
