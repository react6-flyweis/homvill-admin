import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { TermsCard } from "@/components/Terms/TermsCard";
import { TermDialog } from "@/components/Terms/TermDialog";
import { Button } from "@/components/ui/button";

const termsData = [
  {
    id: 1,
    title: "Terms & Conditions Title",
    description: `Welcome to Homewirl. By accessing or using our services—whether through our website, app, or in-person interactions—you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
1. Service Usage
Homewirl provides real estate services including property listings, buying, selling, renting, and related administrative support. All users must ensure that any information provided is accurate and not misleading.
2. Property Listings
All property details are subject to verif...`,
  },
  {
    id: 2,
    title: "Terms & Conditions Title",
    description: `Welcome to Homewirl. By accessing or using our services—whether through our website, app, or in-person interactions—you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
1. Service Usage
Homewirl provides real estate services including property listings, buying, selling, renting, and related administrative support. All users must ensure that any information provided is accurate and not misleading.
2. Property Listings
All property details are subject to verif...`,
  },
];

export default function () {
  const [terms, setTerms] = useState(termsData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function handleAdd(values) {
    if (editing) {
      // update existing
      setTerms((s) =>
        s.map((t) =>
          t.id === editing.id ? { ...t, ...values, id: editing.id } : t
        )
      );
      setEditing(null);
    } else {
      const next = {
        id: Date.now(),
        title: values.title,
        description: values.description,
      };
      setTerms((s) => [next, ...s]);
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDelete(id) {
    setTerms((s) => s.filter((t) => t.id !== id));
  }

  return (
    <div className=" space-y-4">
      <TermDialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          // if dialog closed, clear editing
          if (!val) setEditing(null);
        }}
        onSubmit={handleAdd}
        initialValues={editing}
      />

      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Terms & Condition</h2>

          <Button
            variant="outline"
            onClick={() => {
              // clear any existing editing state when opening the Add dialog
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
      {terms.map((item) => (
        <TermsCard
          key={item.id}
          data={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
