import React, { useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ComparePriceDialog } from "@/components/Contracts/ComparePriceDialog";
import { useGetAllContractEnquiries } from "@/queries/contracts";

const contractColumns = [
  {
    accessorKey: "owner",
    header: "RAISED BY",
  },
  {
    accessorKey: "property",
    header: "PROPERTY ID",
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  {
    accessorKey: "contact",
    header: "PHONE NUMBER",
  },
  {
    accessorKey: "company",
    header: "COMPANY",
  },
  {
    accessorKey: "cost",
    header: "BUDGET PRICE",
  },
  {
    id: "price_compare",
    header: "PRICE COMPARE",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);
      const [selectedContract, setSelectedContract] = useState(null);

      function openCompare(row) {
        setSelectedContract(row);
        setDialogOpen(true);
      }
      return (
        <div className="flex items-center justify-center">
          <Button
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => openCompare(row.original)}
          >
            Compare Prize
          </Button>
          <ComparePriceDialog
            open={dialogOpen}
            onOpenChange={(v) => setDialogOpen(!!v)}
            contract={selectedContract}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Link to={`/dashboard/contracts/${row.original.id}`}>
          <Button variant="ghost" size="icon" title="View">
            <EyeIcon className="text-primary" size={16} />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash2Icon className="text-destructive" size={16} />
        </Button>
      </div>
    ),
  },
];

export default function ContractEnquiries() {
  const { data: apiRes = {}, isLoading } = useGetAllContractEnquiries();

  // map API payload to original table row fields
  const apiItems = Array.isArray(apiRes.data)
    ? apiRes.data
    : apiRes.items || [];
  const mappedContracts = apiItems.map((e) => ({
    owner: e.Enquiries_by_user_id?.Name || e.CreateBy?.Name || "-",
    property: e.Contracts_Enquiries_id
      ? `C${e.Contracts_Enquiries_id}`
      : e._id || "-",
    category: e.Category || "Plumbing Contract",
    contact: e.Enquiries_by_user_id?.email || e.CreateBy?.email || "-",
    contractor: "-",
    company: (e.CreateBy && e.CreateBy.Name) || "-",
    cost:
      e.Budget_Price != null
        ? `$${Number(e.Budget_Price).toLocaleString()}`
        : "-",
    address: "-",
    id: e._id || String(e.Contracts_Enquiries_id || Math.random()),
    // keep raw entry for Compare dialog
    _raw: e,
  }));

  return (
    <PageLayout
      title="Contract Enquiries"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <DataTable
        columns={contractColumns}
        loading={isLoading}
        data={mappedContracts}
        pageSize={7}
      />
    </PageLayout>
  );
}
