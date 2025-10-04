import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function createBannerApi(payload) {
  const { data } = await api.post("/api/banners/create", payload);
  return data;
}

export function useCreateBanner(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createBannerApi,
    onSuccess: (res) => {
      // invalidate banners list so it refetches after create
      qc.invalidateQueries({ queryKey: ["banners"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

async function updateBannerApi(payload) {
  const { data } = await api.put("/api/banners/update", payload);
  return data;
}

export function useUpdateBanner(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateBannerApi,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["banners"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
