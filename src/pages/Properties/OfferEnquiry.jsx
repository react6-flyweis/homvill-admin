import { useRef } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { PageLayout } from "@/components/layouts/PageLayout";
import { offers, offersColumns } from "./offerColumns";

export default function OfferEnquiry() {
  const tableRef = useRef();

  return (
    <PageLayout
      title="Offer Enquiry"
      description="List of offers raised by users for properties."
    >
      <DataTable
        ref={tableRef}
        columns={offersColumns}
        data={offers}
        // highlight whole row when offer.enquired is true
        rowClassName={(row) => (row.original?.enquired ? "bg-green-100" : "")}
        showPagination={true}
      />
    </PageLayout>
  );
}
