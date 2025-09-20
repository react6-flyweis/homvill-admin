import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserEditor } from "@/components/Users/UserEditor";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

const AddUserForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Header */}
      <div
        onClick={() => navigate("/dashboard/users")}
        className="flex items-center gap-2 mb-1"
      >
        <ArrowLeft size={20} className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Add A User</h1>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Use extracted UserEditor component */}
      <UserEditor
        onSubmit={(data) => {
          setIsOpen(true);
        }}
      />

      <SuccessDialog
        open={isOpen}
        message="A New User Added Successfully"
        onClose={() => {
          setIsOpen(false);
          navigate("/dashboard/users");
        }}
      />
    </div>
  );
};

export default AddUserForm;
