import { useState } from "react";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SoldDialog } from "./SoldDialog";
import soldBanner from "../assets/sold-banner.png";

export const propertyColumns = [
  {
    accessorKey: "listedBy",
    header: "LISTED BY",
    cell: ({ row }) => {
      const [soldDialogOpen, setSoldDialogOpen] = useState(false);
      const data = row.original;
      return (
        <>
          <div className="flex items-center gap-2">
            {data?.sold && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoldDialogOpen(true)}
                title="This property is sold"
                className="absolute left-0"
              >
                <img src={soldBanner} alt="Sold Banner" className="size-6" />
              </Button>
            )}
            <span className="pl-5">{data?.listedBy}</span>
          </div>
          <SoldDialog open={soldDialogOpen} onOpenChange={setSoldDialogOpen} />
        </>
      );
    },
  },
  {
    accessorKey: "sellerId",
    header: "SELLER ID",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "available",
    header: "AVAILABLE TO",
    cell: (info) => (
      <span className="text-pink-600 font-semibold">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "zipCode",
    header: "ZIP CODE",
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
    cell: (info) => (
      <span className="truncate block max-w-[220px]">{info.getValue()}</span>
    ),
  },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Link to={`/dashboard/properties/${row.original.id}`}>
          <Button variant="ghost" size="icon" title="View">
            <EyeIcon size={16} />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash2Icon size={16} />
        </Button>
        <Switch
          className="data-[state=checked]:bg-green-400"
          defaultChecked={row.original.active ?? true}
        />
      </div>
    ),
  },
];
