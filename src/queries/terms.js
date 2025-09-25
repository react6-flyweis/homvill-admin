import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_TERMS = () => `/api/terms-condition/getall`;

async function fetchAllTerms() {
  const { data } = await api.get(GET_ALL_TERMS());
  return data;
}

export function useGetAllTerms(options = {}) {
  return useQuery({
    queryKey: ["terms"],
    queryFn: () => fetchAllTerms(),
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
