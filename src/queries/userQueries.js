import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_USER_QUERIES = () => `/api/user-query/getall`;

async function fetchAllUserQueries() {
  const { data } = await api.get(GET_ALL_USER_QUERIES());
  return data;
}

export function useGetAllUserQueries(options = {}) {
  return useQuery({
    queryKey: ["user-queries"],
    queryFn: () => fetchAllUserQueries(),
    // normalize to { items, count } like other hooks in the repo
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
    onSuccess: (res) => {
      if (options.onSuccess) options.onSuccess(res);
    },
    ...options,
  });
}
