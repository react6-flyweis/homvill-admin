import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_BANNERS = () => `/api/banners/getall`;

async function fetchAllBanners() {
  const { data } = await api.get(GET_ALL_BANNERS());
  return data;
}

export function useGetAllBanners(options = {}) {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => fetchAllBanners(),
    select: (res) => ({
      items: res?.data || [],
      count:
        typeof res?.count === "number"
          ? res.count
          : res?.data
          ? res.data.length
          : 0,
    }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
