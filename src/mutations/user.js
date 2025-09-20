import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

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
