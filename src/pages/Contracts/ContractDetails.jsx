import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyDetailsContent } from "@/components/Properties/PropertyDetailsContent";
import { useGetContractorPersonById } from "@/queries/contracts";

export default function ContractDetails() {
  const { id } = useParams();

  const { data, isLoading, isFetching, error } = useGetContractorPersonById(id);

  return (
    <PageLayout
      title="contract Details"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <PropertyDetailsContent
        property={data?.property_id}
        contract={{ category: "plumbing" }}
        loading={isLoading || isFetching}
        error={error}
      />
    </PageLayout>
  );
}
