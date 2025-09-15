import React from "react";
// import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";

export default function ContractDetails() {
  //   const { id } = useParams();

  return (
    <PageLayout
      title="contract Details"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      {/* Render PropertyDetailsContent and show the enquiry card by default */}
      <PropertyDetailsContent contract={{ category: "plumbing" }} />
    </PageLayout>
  );
}
