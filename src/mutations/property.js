import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createPropertyApi(payload) {
  // POST to the backend properties create endpoint
  const { data } = await api.post("/api/properties/create", payload);
  return data;
}

export function useCreateProperty(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPropertyApi,
    onSuccess: (res) => {
      // invalidate properties list so it refetches after creation
      qc.invalidateQueries({ queryKey: ["properties"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
