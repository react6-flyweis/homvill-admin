import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const ADMIN_LOGIN = "/api/user/admin-login";
const SEND_FORGOT_PASSWORD_OTP = "/api/user/forget-password/send-otp";
const VERIFY_FORGOT_PASSWORD_OTP = "/api/user/forget-password/verify-otp";
const RESET_FORGOT_PASSWORD = "/api/user/forget-password/reset-password";

async function adminLogin(payload) {
  const { data } = await api.post(ADMIN_LOGIN, payload);
  return data;
}

export function useAdminLogin() {
  const authStore = useAuthStore();
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      authStore.setToken(data.data.token);
      authStore.setUser(data.data.user);
    },
  });
}

async function sendForgotPasswordOtp(payload) {
  const { data } = await api.post(SEND_FORGOT_PASSWORD_OTP, payload);
  return data;
}

export function useSendForgetPasswordOtp() {
  return useMutation({
    mutationFn: sendForgotPasswordOtp,
  });
}

async function verifyForgotPasswordOtp(payload) {
  const { data } = await api.post(VERIFY_FORGOT_PASSWORD_OTP, payload);
  return data;
}

export function useVerifyForgetPasswordOtp() {
  return useMutation({
    mutationFn: verifyForgotPasswordOtp,
  });
}

async function resetForgotPassword(payload) {
  const { data } = await api.post(RESET_FORGOT_PASSWORD, payload);
  return data;
}

export function useResetForgetPassword(options = {}) {
  return useMutation({
    mutationFn: resetForgotPassword,
    onSuccess: (res) => {
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
