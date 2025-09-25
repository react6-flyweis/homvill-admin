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
      qc.invalidateQueries({ queryKey: ["push-notifications"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
