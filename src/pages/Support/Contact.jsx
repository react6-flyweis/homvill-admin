import React, { useState } from "react";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/DataTable";
import { UserQueryDialog } from "@/components/UsersQuery/UserQueryDialog";
import { PageLayout } from "@/components/layouts/PageLayout";

const initialData = Array.from({ length: 13 }).map((_, i) => ({
  date: "12/05/2024",
  user: [
    "Alena George",
    "Carter Franci",
    "Jordyn Culhane",
    "Chance Rosser",
    "Lincoln Bothman",
    "Marcus Philips",
    "Maren Westervelt",
    "Kadin Lipshutz",
    "Davis Donin",
    "Hanna Rosser",
    "Emery Siphron",
    "James Torff",
  ][i % 12],
  business: "Restaurant",
  mail: "example@gmail.com",
  contact: "+1 234 567 890",
  query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
}));

export default function ContactUsPage() {
  const [rows, setRows] = useState(
    initialData.map((d) => ({ ...d, id: Math.random().toString(36).slice(2) }))
  );
  const [viewOpen, setViewOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);

  const handleDelete = (index) => {
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

  return (
    <PageLayout
      title="Contact Us"
      description="Lorem Ipsum is simply dummy text of the and typesetting industry."
    >
      <DataTable columns={columns} data={rows} />

      <UserQueryDialog
        open={viewOpen}
        onOpenChange={setViewOpen}
        data={activeRow}
      />
    </PageLayout>
  );
}
