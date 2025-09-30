import React, { useEffect, useState } from "react";
import { useSendForgetPasswordOtp } from "@/queries/auth";
import extractApiError from "@/lib/errorHandler";

/**
 * OtpTimerResend
 * Props:
 * - email: string (required) - email to resend OTP to
 * - initialSeconds: number (optional) - countdown start in seconds (default 180)
 * - onInfo: function(message: string) - called with info messages (success/error)
 */
const OtpTimerResend = ({ email, initialSeconds = 180, onInfo = () => {} }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const mutation = useSendForgetPasswordOtp();

  useEffect(() => {
    if (!email) return;
    if (secondsLeft <= 0) return;
    const id = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000
    );
    return () => clearInterval(id);
  }, [secondsLeft, email]);

  useEffect(() => {
    // clear info when timer starts counting
    if (secondsLeft > 0) onInfo("");
  }, [secondsLeft, onInfo]);

  const handleResend = async () => {
    if (!email) {
      onInfo("Email missing, cannot resend OTP.");
      return;
    }

    try {
      onInfo("");
      await mutation.mutateAsync({ email });
      setSecondsLeft(initialSeconds);
      onInfo("OTP resent successfully.");
    } catch (err) {
      onInfo(extractApiError(err) || "Failed to resend OTP.");
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="text-lg font-semibold text-gray-800">
        {minutes}:{seconds}
      </div>
      {secondsLeft === 0 ? (
        <button
          type="button"
          onClick={handleResend}
          disabled={mutation.isLoading}
          className={`text-sm font-medium ${
            mutation.isLoading
              ? "text-gray-400"
              : "text-[#8A1538] hover:underline"
          }`}
        >
          {mutation.isLoading ? "Resending..." : "Resend OTP"}
        </button>
      ) : (
        <div className="text-sm text-gray-400">Resend available after</div>
      )}
    </div>
  );
};

export default OtpTimerResend;
