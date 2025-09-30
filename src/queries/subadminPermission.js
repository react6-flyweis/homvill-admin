import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_BY_USER = (userId) => `/api/subadmin-permission/getbyuser/${userId}`;

async function fetchByUser(userId) {
  const { data } = await api.get(GET_BY_USER(userId));
  return data;
}

export function useGetSubadminPermissionByUser(userId, options = {}) {
  return useQuery({
    queryKey: ["subadmin-permission", userId],
    queryFn: () => fetchByUser(userId),
    enabled: !!userId,
    ...options,
  });
}
