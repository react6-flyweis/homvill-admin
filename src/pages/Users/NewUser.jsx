import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserEditor } from "@/components/Users/UserEditor";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useCreateUser } from "@/mutations/user";
import extractApiError from "@/lib/errorHandler";

function formatUserPayload(data = {}) {
  return {
    Name: data.Name ?? data.name ?? data.firstName ?? data.first_name ?? "",
    last_name: data.last_name ?? data.lastName ?? data.last_name ?? "",
    Responsibility_id:
      data.Responsibility_id ??
      data.responsibility_id ??
      data.responsibilityId ??
      1,
    Role_id: data.Role_id ?? data.role_id ?? data.user_type ?? 1,
    Language_id: data.Language_id ?? data.language_id ?? 1,
    Country_id: data.Country_id ?? data.country_id ?? 1,
    State_id: data.State_id ?? data.state_id ?? 1,
    City_id: data.City_id ?? data.city_id ?? 1,
    zipcode: data.zipcode ?? data.postalCode ?? data.zip ?? null,
    Employee_id:
      data.Employee_id ?? data.employeeId ?? data.employee_id ?? "EMP001",
    User_Category_id: data.User_Category_id ?? data.userCategoryId ?? 1,
    email: data.email ?? "",
    phone: data.phone ?? "",
    password: data.password ?? "",
    gender: data.gender ?? "",
    adhaar_date: data.adhaar_date ?? data.adhaarDate ?? data.adhaar_date ?? "",
    adhaar_no: data.adhaar_no ?? data.adhaarNo ?? "",
  };
}

const AddUserForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const createUser = useCreateUser();

  // Named submit handler (pattern like LoginForm)
  const handleSubmit = async (data) => {
    try {
      const payload = formatUserPayload(data);
      await createUser.mutateAsync(payload);
      setIsOpen(true);
    } catch (err) {
      throw err;
    }
  };

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
      <UserEditor onSubmit={handleSubmit} />

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
