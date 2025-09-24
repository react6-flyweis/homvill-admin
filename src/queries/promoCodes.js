import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_PROMO = () => `/api/promo-code/getall`;

async function fetchAllPromoCodes() {
  const { data } = await api.get(GET_ALL_PROMO());
  return data;
}

export function useGetAllPromoCodes(options = {}) {
  return useQuery({
    queryKey: ["promoCodes"],
    queryFn: () => fetchAllPromoCodes(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
