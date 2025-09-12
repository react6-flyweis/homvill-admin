import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";

export default function PropertyDetails() {
  return (
    <PageLayout
      title="Property Details"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <PropertyDetailsContent />
    </PageLayout>
  );
}
