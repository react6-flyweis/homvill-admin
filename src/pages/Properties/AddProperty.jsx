import { PageLayout } from "../../components/layouts/PageLayout";
import { PropertyEditor } from "@/components/Properties/PropertyEditor";

export default function AddProperty() {
  return (
    <PageLayout
      title="Add A Property"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="rounded-lg border p-6 bg-white">
        <PropertyEditor />
      </div>
    </PageLayout>
  );
}
