import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RootFormErrors } from "@/components/RootFormErrors";
import { useResetForgetPassword } from "@/queries/auth";
import extractApiError from "@/lib/errorHandler";

const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number and special character"
      ),
    confirmPassword: z.string().min(1, "Please re-enter password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const NewPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // email and otp MUST come from router state
  const emailFromRouter = state?.email;
  const otpFromRouter = state?.otp;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const { mutateAsync, isLoading } = useResetForgetPassword();

  useEffect(() => {
    if (!emailFromRouter || !otpFromRouter) {
      // redirect back to forgot if state missing
      const t = setTimeout(() => navigate("/forgot"), 800);
      return () => clearTimeout(t);
    }
  }, [emailFromRouter, otpFromRouter, navigate]);

  const onSubmit = async (values) => {
    if (!emailFromRouter || !otpFromRouter) {
      form.setError("root", {
        message: "Missing email or OTP. Please request OTP again.",
      });
      return;
    }

    try {
      await mutateAsync({
        email: emailFromRouter,
        otp: String(otpFromRouter),
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      // on success navigate to login
      navigate("/login", { replace: true });
    } catch (err) {
      form.setError("root", {
        message:
          extractApiError(err) || "An error occurred while resetting password.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-[22px] font-semibold text-[#000000] text-center mb-2">
        Set New Password
      </h2>

      <p className="text-center text-sm text-gray-600 mb-8">
        Enter your new password here to continue with{" "}
        <span className="font-semibold">HOMVILL</span>
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RootFormErrors errors={form.formState.errors.root} />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] text-[#7C838A] mb-1">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="w-full px-4 py-3 border bg-[#F3F5F6] border-gray-300 rounded-lg text-sm h-12"
                    placeholder="Enter your Password here"
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
                <FormLabel className="block text-[16px] text-[#7C838A] mb-1">
                  Re-Enter Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="w-full px-4 py-3 border bg-[#F3F5F6] border-gray-300 rounded-lg text-sm h-12"
                    placeholder="Re-Enter Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center">
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting || isLoading}
              className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[18px] h-12"
            >
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>

      <div className="mt-6 text-sm text-gray-600">
        <p className="mb-2">
          <span className="font-semibold">Length:</span> Minimum 8 characters,
          maximum 20 characters.
        </p>
        <p className="mb-1 font-semibold">Complexity:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Uppercase Letter (A–Z)</li>
          <li>Lowercase Letter (a–z)</li>
          <li>Number (0–9)</li>
          <li>Special Character (@#$%^&amp;*()-_+=[]{}|.,?)</li>
        </ul>
      </div>
    </div>
  );
};

export default NewPassword;
