import { useState } from "react";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SoldDialog } from "./SoldDialog";
import soldBanner from "../assets/sold-banner.png";
import rentedBanner from "../assets/rented-banner.png";

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
            {data?.status !== "available" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoldDialogOpen(true)}
                title="This property is sold"
                className="absolute left-0"
              >
                <img
                  src={data?.status === "sold" ? soldBanner : rentedBanner}
                  alt="Sold Banner"
                  className="size-6"
                />
              </Button>
            )}
            <span className="pl-5">{data?.listedBy}</span>
          </div>
          <SoldDialog
            open={soldDialogOpen}
            onOpenChange={setSoldDialogOpen}
            isRented={data?.status === "rented"}
          />
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
      <div className="flex items-center justify-end">
        <Link to={`/dashboard/properties/${row.original.id}`}>
          <Button variant="ghost" size="icon" title="View">
            <EyeIcon className="text-primary" size={16} />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash2Icon className="text-destructive" size={16} />
        </Button>
        <Switch
          className="data-[state=checked]:bg-green-400 ml-2"
          defaultChecked={row.original.active ?? true}
        />
      </div>
    ),
  },
];
