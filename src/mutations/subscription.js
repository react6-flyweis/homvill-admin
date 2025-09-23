import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createSubscriptionApi(payload) {
  const { data } = await api.post("/api/subscriptions/create", payload);
  return data;
}

export function useCreateSubscription(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionApi,
    onSuccess: (res) => {
      // invalidate subscriptions cache so lists refetch
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
