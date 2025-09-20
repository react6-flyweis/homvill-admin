import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_COUNTRIES = () => "/api/country/getall";

async function fetchAllCountries() {
  const { data } = await api.get(GET_ALL_COUNTRIES());
  return data;
}

export function useGetAllCountries(options = {}) {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchAllCountries(),
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
