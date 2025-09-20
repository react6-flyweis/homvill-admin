import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserEditor } from "@/components/Users/UserEditor";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useGetUserById, useUpdateUser } from "@/queries/user";
import { extractApiError } from "@/lib/errorHandler";
import { toast } from "sonner";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data: apiUser, isLoading } = useGetUserById(id);
  const updateUser = useUpdateUser();

  // map API user fields to the editor's form fields
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (!apiUser) return;

    const u = apiUser;
    const mapped = {
      firstName: u.Name || u.firstName || "",
      lastName: u.last_name || u.lastName || "",
      phone: u.phone || "",
      email: u.email || "",
      userType:
        u.Role_id?.role_name || u.Responsibility_id?.Responsibility_name || "",
      userCategory: u.User_Category_id?.User_Category_name || "",
      street: u.location?.street || u.street || "",
      city: u.City_id?.City_name || u.city || "",
      state: u.State_id?.state_name || u.state || "",
      country: u.Country_id?.Country_name || u.country || "",
      zip: u.zipcode || "",
      // Date:  then onboarding date
      date: u.dateOfJoining || "",
      idNumber: u.adhaar_no || "",
    };

    setInitialValues(mapped);
  }, [apiUser]);

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
      email: data.email ?? data.emailAddress ?? "",
      phone: data.phone ?? data.phoneNumber ?? "",
      password: data.password ?? "",
      gender: data.gender ?? "",
      adhaar_date: data.adhaar_date ?? data.adhaarDate ?? "",
      adhaar_no: data.adhaar_no ?? data.adhaarNo ?? "",
      // include any other fields from the editor as-is
      ...data,
    };
  }

  async function handleSubmit(data) {
    const payload = {
      id,
      ...formatUserPayload(data),
    };

    try {
      await updateUser.mutateAsync(payload);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      const message = extractApiError(err);
      toast.error(message);
    }
  }

  return (
    <div>
      <div
        onClick={() => navigate("/dashboard/users")}
        className="flex items-center gap-2 mb-1"
      >
        <ArrowLeft size={20} className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Edit User</h1>
      </div>

      <p className="text-xs text-gray-400 mb-6">
        Update the details for the selected user.
      </p>

      <UserEditor
        initialValues={initialValues}
        submitLabel={isLoading ? "Loading..." : "Save"}
        onSubmit={handleSubmit}
      />

      <SuccessDialog
        open={isOpen}
        message="User updated successfully"
        onClose={() => {
          setIsOpen(false);
          navigate("/dashboard/users");
        }}
      />
    </div>
  );
};

export default EditUser;
