import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createSubadminPermissionApi(payload) {
  const { data } = await api.post("/api/subadmin-permission/create", payload);
  return data;
}

export function useCreateSubadminPermission(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubadminPermissionApi,
    onSuccess: (res) => {
      // Invalidate any relevant queries - choose 'subadmins' as a sensible key
      qc.invalidateQueries({ queryKey: ["subadmins"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
