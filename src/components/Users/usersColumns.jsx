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
import { useState, useEffect } from "react";
import { useUpdateUser } from "@/mutations/user";
import { toast } from "sonner";
import { extractApiError } from "@/lib/errorHandler";

import verifiedBadge from "@/assets/verified.png";

function UpdateSwitch({ active, id }) {
  const [checked, setChecked] = useState(active ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const mutation = useUpdateUser();

  // keep internal checked state in sync when parent changes `active`
  useEffect(() => {
    // if a save is in progress, prefer optimistic local state until it settles
    if (isSaving) return;

    // coerce to boolean and only update when different
    const next = !!active;
    if (next !== checked) setChecked(next);
  }, [active, isSaving, checked]);

  const handleToggle = async (next) => {
    const prev = checked;
    // optimistic UI
    setChecked(next);
    setIsSaving(true);

    try {
      await toast.promise(mutation.mutateAsync({ id, account_active: next }), {
        loading: "Updating status...",
        success: "Status updated",
        error: (err) => extractApiError(err) || "Failed to update status",
      });
    } catch (err) {
      // revert on error
      setChecked(prev);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Switch
      className="data-[state=checked]:bg-green-400 ml-2"
      onCheckedChange={handleToggle}
      checked={checked}
      disabled={isSaving}
    />
  );
}

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
      const { id, active } = row.original;

      return (
        <div className="flex items-center justify-end">
          <Link to={`/dashboard/users/${id}`}>
            <Button variant="ghost" size="icon" title="View">
              <EyeIcon className="text-primary" size={16} />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2Icon className="text-destructive" size={16} />
          </Button>
          <UpdateSwitch id={id} active={active} />
        </div>
      );
    },
  },
];
