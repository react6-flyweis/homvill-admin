import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_SUBSCRIPTIONS = () => `/api/subscriptions/getall`;

async function fetchAllSubscriptions() {
  const { data } = await api.get(GET_ALL_SUBSCRIPTIONS());
  return data;
}

export function useGetAllSubscriptions(options = {}) {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchAllSubscriptions(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
