import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_EARNINGS = () => `/api/earning/getall`;

async function fetchAllEarnings() {
  const { data } = await api.get(GET_ALL_EARNINGS());
  return data;
}

export function useGetAllEarnings(options = {}) {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: () => fetchAllEarnings(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
