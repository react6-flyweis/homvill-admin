import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";
import { useGetPropertyById } from "@/queries/properties";

export default function PropertyDetails() {
  const { id } = useParams();

  const { data: property, isLoading, isError } = useGetPropertyById(id);

  return (
    <PageLayout
      title="Property Details"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <PropertyDetailsContent
        property={property}
        loading={isLoading}
        error={isError}
      />
    </PageLayout>
  );
}
