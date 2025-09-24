import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

// Review types
const GET_ALL_REVIEW_TYPES = () => `/api/reviews-type/getall`;

async function fetchAllReviewTypes() {
  const { data } = await api.get(GET_ALL_REVIEW_TYPES());
  return data;
}

export function useGetAllReviewTypes(options = {}) {
  return useQuery({
    queryKey: ["review-types"],
    queryFn: () => fetchAllReviewTypes(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
