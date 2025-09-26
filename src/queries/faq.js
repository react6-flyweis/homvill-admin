import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_FAQ = () => `/api/faq/getall`;

async function fetchAllFAQ() {
  const { data } = await api.get(GET_ALL_FAQ());
  return data;
}

export function useGetAllFAQ(options = {}) {
  return useQuery({
    queryKey: ["faq"],
    queryFn: () => fetchAllFAQ(),
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
