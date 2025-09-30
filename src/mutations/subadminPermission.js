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

async function updatePermissionApi(payload) {
  const { data } = await api.put("/api/subadmin-permission/update", payload);
  return data;
}

export function useUpdateSubadminPermission(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updatePermissionApi,
    onSuccess: (res) => {
      // refresh permissions for the updated user if available
      if (res && res.data && res.data.user_id) {
        qc.invalidateQueries({
          queryKey: ["subadmin-permission", res.data.user_id],
        });
      }
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
