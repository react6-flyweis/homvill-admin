import React, { useRef, useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { ContractCategoryFilter } from "@/components/Contracts/ContractCategoryFilter";

import contractEnquiryIcon from "@/components/assets/contract-enquiry.png";

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
    header: "OWNER NAME",
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
    header: "OWNER CONTACT",
  },
  {
    accessorKey: "contractor",
    header: "CONTRACTOR PERSON",
  },
  {
    accessorKey: "company",
    header: "COMPANY",
  },
  {
    accessorKey: "cost",
    header: "COST",
  },
  {
    accessorKey: "address",
    header: "ADDRESS",
  },
  {
    id: "actions",
    header: "ACTION",
    cell: () => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon" title="View">
          <EyeIcon className="text-primary" size={16} />
        </Button>
        <Button variant="ghost" size="icon" title="Delete">
          <Trash2Icon className="text-destructive" size={16} />
        </Button>
      </div>
    ),
  },
];

export default function Contracts() {
  const tableRef = useRef();

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredContracts = contracts.filter((c) =>
    categoryFilter === "ALL" ? true : c.category === categoryFilter
  );

  return (
    <div className=" ">
      <div className="flex flex-wrap items-center justify-between gap-1 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800">Contracts</h1>
            <p className="text-xs">On-going Contracts</p>
          </div>
          {/* category filter */}
          <ContractCategoryFilter
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>

        <div className="flex items-center gap-2">
          <Link to="/dashboard/partners">
            <Button>All Partners</Button>
          </Link>
          <Link to="/dashboard/contracts/enquiries">
            <Button>
              <span>Contract Enquiries</span>
              <img src={contractEnquiryIcon} className="size-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        ref={tableRef}
        columns={contractColumns}
        data={filteredContracts}
      />
    </div>
  );
}
