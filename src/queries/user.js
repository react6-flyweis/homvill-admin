import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const GET_USER_BY_ID = (id) => `/api/user/getbyid/${id}`;

async function fetchUserById(id) {
  const { data } = await api.get(GET_USER_BY_ID(id));
  return data;
}

export function useGetUserById(id, options = {}) {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    select: (data) => data.data, // assuming API response shape { success: true, data: { ... } }
    onSuccess: (res) => {
      // API returns shape { success: true, data: { ... } }
      if (res && res.data) {
        authStore.setUser(res.data);
      }
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

// update user endpoint (best-effort - adjust path if backend differs)
const UPDATE_USER = "/api/user/update";

async function updateUser(payload) {
  const { data } = await api.put(UPDATE_USER, payload);
  return data;
}

export function useUpdateUser(options = {}) {
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
