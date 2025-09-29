import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

async function createUserApi(payload) {
  // Use shared api instance to keep auth/headers consistent with other queries
  const { data } = await api.post("/api/user/create", payload);
  return data;
}

export function useCreateUser(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createUserApi,
    onSuccess: (res) => {
      // invalidate users list so it refetches after a new user is created
      qc.invalidateQueries({ queryKey: ["users"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

const UPDATE_USER = "/api/user/update";

async function updateUser(payload) {
  const { data } = await api.put(UPDATE_USER, payload);
  return data;
}

export function useUpdateProfile(options = {}) {
  const authStore = useAuthStore();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      // if API returns the updated user object, update auth store and invalidate cache
      if (res && res.data) {
        authStore.setUser(res.data);
        // invalidate user query entries so they refetch
        qc.invalidateQueries({ queryKey: ["user"] });
      }
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

export function useUpdateUser(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      if (res && res.data) {
        qc.invalidateQueries({ queryKey: ["user"] });
      }
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

// Change password API
const CHANGE_PASSWORD = "/api/user/change-password";

async function changePassword(payload) {
  const { data } = await api.put(CHANGE_PASSWORD, payload);
  return data;
}

export function useChangePassword(options = {}) {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (res) => {
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
