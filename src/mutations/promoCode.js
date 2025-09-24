import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

// Mutation hook to create a promo code
export function useCreatePromoCode(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post(`/api/promo-code/create`, payload);
      return data;
    },
    onSuccess: (data) => {
      // invalidate the promo codes list so it refreshes
      queryClient.invalidateQueries(["promoCodes"]);
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
  });
}
