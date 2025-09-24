import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2Icon, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const earningsColumns = [
  {
    accessorKey: "date",
    header: "DATE",
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === "yearly") return true;
      const date = row.getValue(columnId);
      const parts = String(date).split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      if (filterValue === "monthly") return month === 6;
      if (filterValue === "weekly")
        return month === 6 && day >= 10 && day <= 20;
      return true;
    },
  },
  //   {
  //     // accessorKey: "source",
  //     // header: "SOURCE",
  //     // visible to allow filtering
  //   },
  {
    accessorKey: "buyer",
    header: "BUYER NAME",
  },
  {
    accessorKey: "seller",
    header: "SELLER NAME",
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  },
  {
    accessorKey: "payment",
    header: "PAYMENT MODE",
  },
  {
    accessorKey: "transaction",
    header: "TRANSACTION ID",
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: (info) => (
      <span className="text-[#8A1538] font-medium">{info.getValue()}</span>
    ),
  },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className="flex justify-center ">
          <Button
            variant="ghost"
            size="icon"
            title="View"
            onClick={() =>
              navigate(
                `/dashboard/earning/transaction/${row.original.transaction}`
              )
            }
          >
            <EyeIcon className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2Icon className="text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
