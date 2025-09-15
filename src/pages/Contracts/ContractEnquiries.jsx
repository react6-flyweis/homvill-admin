import React, { useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { ComparePriceDialog } from "@/components/Contracts/ComparePriceDialog";

const contracts = [
  {
    owner: "Bendy John",
    property: "C2452320",
    category: "Plumbing Contract",
    contact: "+1 5246 945 120",
    contractor: "Jackson J",
    company: "TIDE Construction",
    cost: "$50,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C2452320",
  },
  {
    owner: "Jaxson Reddt",
    property: "C1942235",
    category: "Plumbing Contract",
    contact: "+1 7894 945 960",
    contractor: "Hendry",
    company: "DAISY Plumbing Works",
    cost: "$49,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1942235",
  },
  {
    owner: "Dias Freddy",
    property: "C4158032",
    category: "Plumbing Contract",
    contact: "+1 9856 945 630",
    contractor: "Tulip Gua",
    company: "YUGA Plumbing Service Works",
    cost: "$62,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C4158032",
  },
  {
    owner: "Cazoni Kian",
    property: "C968532",
    category: "Plumbing Contract",
    contact: "+1 7458 945 120",
    contractor: "Donin Abram",
    company: "DAYS Plumbing Service Works",
    cost: "$80,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C968532",
  },
  {
    owner: "Steve Saris",
    property: "C4156232",
    category: "Plumbing Contract",
    contact: "+1 7768 359 524",
    contractor: "Philips Desirae",
    company: "STEPH Plumbing Works",
    cost: "$96,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C4156232",
  },
  {
    owner: "Carla Philips",
    property: "C1248432",
    category: "Plumbing Contract",
    contact: "+1 7768 415 630",
    contractor: "Calzoni Dulce",
    company: "PLUMBY Building Works",
    cost: "$40,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1248432",
  },
  {
    owner: "Lindsey Korsgaard",
    property: "C859462",
    category: "Plumbing Contract",
    contact: "+1 8963 945 368",
    contractor: "Botosh Ahmad",
    company: "RISE Construction",
    cost: "$32,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C859462",
  },
  {
    owner: "Geidt Martin",
    property: "C2514232",
    category: "Plumbing Contract",
    contact: "+1 7768 945 630",
    contractor: "George Diana",
    company: "TIDO Plumbing Works",
    cost: "$78,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C2514232",
  },
  {
    owner: "Davis Jodge",
    property: "C1774256",
    category: "Plumbing Contract",
    contact: "+1 1285 745 630",
    contractor: "Alena Calzoni",
    company: "UPL Plumbing Works",
    cost: "$20,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1774256",
  },
  {
    owner: "Harter Vaccaro",
    property: "C1369852",
    category: "Plumbing Contract",
    contact: "+1 7415 945 630",
    contractor: "Philips Desirae",
    company: "ASTAR Plumbing",
    cost: "$18,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1369852",
  },
  {
    owner: "Mirard Westervelt",
    property: "C1452232",
    category: "Plumbing Contract",
    contact: "+1 9963 945 630",
    contractor: "Rayna Baptista",
    company: "YU Plumbing Construction",
    cost: "$30,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1452232",
  },
  {
    owner: "Jodge Bator",
    property: "C1859232",
    category: "Plumbing Contract",
    contact: "+1 9689 945 630",
    contractor: "H Yojun",
    company: "AY Plumbing Works",
    cost: "$150,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1859232",
  },
  {
    owner: "Gunaj Bator",
    property: "C1523152",
    category: "Plumbing Contract",
    contact: "+1 7748 945 630",
    contractor: "Goophy Press",
    company: "TDS Plumbing",
    cost: "$150,000.00",
    address: "Lorem Ipsum Is Simply Dum...",
    id: "C1523152",
  },
];

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
  return (
    <PageLayout
      title="Contract Enquiries"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <DataTable columns={contractColumns} data={contracts} showPagination />
    </PageLayout>
  );
}
