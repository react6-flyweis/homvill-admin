import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyEditor } from "@/components/Properties/PropertyEditor";
import { useCreateProperty } from "@/mutations/property";
import { toast } from "sonner";

export default function AddProperty() {
  const createProperty = useCreateProperty();

  const handleCreate = async (payload) => {
    try {
      await createProperty.mutateAsync(payload);
      toast.success("Property created successfully");
    } catch (err) {
      // Re-throw so the form can display the error via form.setError
      throw err;
    }
  };
  return (
    <PageLayout
      title="Add A Property"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="rounded-lg border p-6 bg-white">
        <PropertyEditor onCreate={handleCreate} />
      </div>
    </PageLayout>
  );
}
