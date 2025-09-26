import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

async function updateUserQueryApi(payload) {
  // payload expected: { id, Status }
  const { data } = await api.put(`/api/user-query/update`, payload);
  return data;
}

export function useUpdateUserQuery(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateUserQueryApi,
    onSuccess: (res) => {
      // invalidate user queries list so it refetches
      qc.invalidateQueries({ queryKey: ["user-queries"] });
      if (options.onSuccess) options.onSuccess(res);
    },
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
