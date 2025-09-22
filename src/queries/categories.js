import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_CATEGORIES = () => `/api/properties-category/getall`;

async function fetchAllCategories() {
  const { data } = await api.get(GET_ALL_CATEGORIES());
  return data;
}

export function useGetAllCategories(options = {}) {
  return useQuery({
    queryKey: ["property-categories"],
    queryFn: () => fetchAllCategories(),
    select: (res) => ({
      items: res?.data || [],
      count:
        typeof res?.count === "number" ? res.count : res?.data?.length || 0,
    }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
