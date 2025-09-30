import React, { useEffect, useState, useRef } from "react";
import { SubAdminForm } from "@/components/SubAdmin/SubAdminForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useGetUsersByRole } from "@/queries/user";

const AddSubAdmin = () => {
  const [employees, setEmployees] = useState([]);
  // use query hook to fetch sub-admins (role_id = 3)
  const {
    data: subAdminsPayload = { items: [], count: 0 },
    isLoading: loading,
    isError,
    error,
  } = useGetUsersByRole(4, "active");

  // map API user objects to the employee UI shape
  useEffect(() => {
    const mapped = (subAdminsPayload.items || []).map((u) => ({
      id: u.user_id || u._id || u.userId || "",
      name:
        `${u.Name || u.name || ""} ${u.last_name || ""}`.trim() ||
        u.email ||
        "Unknown",
      image: u.user_image || u.user_image_url || null,
      raw: u,
      permissions: u.permissions || null,
    }));
    setEmployees(mapped);
  }, [subAdminsPayload]);
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Add Sub-Admin</h2>
      <p className="text-sm text-gray-500 mb-4">
        Monitor any changes made to your project, view them and connect with
        audit logs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Employee List */}
        <div className="space-y-3">
          {loading && (
            <div className="p-3 border rounded-lg text-sm text-gray-600">
              Loading users...
            </div>
          )}

          {isError && (
            <div className="p-3 border rounded-lg text-sm text-red-600">
              Error: {error?.message || "Failed to load users"}
            </div>
          )}

          {!loading && !error && employees.length === 0 && (
            <div className="p-3 border rounded-lg text-sm text-gray-600">
              No sub admins found
            </div>
          )}

          {employees.map((emp, idx) => (
            <div
              key={emp.id || idx}
              className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 rounded-full border">
                  <AvatarImage src={emp.image} alt={emp.name} />
                  <AvatarFallback>
                    {emp.name ? emp.name.charAt(0).toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{emp.name || "Unknown"}</p>
                  <p className="text-xs text-green-600">
                    Employee ID: {emp.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  navigate(`/dashboard/sub-admin/permissions`, {
                    state: {
                      employee: emp,
                      isEdit: true,
                      // pass existing permissions if present, otherwise sensible defaults
                      permissions: emp.permissions || {
                        users: { edit: true, view: true },
                        properties: { edit: false, view: true },
                        contracts: { edit: false, view: false },
                        subscription: { edit: false, view: true },
                      },
                    },
                  })
                }
                className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Right Side - Extracted Form */}
        <SubAdminForm />
      </div>
    </div>
  );
};

export default AddSubAdmin;
