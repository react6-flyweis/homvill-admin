import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { TermsCard } from "@/components/Terms/TermsCard";
import { TermDialog } from "@/components/Terms/TermDialog";
import { TermsViewDialog } from "@/components/Terms/TermsViewDialog";
import { Button } from "@/components/ui/button";
import { useGetAllTerms } from "@/queries/terms";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeleteTerms } from "@/mutations/terms";
import { toast } from "sonner";

export default function Terms() {
  const { data: apiData = { items: [], count: 0 }, isLoading } =
    useGetAllTerms();

  // Normalize API items to the shape expected by the UI components.
  // API examples use fields like `_id`, `terms_Condition_id`, `terms_Condition_Title`, `Description`, `Status`, `CreateBy`, `CreateAt`, `UpdatedAt`.
  const terms = (apiData.items || []).map((it) => ({
    id: it.terms_Condition_id || it.id || Math.random().toString(36).slice(2),
    title:
      it.terms_Condition_Title || it.terms_Condition_title || it.title || "",
    description: it.Description || it.description || "",
    Status: typeof it.Status === "boolean" ? it.Status : it.status ?? true,
    // API may use `CreateBy` object or `createdBy` key
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

  const deleteMut = useDeleteTerms();

  function handleEdit(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDelete(id) {
    // open confirm dialog and store id to delete
    setToDelete(id);
    setShowDelete(true);
  }

  async function handleConfirmDelete(id) {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Term deleted successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to delete term";
      toast.error(msg);
    } finally {
      setToDelete(null);
      setShowDelete(false);
    }
  }

  return (
    <div className=" space-y-4">
      <TermDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditing(null);
        }}
        initialValues={editing}
      />

      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Terms & Condition</h2>

          <Button
            variant="outline"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="hover:bg-primary hover:text-white"
          >
            Add A New Term & Condition <PlusCircleIcon size={16} />
          </Button>
        </div>
        {/* description below heading */}
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      {isLoading
        ? // show skeleton placeholders while loading
          Array.from({ length: 3 }).map((_, i) => (
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
        : terms.map((item) => (
            <TermsCard
              key={item.id}
              data={item}
              onView={() => setViewing(item)}
              onEdit={() => handleEdit(item)}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
      <TermsViewDialog
        open={!!viewing}
        onOpenChange={(v) => {
          if (!v) setViewing(null);
        }}
        data={viewing}
      />
      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title={"Delete Term & Condition"}
        description={
          "Are you sure you want to delete this term? This action cannot be undone."
        }
        onConfirm={toDelete ? () => handleConfirmDelete(toDelete) : null}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
