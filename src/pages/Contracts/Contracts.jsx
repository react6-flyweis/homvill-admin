import React, { useRef, useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { ContractCategoryFilter } from "@/components/Contracts/ContractCategoryFilter";
import { useGetAllContractorPersons } from "@/queries/contracts";

import contractEnquiryIcon from "@/assets/contract-enquiry.png";

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
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <Link to={`/dashboard/contracts/${row?.original?.id}`}>
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

export default function Contracts() {
  const tableRef = useRef();

  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const { data: contracts = [], isLoading } = useGetAllContractorPersons();

  // Map API items to the local `contracts` shape used by the table
  const mapApiToContract = (item) => {
    // Map fields from API response to table columns
    const ownerName = item.owner ?? "-";
    // property_id may be an object like { Properties_id: 1 }
    const propertyId =
      item.property_id?.Properties_id ?? item.property_id ?? "-";
    // category_id may be an object like { Contracts_Category_id: 1 }
    const category =
      item.category_id?.Contracts_Category_id ?? item.category ?? "-";
    const contact = item.contact ?? "-";
    // contractor name/id may be in specific fields
    const contractorName =
      item.contractor || item.Contracts_Contractor_person_name || "-";
    const contractorId =
      item.Contracts_Contractor_person_id ?? item.contractor ?? item._id ?? "-";
    // company may be nested inside company_id
    const company =
      item.company_id?.Contracts_Company_name ?? item.company ?? "-";
    const cost = item.cost != null ? item.cost : "-";
    const address = item.address ?? "-";

    return {
      owner: ownerName,
      property: String(propertyId),
      category: String(category),
      contact: String(contact),
      contractor: contractorName,
      company: company,
      cost: String(cost),
      address: address,
      // Prefer Contracts_Contractor_person_id for the row id when available
      id: String(
        item.Contracts_Contractor_person_id ?? item._id ?? contractorId
      ),
    };
  };

  const sourceItems = Array.isArray(contracts)
    ? contracts.map(mapApiToContract)
    : [];

  const filteredContracts = sourceItems.filter((c) =>
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
        loading={isLoading}
        columns={contractColumns}
        data={filteredContracts}
        pageSize={8}
      />
    </div>
  );
}
