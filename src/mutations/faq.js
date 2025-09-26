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

export function useUpdateFAQ(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const body = { id: Number(id), ...payload };
      const { data } = await api.put(`/api/faq/update`, body);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["faq"]);
      if (options.onSuccess) options.onSuccess(data);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
  });
}
