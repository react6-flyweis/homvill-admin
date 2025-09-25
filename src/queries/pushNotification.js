import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_PUSH = () => `/api/push-notification/getall`;

async function fetchAllPush() {
  const { data } = await api.get(GET_ALL_PUSH());
  return data;
}

export function useGetAllPushNotifications(options = {}) {
  return useQuery({
    queryKey: ["pushNotifications"],
    queryFn: () => fetchAllPush(),
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
