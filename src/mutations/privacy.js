import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createPrivacyApi(payload) {
  const { data } = await api.post("/api/privacy-policy/create", payload);
  return data;
}

async function updatePrivacyApi(payload) {
  const { data } = await api.put("/api/privacy-policy/update", payload);
  return data;
}

export function useCreatePrivacy(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPrivacyApi,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["privacy"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

export function useUpdatePrivacy(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updatePrivacyApi,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["privacy"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
