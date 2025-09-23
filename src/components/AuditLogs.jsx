import React, { useMemo } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { useGetAllAuditLogs } from "@/queries/auditLogs";

const AuditLogs = () => {
  const { data = { items: [], count: 0 }, isLoading } = useGetAllAuditLogs();

  // map API items to table rows
  const rows = useMemo(() => {
    return (data.items || []).map((item) => ({
      id: item._id,
      user: item.user_id?.Name || item.CreateBy?.Name || "-",
      entityId: item.Audit_log_id ?? item._id,
      action: (item.Action || "").toUpperCase(),
      type: item.type || "-",
      environment: item.Enverment || item.Environment || "-",
      timestamp: item.CreateAt
        ? new Date(item.CreateAt).toLocaleString()
        : item.UpdatedAt
        ? new Date(item.UpdatedAt).toLocaleString()
        : "-",
    }));
  }, [data.items]);

  const columns = useMemo(
    () => [
      { accessorKey: "user", header: "USER" },
      { accessorKey: "entityId", header: "ENTITY ID" },
      { accessorKey: "action", header: "ACTION" },
      { accessorKey: "type", header: "TYPE" },
      { accessorKey: "environment", header: "ENVIRONMENT" },
      {
        accessorKey: "timestamp",
        header: "TIMESTAMP",
      },
    ],
    []
  );

  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-2">Audit Logs</h2>
      <p className="text-sm text-gray-500 mb-4">
        Monitor any changes made to your project, view them and connect with
        audit logs.
      </p>

      <DataTable
        loading={isLoading}
        columns={columns}
        data={rows}
        pageSize={7}
      />
    </div>
  );
};

export default AuditLogs;
