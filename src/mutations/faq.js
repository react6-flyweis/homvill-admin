import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

// Mutation hook to create an FAQ
export function useCreateFAQ(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post(`/api/faq/create`, payload);
      return data;
    },
    onSuccess: (data) => {
      // invalidate the faq list so it refreshes
      queryClient.invalidateQueries(["faq"]);
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
  });
}
