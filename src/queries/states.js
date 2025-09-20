import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_STATES = () => "/api/state/getall";

async function fetchAllStates() {
  const { data } = await api.get(GET_ALL_STATES());
  return data;
}

export function useGetAllStates(options = {}) {
  return useQuery({
    queryKey: ["states"],
    queryFn: () => fetchAllStates(),
    select: (data) => ({
      items: data?.data || [],
      count:
        typeof data?.count === "number"
          ? data.count
          : data?.data
          ? data.data.length
          : 0,
    }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
