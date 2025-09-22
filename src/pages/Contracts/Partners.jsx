import React from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";
import { useGetAllContractCompanies } from "@/queries/contracts";

const columns = [
  { accessorKey: "name", header: "PARTNER NAME" },
  { accessorKey: "category", header: "CATEGORY" },
  { accessorKey: "contact", header: "CONTACT NUMBER" },
  { accessorKey: "company", header: "COMPANY" },
  { accessorKey: "size", header: "SIZE OF ORGANIZATION" },
  { accessorKey: "startsFrom", header: "STARTS FROM" },
  { accessorKey: "address", header: "ADDRESS" },
  // {
  //   id: "actions",
  //   header: "",
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-end gap-2">
  //       <Link to={`/dashboard/partners/${row.original.id}`}>
  //         <Button variant="ghost" size="icon" title="View">
  //           <EyeIcon className="text-primary" size={16} />
  //         </Button>
  //       </Link>
  //       <Button variant="ghost" size="icon" title="Delete">
  //         <Trash2Icon className="text-destructive" size={16} />
  //       </Button>
  //     </div>
  //   ),
  // },
];

export default function Partners() {
  const { data: res = {}, isLoading } = useGetAllContractCompanies();

  const companies = Array.isArray(res.items) ? res.items : [];

  // Map API shape to the original table columns with sensible fallbacks
  const rows = companies.map((c) => ({
    id: c._id || c.Contracts_Company_id || String(Math.random()),
    // Prefer contractor person name if present, otherwise company name
    name: c.Contractor_name || c.Contracts_Company_name || "-",
    // No category field in API sample
    category: c.category || "-",
    contact: c.Contact_No || "-",
    company: c.Contracts_Company_name || "-",
    // No size field in API sample
    size: c.size || "-",
    // Use Rate_range as a candidate for startsFrom if present
    startsFrom: c.Rate_range ?? "-",
    // No address field in API sample
    address: c.address || "-",
  }));

  return (
    <PageLayout title="Partners" description="All Listed Partners">
      <DataTable
        loading={isLoading}
        columns={columns}
        data={rows}
        showPagination
        pageSize={6}
      />
    </PageLayout>
  );
}
