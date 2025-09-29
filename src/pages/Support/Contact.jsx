import React, { useState, useEffect } from "react";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/DataTable";
import { UserQueryDialog } from "@/components/UsersQuery/UserQueryDialog";
import { PageLayout } from "@/components/layouts/PageLayout";
import { useGetAllUserQueries } from "@/queries/userQueries";

export default function ContactUsPage() {
  const { data: apiData, isLoading, isError } = useGetAllUserQueries();

  const [rows, setRows] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    if (!apiData) return;

    const items = apiData.items || [];
    const mapped = items.map((it) => {
      const date = it.CreateAt
        ? new Date(it.CreateAt).toLocaleDateString()
        : "";
      const user = it.user_name || (it.user_id && it.user_id.Name) || "";
      const business = it.business || "";
      const mail = it.user_email || (it.user_id && it.user_id.email) || "";
      const contact = it.user_contact || "";
      const query = it.Query_txt || "";

      return { ...it, date, user, business, mail, contact, query };
    });

    setRows(mapped);
  }, [apiData]);

  const handleDelete = (index) => {
    // keep delete as a local UI-only action (no API call)
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const columns = [
    { accessorKey: "date", header: "DATE" },
    { accessorKey: "user", header: "USER NAME" },
    { accessorKey: "business", header: "BUSINESS" },
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
        const idx = row.index;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setActiveRow(rows[idx]);
                setViewOpen(true);
              }}
            >
              <EyeIcon className="text-lg text-primary" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => handleDelete(idx)}
              title="Delete"
            >
              <Trash2 className="text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isError) {
    return <div>Failed to load user queries.</div>;
  }

  return (
    <PageLayout
      title="Contact Us"
      description="Lorem Ipsum is simply dummy text of the and typesetting industry."
    >
      <DataTable columns={columns} data={rows} loading={isLoading} />

      <UserQueryDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        data={activeRow}
      />
    </PageLayout>
  );
}
