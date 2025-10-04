import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/datatable/DataTable";
import { usersColumns } from "@/components/Users/usersColumns";
import { ExportSelector } from "@/components/datatable/ExportSelector";
import { useGetAllUsers } from "@/queries/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("all");

  const tableRef = useRef();

  // fetch users
  const { data: usersPayload = { items: [], count: 0 }, isLoading } =
    useGetAllUsers();

  // map API user shape to table shape expected by usersColumns
  const data = (usersPayload.items || []).map((u) => ({
    // prefer fields from API, fallback to placeholders
    name: `${u.Name || u.name || "-"} ${u.last_name || ""}`.trim(),
    id: u.user_id,
    phone: u.phone || "-",
    type:
      (u.Role_id && u.Role_id.role_name) ||
      (u.User_Category_id && u.User_Category_id.name) ||
      "-",
    email: u.email || "-",
    date: u.OnboardingDate
      ? new Date(u.OnboardingDate).toLocaleDateString()
      : u.dateOfJoining
      ? new Date(u.dateOfJoining).toLocaleDateString()
      : "-",
    verified: !!u.two_step_verification,
    active: !!u.account_active,
    raw: u,
  }));

  // apply active/inactive/all filter
  const filteredData = data.filter((row) => {
    if (filter === "all") return true;
    if (filter === "active") return !!row.active;
    if (filter === "inactive") return !row.active;
    return true;
  });

  const tabs = [
    { id: "all", label: "All Users", count: usersPayload.count || 0 },
    // { id: "buyers", label: "Buyers", count: 400 },
    // { id: "sellers", label: "Sellers", count: 365 },
    // { id: "renters", label: "Renters", count: 120 },
    // { id: "builders", label: "Builder", count: 95 },
    // { id: "contractors", label: "Contractor", count: 88 },
    // { id: "verified", label: "Verified Owners", count: 64 },
    // { id: "newowners", label: "New Owners", count: 47 },
  ];

  return (
    <div style={{ fontFamily: "Poppins" }} className="">
      {/* Top Bar */}

      <div className="flex items-center justify-between mb-6">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Users</h1>
            <Link to="/dashboard/users/newuser">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md hover:bg-[#8A1538] hover:text-white transition-colors duration-200">
                Add a New User <Plus size={16} />
              </button>
            </Link>
          </div>
          <p className="text-xs mt-2 text-gray-500">
            Users layout is in step & query based on the printing and
            typesetting industry.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <ExportSelector tableRef={tableRef} />
          <Select onValueChange={setFilter} value={filter}>
            <SelectTrigger className="border rounded-md px-3 py-2 text-sm shadow-md">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap space-x-4 mb-4 mt-8 pb-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center pb-2 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-600"
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 border-2 rounded ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div>
        <DataTable
          ref={tableRef}
          columns={usersColumns}
          data={filteredData}
          showPagination={true}
          pageSize={5}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
