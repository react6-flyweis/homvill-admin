import React, { useState, useEffect } from "react";
import { EyeIcon } from "lucide-react";

import { UserQueryDialog } from "@/components/UsersQuery/UserQueryDialog";
import QueryRectifiedDialog from "@/components/UsersQuery/QueryRectifiedDialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/DataTable";
import tick from "@/assets/mdi_tick-all.svg";
import { useGetAllUserQueries } from "@/queries/userQueries";

// initial placeholder while data loads

// Move columns inside the component so we can capture component state/handlers
export default function UsersQueryPage() {
  const { data: apiData, isLoading, isError } = useGetAllUserQueries();

  // map API items to table rows whenever apiData changes
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (!apiData) return;

    const items = apiData.items || [];
    const mapped = items.map((it) => {
      // API fields: CreateAt, user_name, user_contact, user_email, Query_txt, Status
      const date = it.CreateAt
        ? new Date(it.CreateAt).toLocaleDateString()
        : "";
      const user = it.user_name || (it.user_id && it.user_id.Name) || "";
      const contact = it.user_contact || "";
      const mail = it.user_email || (it.user_id && it.user_id.email) || "";
      const query = it.Query_txt || "";
      const resolved = !!it.Status;

      return { ...it, date, user, contact, mail, query, resolved };
    });

    setRows(mapped);
  }, [apiData]);
  const [rectifyOpen, setRectifyOpen] = React.useState(false);
  const [activeRowIndex, setActiveRowIndex] = React.useState(null);

  const handleConfirmRectify = () => {
    if (activeRowIndex == null) return;
    setRows((prev) => {
      const copy = [...prev];
      copy[activeRowIndex] = { ...copy[activeRowIndex], resolved: true };
      return copy;
    });
    setActiveRowIndex(null);
  };

  const columns = [
    { accessorKey: "date", header: "DATE" },
    { accessorKey: "user", header: "USER NAME" },
    { accessorKey: "contact", header: "CONTACT" },
    { accessorKey: "mail", header: "MAIL ID" },
    {
      accessorKey: "query",
      header: "QUERY",
      cell: (info) => (
        <span className="truncate max-w-[360px] block">{info.getValue()}</span>
      ),
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => {
        const [open, setOpen] = useState(false);
        const idx = row.index; // row.index corresponds to the row's position in the table data
        const resolved = rows[idx]?.resolved;

        return (
          <div className="flex justify-center ">
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <EyeIcon className="text-lg text-primary" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={resolved}
              onClick={() => {
                setActiveRowIndex(idx);
                setRectifyOpen(true);
              }}
              title={resolved ? "Already resolved" : "Mark resolved"}
            >
              <img
                src={tick}
                className={`w-6 ${resolved ? "opacity-40" : ""}`}
              />
            </Button>

            <UserQueryDialog
              open={open}
              onOpenChange={(v) => setOpen(v)}
              data={row.original}
            />
          </div>
        );
      },
    },
  ];

  if (isError) {
    return <div>Failed to load user queries.</div>;
  }

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">User’s Query</h2>
        <p className="text-xs text-gray-500 mt-1">
          Learn payment & inquiry summary text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={rows}
        loading={isLoading}
        pageSize={7}
        rowClassName={(row) =>
          row.original?.resolved ? "opacity-60 bg-gray-50" : ""
        }
      />

      <QueryRectifiedDialog
        open={rectifyOpen}
        onOpenChange={setRectifyOpen}
        onConfirm={handleConfirmRectify}
      />
    </div>
  );
}
