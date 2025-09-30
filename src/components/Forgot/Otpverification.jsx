import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { LoadingButton } from "@/components/ui/loading-button";
import { RootFormErrors } from "@/components/RootFormErrors";
import { useVerifyForgetPasswordOtp } from "@/queries/auth";
import OtpTimerResend from "./OtpTimerResend";
import extractApiError from "@/lib/errorHandler";
import OtpInputs from "@/components/Forgot/OtpInputs";

const otpSchema = z.object({
  email: z.string().email().optional(),
  otp: z
    .string()
    .min(4, "OTP must be at least 4 characters")
    .max(6, "OTP must be at most 6 characters"),
});

const Otpverification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // email MUST come from router state (we don't add an extra email field)
  const emailFromRouter = state?.email;

  // If email is missing, we should redirect back to the forgot page

  // pre-fill otp if passed via navigation state
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: state?.otp ? String(state.otp) : "",
    },
  });

  const mutation = useVerifyForgetPasswordOtp();
  const [infoMessage, setInfoMessage] = useState("");

  // refs and state for digit inputs
  // OTP inputs are rendered by OtpInputs child component

  const onSubmit = async (values) => {
    if (!emailFromRouter) {
      form.setError("root", {
        message: "Email is missing. Please request OTP again.",
      });
      return;
    }

    try {
      await mutation.mutateAsync({
        email: emailFromRouter,
        otp: values.otp,
      });
      // on success navigate to new password page, pass email along
      navigate("/forgot/newpassword", {
        replace: true,
        state: { email: emailFromRouter, otp: values.otp },
      });
    } catch (err) {
      form.setError("root", {
        message:
          extractApiError(err) || "An error occurred while verifying OTP.",
      });
    }
  };

  // If email is missing, redirect user back to forgot page to re-enter email
  useEffect(() => {
    if (!emailFromRouter) {
      // small timeout so user sees page briefly if they were navigated here accidentally
      const t = setTimeout(() => navigate("/forgot"), 800);
      return () => clearTimeout(t);
    }
  }, [emailFromRouter, navigate]);

  // resend/timer handled by OtpTimerResend child

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-[20px] font-semibold text-[#000000] mb-2">
        OTP Verification
      </h2>
      <p className="text-center text-sm text-gray-500 mb-2">
        Our team already sent you an email in your email{" "}
        <span className="text-[#8A1538] font-medium">
          {emailFromRouter || "example@gmail.com"}
        </span>{" "}
        to access back your account.
      </p>

      {infoMessage ? (
        <p className="text-center text-sm text-green-600 mb-4">{infoMessage}</p>
      ) : null}

      {/* Timer and resend handled by child component */}
      <OtpTimerResend
        email={emailFromRouter}
        onInfo={(m) => setInfoMessage(m)}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RootFormErrors errors={form.formState.errors.root} />

          {/* no email input - email is sourced from router state */}

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-[16px] text-[#7C838A] mb-1">
                  OTP
                </FormLabel>
                <OtpInputs
                  value={field.value}
                  onChange={field.onChange}
                  length={6}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center">
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting || mutation.isLoading}
              className="w-[340px] bg-[#8A1538] text-white py-2 rounded-lg font-medium text-[18px] h-12"
            >
              Continue
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Otpverification;
