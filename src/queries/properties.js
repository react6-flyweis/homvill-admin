import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_PROPERTIES = () => `/api/properties/getall`;

async function fetchAllProperties() {
  const { data } = await api.get(GET_ALL_PROPERTIES());
  return data;
}

export function useGetAllProperties(options = {}) {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => fetchAllProperties(),
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
