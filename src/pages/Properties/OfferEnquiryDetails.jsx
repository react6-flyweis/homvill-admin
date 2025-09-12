import React from "react";
// import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";

export default function OfferEnquiryDetails() {
  //   const { id } = useParams();

  return (
    <PageLayout
      title="Property Details"
      description="Details of the selected offer enquiry"
    >
      {/* Render PropertyDetailsContent and show the enquiry card by default */}
      <PropertyDetailsContent
        enquiry={{
          sold: true,
        }}
      />
    </PageLayout>
  );
}
