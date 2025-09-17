import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { PrivacyCard } from "@/components/Privacy/PrivacyCard";
import { PrivacyDialog } from "@/components/Privacy/PrivacyDialog";
import { Button } from "@/components/ui/button";

const privacyData = [
  {
    id: 1,
    title: "Privacy & Policy Headline",
    description: `At Homevill, the administrative framework plays a critical role in maintaining the integrity, transparency, and efficiency of all real estate operations. This project and policy structure is designed to streamline backend processes, ensure secure handling of sensitive data, and enforce compliance with legal and operational standards. From managing property listings and handling legal agreements to overseeing client interactions and internal reporting, every aspect of the admin side is governed by a well-documented, structured policy. The objective is to create a reliable and scalable system that supports business growth while upholding our core values of trust, professionalism, and customer satisfaction....Contd....`,
  },
  {
    id: 2,
    title: "Privacy & Policy Headline",
    description: `At Homevill, the administrative framework plays a critical role in maintaining the integrity, transparency, and efficiency of all real estate operations. This project and policy structure is designed to streamline backend processes, ensure secure handling of sensitive data, and enforce compliance with legal and operational standards. From managing property listings and handling legal agreements to overseeing client interactions and internal reporting, every aspect of the admin side is governed by a well-documented, structured policy. The objective is to create a reliable and scalable system that supports business growth while upholding our core values of trust, professionalism, and customer satisfaction....Contd....`,
  },
];

export default function Privacy() {
  const [privacies, setPrivacies] = useState(privacyData);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function handleAddPrivacy(values) {
    if (editing) {
      setPrivacies((s) =>
        s.map((p) =>
          p.id === editing.id ? { ...p, ...values, id: editing.id } : p
        )
      );
      setEditing(null);
    } else {
      const next = {
        id: Date.now(),
        title: values.title,
        description: values.description,
      };
      setPrivacies((s) => [next, ...s]);
    }
  }

  function handleEditPrivacy(item) {
    setEditing(item);
    setOpen(true);
  }

  function handleDeletePrivacy(id) {
    setPrivacies((s) => s.filter((p) => p.id !== id));
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
      {privacies.map((item) => (
        <PrivacyCard
          key={item.id}
          data={item}
          onEdit={handleEditPrivacy}
          onDelete={handleDeletePrivacy}
        />
      ))}
    </div>
  );
}
