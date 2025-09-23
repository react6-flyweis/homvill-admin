import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_SUBSCRIPTIONS = () => `/api/subscriptions/getall`;
const GET_SUBSCRIPTION_BY_ID = (id) => `/api/subscriptions/getbyid/${id}`;

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

async function fetchSubscriptionById(id) {
  const { data } = await api.get(GET_SUBSCRIPTION_BY_ID(id));
  return data;
}

export function useGetSubscriptionById(id, options = {}) {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: () => fetchSubscriptionById(id),
    enabled: Boolean(id),
    select: (res) => res?.data || res || {},
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
