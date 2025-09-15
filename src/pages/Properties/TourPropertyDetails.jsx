import React from "react";
// import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";

export default function TourDetails() {
  //   const { id } = useParams();

  return (
    <PageLayout
      title="Tour Property Details"
      description="Details of the selected tour."
    >
      {/* Render PropertyDetailsContent and show the enquiry card by default */}
      <PropertyDetailsContent tourDetails={{ status: "pending" }} />
    </PageLayout>
  );
}
