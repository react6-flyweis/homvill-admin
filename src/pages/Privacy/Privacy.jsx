import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { PrivacyCard } from "@/components/Privacy/PrivacyCard";
import { PrivacyDialog } from "@/components/Privacy/PrivacyDialog";
import { PrivacyViewDialog } from "@/components/Privacy/PrivacyViewDialog";
import { Button } from "@/components/ui/button";
import { useGetAllPrivacy } from "@/queries/privacy";

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

  function handleAddPrivacy(values) {
    // local optimistic behavior: if editing, we'd normally call API
    if (editing) {
      // find and update in-memory copy - since source of truth is API, UI will re-sync on refetch
      setEditing(null);
    } else {
      // new item - in a real app we'd POST to API. For now, show dialog close.
    }
  }

  function handleEditPrivacy(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDeletePrivacy(id) {
    // For now, just log. Ideally this calls DELETE endpoint and invalidates query.
    console.log("Delete privacy id:", id);
  }

  return (
    <div className=" space-y-4">
      <PrivacyDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditing(null);
        }}
        onSubmit={handleAddPrivacy}
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
    </div>
  );
}
