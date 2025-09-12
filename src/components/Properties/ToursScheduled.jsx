import React, { useRef } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const tours = [
  {
    id: "1",
    requestedBy: "Heaven Horlly",
    propertyId: "S1471236",
    category: "Furnished Apartments",
    tourMode: "Virtual",
    scheduledOn: "06-04-2025",
    time: "12:00 PM",
    price: "$35,000.00",
    availableTo: "SALE",
    email: "heavenhor23@gmail.com",
    phone: "+1 7854 945 630",
    zipCode: "10011",
    address: "Lorem Ipsum Is Simply Dummy...",
  },
  {
    id: "2",
    requestedBy: "Mixon Kango",
    propertyId: "S1458536",
    category: "Furnished Home",
    tourMode: "Virtual",
    scheduledOn: "09-04-2025",
    time: "11:00 AM",
    price: "$35,000.00",
    availableTo: "SALE",
    email: "mixonkango@gmail.com",
    phone: "+1 7768 945 630",
    zipCode: "10011",
    address: "Lorem Ipsum Is Simply Dummy...",
  },
  {
    id: "3",
    requestedBy: "Loois Moslty",
    propertyId: "S1412536",
    category: "Studio Apartments",
    tourMode: "Virtual",
    scheduledOn: "14-04-2025",
    time: "06:00 PM",
    price: "$20,000.00",
    availableTo: "RENT",
    email: "example@gmail.com",
    phone: "+1 2546 945 630",
    zipCode: "10011",
    address: "Lorem Ipsum Is Simply Dummy...",
  },
  {
    id: "4",
    requestedBy: "Aalzoni Kincoln",
    propertyId: "S1478745",
    category: "Unfurnished Home",
    tourMode: "Virtual",
    scheduledOn: "16-04-2025",
    time: "02:00 PM",
    price: "$95,000.00",
    availableTo: "SALE",
    email: "example@gmail.com",
    phone: "+1 8875 945 630",
    zipCode: "10011",
    address: "Lorem Ipsum Is Simply Dummy...",
  },
  {
    id: "5",
    requestedBy: "Okeyt Paris",
    propertyId: "S1418754",
    category: "Unfurnished Home",
    tourMode: "On-Site",
    scheduledOn: "06-04-2025",
    time: "04:30 PM",
    price: "$12,000.00",
    availableTo: "RENT",
    email: "example@gmail.com",
    phone: "+1 9568 945 630",
    zipCode: "10011",
    address: "Lorem Ipsum Is Simply Dummy...",
  },
];

const ToursScheduled = () => {
  const tableRef = useRef();

  const columns = [
    { accessorKey: "requestedBy", header: "REQUESTED BY" },
    { accessorKey: "propertyId", header: "PROPERTY ID" },
    { accessorKey: "category", header: "CATEGORY" },
    { accessorKey: "tourMode", header: "TOUR MODE" },
    { accessorKey: "scheduledOn", header: "SCHEDULED ON" },
    { accessorKey: "time", header: "TIME" },
    { accessorKey: "price", header: "PRICE" },
    { accessorKey: "availableTo", header: "AVAILABLE TO" },
    { accessorKey: "email", header: "EMAIL" },
    { accessorKey: "phone", header: "PHONE NUMBER" },
    { accessorKey: "zipCode", header: "ZIP CODE" },
    {
      accessorKey: "address",
      header: "ADDRESS",
      cell: (info) => (
        <span className="truncate block max-w-[260px]">{info.getValue()}</span>
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
        </div>
      ),
    },
  ];

  return (
    <PageLayout
      title="Tours Scheduled"
      description="         Lorem Ipsum is simply dummy text of the printing and typesetting
          industry."
    >
      <DataTable ref={tableRef} columns={columns} data={tours} showPagination />
    </PageLayout>
  );
};

export default ToursScheduled;
