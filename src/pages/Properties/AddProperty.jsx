import { PageLayout } from "@/components/layouts/PageLayout";
import { PropertyEditor } from "@/components/Properties/PropertyEditor";
import { useCreateProperty } from "@/mutations/property";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddProperty() {
  const createProperty = useCreateProperty();
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    try {
      const res = await createProperty.mutateAsync(payload);
      toast.success("Property created successfully");

      const newId = res?.data?.Properties_id;

      setTimeout(() => {
        if (newId) {
          // Navigate to the detail page for the newly created property
          navigate(`/dashboard/properties/${newId}`);
        } else {
          // Fallback to properties list if id is not present in the response
          navigate("/dashboard/properties");
        }
      }, 500);
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
