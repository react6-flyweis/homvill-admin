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
import { LoadingButton } from "@/components/ui/loading-button";
import { RootFormErrors } from "@/components/RootFormErrors";
import { useSendForgetPasswordOtp } from "@/queries/auth";
import extractApiError from "@/lib/errorHandler";

const forgotSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});

const Forgot = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const mutation = useSendForgetPasswordOtp();

  const onSubmit = async (values) => {
    try {
      const res = await mutation.mutateAsync({ email: values.email });
      // navigate to OTP verification page and pass email in state
      navigate("/forgot/otpverification", {
        replace: true,
        state: { email: values.email, otp: res.OTP },
      });
    } catch (err) {
      const otp = err.response?.data.OTP;
      if (otp) {
        navigate("/forgot/otpverification", {
          replace: true,
          state: { email: values.email, otp },
        });
      }
      form.setError("root", {
        message: extractApiError(err) || "An error Occurred.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-[30px] text-center text-[#000000] font-semibold mb-2">
        Forgot Password
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Input your email to recover password to access App Name account
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RootFormErrors errors={form.formState.errors.root} />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] text-[#7C838A] mb-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your Email here"
                    {...field}
                    className="w-full px-4 py-3 border bg-[#F3F5F6] border-gray-300 rounded-lg text-sm h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center">
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting || mutation.isLoading}
              className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[20px] h-12"
            >
              Continue
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Forgot;
