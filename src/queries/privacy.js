import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_PRIVACY = () => `/api/privacy-policy/getall`;

async function fetchAllPrivacy() {
  const { data } = await api.get(GET_ALL_PRIVACY());
  return data;
}

export function useGetAllPrivacy(options = {}) {
  return useQuery({
    queryKey: ["privacy"],
    queryFn: () => fetchAllPrivacy(),
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
