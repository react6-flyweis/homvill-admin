import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { FAQCard } from "@/components/Support/FAQCard";
import { FAQDialog } from "@/components/Support/FAQDialog";
import { FAQViewDialog } from "@/components/Support/FAQViewDialog";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";
import { useGetAllFAQ } from "@/queries/faq";
import { useDeleteFAQ } from "@/mutations/faq";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function FAQPage() {
  const { data: apiData = { items: [], count: 0 }, isLoading } = useGetAllFAQ();

  // normalize API response items to the shape used by FAQCard
  const faqs = (apiData.items || []).map((it) => ({
    id: it.faq_id || it._id || it.id || Math.random().toString(36).slice(2),
    title: it.Title || it.title || "",
    description: it.Description || it.description || "",
    Status: typeof it.Status === "boolean" ? it.Status : it.status ?? true,
    createdBy: it.CreateBy || it.createdBy || null,
    createdAt:
      it.CreateAt || it.CreatedAt || it.createdAt || it.created_at || null,
    updatedAt: it.UpdatedAt || it.updatedAt || it.updated_at || null,
    raw: it,
  }));

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  // dialog now handles create/update mutations internally

  function handleEdit(item) {
    setEditing(item);
    setOpen(true);
  }

  const deleteMut = useDeleteFAQ();

  async function handleDelete(id) {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("FAQ deleted successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to delete FAQ";
      toast.error(msg);
    } finally {
      setToDelete(null);
      setShowDelete(false);
    }
  }

  return (
    <PageLayout
      title="FAQs"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      action={
        <Button
          variant="outline"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="hover:bg-primary hover:text-white"
        >
          Add A New FAQ <PlusCircleIcon size={16} />
        </Button>
      }
    >
      <FAQDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditing(null);
        }}
        initialValues={editing}
      />

      <FAQViewDialog
        open={!!viewing}
        onOpenChange={(v) => {
          if (!v) setViewing(null);
        }}
        data={viewing}
      />

      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title={"Delete FAQ"}
        description={
          "Are you sure you want to delete this FAQ? This action cannot be undone."
        }
        onConfirm={toDelete ? () => handleDelete(toDelete) : null}
        onCancel={() => setShowDelete(false)}
      />

      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-xl p-4 h-28 flex flex-col justify-between"
            >
              <div className="bg-gray-200 rounded-md h-6 w-3/4 mb-2" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))
        : faqs.map((item) => (
            <FAQCard
              key={item.id}
              data={item}
              onView={(it) => setViewing(it)}
              onEdit={handleEdit}
              onDelete={(id) => {
                setToDelete(id);
                setShowDelete(true);
              }}
            />
          ))}
    </PageLayout>
  );
}
