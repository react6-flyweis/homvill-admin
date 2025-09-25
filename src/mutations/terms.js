import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createTermsApi(payload) {
  const { data } = await api.post("/api/terms-condition/create", payload);
  return data;
}

export function useCreateTerms(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTermsApi,
    onSuccess: (res) => {
      // invalidate terms list so UI refetches
      qc.invalidateQueries({ queryKey: ["terms"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
