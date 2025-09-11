// const headers = {
//   all: ["Name", "ID", "Phone Number", "User Type", "Email", "Date of Joining"],
//   buyers: [
//     "Name",
//     "Buyer ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   sellers: [
//     "Name",
//     "Seller ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   renters: [
//     "Name",
//     "Renter ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   builders: [
//     "Name",
//     "Builder ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   contractors: [
//     "Name",
//     "Contractor ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   verified: [
//     "Name",
//     "Owner ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
//   newowners: [
//     "Name",
//     "Owner ID",
//     "Phone Number",
//     "User Type",
//     "Email",
//     "Date of Joining",
//   ],
// };

import { EyeIcon, Trash2Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import verifiedBadge from "../assets/verified.png";

export const usersColumns = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const name = row.original.name;
      const verified = row.original.verified; // boolean flag on row data
      return (
        <div className="flex items-center gap-2">
          <span>{name}</span>
          {verified && (
            <img src={verifiedBadge} alt="verified" className="w-5" />
          )}
        </div>
      );
    },
  },
  {
    // header: headers[activeTab][1],
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Phone Number",
    accessorKey: "phone",
  },
  {
    header: "User Type",
    accessorKey: "type",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Date of Joining",
    accessorKey: "date",
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      // row.original contains the original data object for this row
      return (
        <div className="flex items-center justify-end gap-1">
          <Link to={`/dashboard/users/${row.original.id}`}>
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
      );
    },
  },
];
