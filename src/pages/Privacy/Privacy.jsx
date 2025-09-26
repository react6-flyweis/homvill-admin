import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { PrivacyCard } from "@/components/Privacy/PrivacyCard";
import { PrivacyDialog } from "@/components/Privacy/PrivacyDialog";
import { PrivacyViewDialog } from "@/components/Privacy/PrivacyViewDialog";
import { Button } from "@/components/ui/button";
import { useGetAllPrivacy } from "@/queries/privacy";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeletePrivacy } from "@/mutations/privacy";
import { toast } from "sonner";

export default function Privacy() {
  // Fetch privacy items from API
  const { data: apiData = { items: [], count: 0 }, isLoading } =
    useGetAllPrivacy();

  // Normalize API items to shape expected by components
  const privacies = (apiData.items || []).map((it) => ({
    id:
      it.Privacy_policy_id ||
      it._id ||
      it.id ||
      Math.random().toString(36).slice(2),
    title: it.Privacy_policy_Title || it.Privacy_policy_title || it.title || "",
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

  function handleEditPrivacy(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDeletePrivacy(id) {
    // open confirm dialog and store id to delete
    setToDelete(id);
    setShowDelete(true);
  }

  const deleteMut = useDeletePrivacy();

  async function handleDelete(id) {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Privacy policy deleted successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete privacy policy";
      toast.error(msg);
    } finally {
      setToDelete(null);
      setShowDelete(false);
    }
  }

  return (
    <div className=" space-y-4">
      <PrivacyDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditing(null);
        }}
        initialValues={editing}
      />

      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Privacy & Policy</h2>

          <Button
            variant="outline"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="hover:bg-primary hover:text-white"
          >
            Add A New Privacy & Policy <PlusCircleIcon size={16} />
          </Button>
        </div>
        {/* description below heading */}
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
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
        : privacies.map((item) => (
            <PrivacyCard
              key={item.id}
              data={item}
              onView={() => setViewing(item)}
              onEdit={handleEditPrivacy}
              onDelete={handleDeletePrivacy}
            />
          ))}
      <PrivacyViewDialog
        open={!!viewing}
        onOpenChange={(v) => {
          if (!v) setViewing(null);
        }}
        data={viewing}
      />
      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title={"Delete Privacy & Policy"}
        description={
          "Are you sure you want to delete this privacy policy? This action cannot be undone."
        }
        onConfirm={toDelete ? () => handleDelete(toDelete) : null}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
