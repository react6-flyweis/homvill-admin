import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_CITIES = () => "/api/city/getall";

async function fetchAllCities() {
  const { data } = await api.get(GET_ALL_CITIES());
  return data;
}

export function useGetAllCities(options = {}) {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => fetchAllCities(),
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
