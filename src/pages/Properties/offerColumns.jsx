import { useState } from "react";
import { EyeIcon, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OfferCallDialog } from "@/components/Properties/OfferCallDialog";

import phoneTick from "@/components/assets/phone-tick.svg";

function ActionCell({ row }) {
  const data = row.original;
  const [callOpen, setCallOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  return (
    <div className="flex items-center justify-end gap-3">
      {/* Phone - opens call sheet */}
      <Button
        title="Call"
        variant="ghost"
        size="icon"
        onClick={() => {
          setSelectedOffer(data);
          setCallOpen(true);
        }}
      >
        <Phone className="fill-blue-800 size-5" />
      </Button>

      {/* Message - teal circle */}
      <Button title="Message" variant="ghost" size="icon">
        <MessageCircle className="size-5 fill-teal-800" />
      </Button>

      {/* View - pink/maroon circle */}
      <Link to={`/dashboard/offer-enquiry/${row.original.id}`}>
        <Button title="View" variant="ghost" size="icon">
          <EyeIcon className="size-5 text-primary" />
        </Button>
      </Link>
      <OfferCallDialog
        open={callOpen}
        onOpenChange={(v) => setCallOpen(v)}
        offer={selectedOffer}
      />
    </div>
  );
}

export const offers = [
  {
    id: "1",
    raisedBy: "Mathew Joe",
    propertyId: "S1741236",
    category: "Furnished Apartments",
    phone: "+1 9042 945 632",
    email: "heavennor23@gmail.com",
    price: "$35,000.00",
    available: "SALE",
    enquired: true,
  },
  {
    id: "2",
    raisedBy: "Likson Boro",
    propertyId: "S9558536",
    category: "Furnished Home",
    phone: "+1 7884 985 780",
    email: "mixonkango@gmail.com",
    price: "$35,000.00",
    available: "SALE",
  },
  {
    id: "3",
    raisedBy: "Munga Jidu",
    propertyId: "S3202536",
    category: "Furnished Home",
    phone: "+1 6523 524 630",
    email: "example@gmail.com",
    price: "$20,000.00",
    available: "RENT",
  },
  {
    id: "4",
    raisedBy: "Tuzir Thisa",
    propertyId: "S7458745",
    category: "Unfurnished Home",
    phone: "+1 1295 658 630",
    email: "example@gmail.com",
    price: "$95,000.00",
    available: "SALE",
  },
  {
    id: "5",
    raisedBy: "Poxy Hudo",
    propertyId: "S1028754",
    category: "Studio Apartments",
    phone: "+1 9245 926 125",
    email: "example@gmail.com",
    price: "$12,000.00",
    available: "RENT",
  },
];

export const offersColumns = [
  {
    accessorKey: "raisedBy",
    header: "RAISED BY",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          {data?.enquired && (
            <img
              src={phoneTick}
              alt="Phone Tick"
              className="size-6 absolute left-0"
            />
          )}
          <span className="px-2">{data?.raisedBy}</span>
        </div>
      );
    },
  },
  { accessorKey: "propertyId", header: "PROPERTY ID" },
  { accessorKey: "category", header: "CATEGORY" },
  { accessorKey: "phone", header: "PHONE NUMBER" },
  { accessorKey: "email", header: "EMAIL" },
  { accessorKey: "price", header: "PRICE" },
  { accessorKey: "available", header: "AVAILABLE TO" },
  {
    id: "actions",
    header: "ACTION",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
