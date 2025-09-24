import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_EARNINGS = () => `/api/earning/getall`;

async function fetchAllEarnings() {
  const { data } = await api.get(GET_ALL_EARNINGS());
  return data;
}

const GET_EARNING_BY_ID = (id) => `/api/earning/getbyid/${id}`;

async function fetchEarningById(id) {
  if (!id) throw new Error("Missing id");
  const { data } = await api.get(GET_EARNING_BY_ID(id));
  return data;
}

export function useGetAllEarnings(options = {}) {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: () => fetchAllEarnings(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}

export function useGetEarningById(id, options = {}) {
  return useQuery({
    queryKey: ["earning", id],
    queryFn: () => fetchEarningById(id),
    enabled: !!id,
    select: (res) => res?.data || res || null,
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
