import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const GET_ALL_AUDIT_LOGS = () => `/api/audit-log/getall`;

async function fetchAllAuditLogs() {
  const { data } = await api.get(GET_ALL_AUDIT_LOGS());
  return data;
}

export function useGetAllAuditLogs(options = {}) {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: () => fetchAllAuditLogs(),
    select: (res) => ({ items: res?.data || [], count: res?.count || 0 }),
    onError: (err) => {
      if (options.onError) options.onError(err);
    },
    ...options,
  });
}
