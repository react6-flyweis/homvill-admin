import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { FAQCard } from "@/components/Support/FAQCard";
import { FAQDialog } from "@/components/Support/FAQDialog";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    id: 1,
    title: "FAQ Headline",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
  {
    id: 2,
    title: "FAQ Headline",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState(faqData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function handleAdd(values) {
    if (editing) {
      setFaqs((s) =>
        s.map((f) =>
          f.id === editing.id ? { ...f, ...values, id: editing.id } : f
        )
      );
      setEditing(null);
    } else {
      const next = {
        id: Date.now(),
        title: values.title,
        description: values.description,
      };
      setFaqs((s) => [next, ...s]);
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDelete(id) {
    setFaqs((s) => s.filter((f) => f.id !== id));
  }

  return (
    <div className=" space-y-4">
      <FAQDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setEditing(null);
        }}
        onSubmit={handleAdd}
        initialValues={editing}
      />

      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">FAQs</h2>

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
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      {faqs.map((item) => (
        <FAQCard
          key={item.id}
          data={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
