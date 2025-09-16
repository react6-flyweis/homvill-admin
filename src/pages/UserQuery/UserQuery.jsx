import React, { useState } from "react";
import { EyeIcon } from "lucide-react";

import { UserQueryDialog } from "../../components/UsersQuery/UserQueryDialog";
import QueryRectifiedDialog from "../../components/UsersQuery/QueryRectifiedDialog";
import { Button } from "../../components/ui/button";
import { DataTable } from "@/components/datatable/DataTable";
import tick from "@/assets/mdi_tick-all.svg";

const data = [
  {
    date: "12/05/2024",
    user: "Ujaya Devei",
    contact: "+91 92389 38923",
    mail: "example@gmail.com",
    query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
  },
  {
    date: "12/05/2024",
    user: "Carter Franci",
    contact: "+91 92389 38923",
    mail: "example@gmail.com",
    query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
  },
  {
    date: "12/05/2024",
    user: "Jordyn Culhane",
    contact: "+91 92389 38923",
    mail: "example@gmail.com",
    query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
  },
  {
    date: "13/05/2024",
    user: "Aaliyah Smith",
    contact: "+44 7700 900123",
    mail: "aaliyah.smith@example.co.uk",
    query:
      "I need information about listing my 2-bedroom flat. Please call me back between 4-6pm.",
  },
  {
    date: "14/05/2024",
    user: "Miguel Alvarez",
    contact: "+52 1 55 1234 5678",
    mail: "miguel@example.mx",
    query:
      "Interested in renting. What are the pet policies and deposit requirements?",
  },
  {
    date: "15/05/2024",
    user: "Chen Wei",
    contact: "+86 138 0013 8000",
    mail: "chen.wei@example.cn",
    query:
      "Is the property still available? Also, can I schedule a viewing this weekend?",
  },
  {
    date: "16/05/2024",
    user: "Fatima Khan",
    contact: "+971 50 123 4567",
    mail: "fatima.k@example.ae",
    query:
      "Please share more photos of the kitchen and bathroom. Also interested in long-term lease options.",
  },
  {
    date: "17/05/2024",
    user: "Liam O'Connor",
    contact: "+353 87 123 4567",
    mail: "liam.oconnor@example.ie",
    query:
      "Looking for a furnished unit close to public transport. Any recommendations?",
  },
  {
    date: "18/05/2024",
    user: "Sofia Rossi",
    contact: "+39 345 678 9012",
    mail: "sofia.rossi@example.it",
    query:
      "Can I get details about the neighborhood and nearby schools? Long query to test truncation in the table cell: this should be truncated appropriately in the UI to keep the layout intact.",
  },
  {
    date: "19/05/2024",
    user: "Noah Brown",
    contact: "+1 415-555-0123",
    mail: "noah.brown@example.com",
    query: "Is there parking available with the unit?",
  },
  {
    date: "20/05/2024",
    user: "Olivia Martinez",
    contact: "+34 612 345 678",
    mail: "olivia.m@example.es",
    query: "What's the process to submit an offer?",
  },
  {
    date: "21/05/2024",
    user: "Ethan Patel",
    contact: "+91 98765 43210",
    mail: "ethan.patel@example.in",
    query:
      "I have a few documents to submit. Can you share the preferred format?",
  },
  {
    date: "22/05/2024",
    user: "Isabella Garcia",
    contact: "+52 55 7654 3210",
    mail: "isabella.g@example.mx",
    query:
      "Seeking more information on financing options and estimated closing costs.",
  },
];

// Move columns inside the component so we can capture component state/handlers
export default function UsersQueryPage() {
  const [rows, setRows] = React.useState(
    data.map((d) => ({ ...d, resolved: false }))
  );
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
