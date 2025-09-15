import React, { useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";

const partners = [
  {
    name: "Nikolus Bendy",
    category: "Seller",
    contact: "+1 5246 945 120",
    company: "ZBC Solutions",
    size: "Less Than 10",
    startsFrom: "$15,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P1",
  },
  {
    name: "Jaxson Reddt",
    category: "Seller",
    contact: "+1 7894 945 960",
    company: "UZ sellers",
    size: "Single Agent",
    startsFrom: "$20,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P2",
  },
  {
    name: "Freddy Dias",
    category: "Property Manager",
    contact: "+1 9856 945 630",
    company: "STEPH Builder Works",
    size: "More Than 11+",
    startsFrom: "$18,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P3",
  },
  {
    name: "Kian Cazoni",
    category: "Landlord",
    contact: "+1 7458 945 120",
    company: "Daisy Rentals",
    size: "56+ Homes For Rents",
    startsFrom: "$12,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P4",
  },
  {
    name: "Steve Saris",
    category: "Local Advisor",
    contact: "+1 7768 359 524",
    company: "VZ Local Advisory",
    size: "90+Trusted People,",
    startsFrom: "$66,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P5",
  },
  {
    name: "Carla Philips",
    category: "Property Manager",
    contact: "+1 7768 415 630",
    company: "WORKY Builder Works",
    size: "Property With 1-24 Unites",
    startsFrom: "$40,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P6",
  },
  {
    name: "Lindsey Korsgaard",
    category: "Local Advisor",
    contact: "+1 8963 945 368",
    company: "HIZVE Advisory units",
    size: "140+ Trusted People,",
    startsFrom: "$12,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P7",
  },
  {
    name: "Geidt Martin",
    category: "Loan Officer",
    contact: "+1 7768 945 630",
    company: "GIYA Loans",
    size: "N/A",
    startsFrom: "$8,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P8",
  },
  {
    name: "Davis Dein",
    category: "Remodel company",
    contact: "+1 1285 745 630",
    company: "Hike Re-Modelings",
    size: "20+ Communities",
    startsFrom: "$10,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P9",
  },
  {
    name: "Harter Vaccaro",
    category: "Loan Officer",
    contact: "+1 7415 945 630",
    company: "Desirae Philips",
    size: "N/A",
    startsFrom: "$3,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "P10",
  },
];

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
  return (
    <PageLayout title="Partners" description="All Listed Partners">
      <DataTable
        columns={columns}
        data={partners}
        showPagination
        pageSize={6}
      />
    </PageLayout>
  );
}
