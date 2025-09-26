import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createPushApi(payload) {
  const { data } = await api.post(`/api/push-notification/create`, payload);
  return data;
}

export function useCreatePush(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPushApi,
    onSuccess: (res) => {
      // invalidate any push-notification related queries if present
      qc.invalidateQueries({ queryKey: ["pushNotifications"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

export function useDeletePush(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/push-notification/delete/${id}`);
      return data;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["pushNotifications"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
