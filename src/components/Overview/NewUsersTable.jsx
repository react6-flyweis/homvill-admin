import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useGetAllUsers } from "@/queries/user";

export const NewUsersTable = () => {
  const { data, isLoading, isError, error } = useGetAllUsers();

  // data shape from the query select: { items: [...], count: number }
  const items = data?.items || [];

  // Prefer API fields: CreateAt, OnboardingDate, UpdatedAt, _id, user_id, Name, last_name, email
  const getDateVal = (u) => {
    return (
      u?.CreateAt ||
      u?.OnboardingDate ||
      u?.UpdatedAt ||
      u?.CreateAt ||
      u?.CreateAt ||
      null
    );
  };

  const parseDate = (u) => {
    const d = getDateVal(u);
    const parsed = d ? new Date(d) : null;
    return parsed && !isNaN(parsed) ? parsed.getTime() : 0;
  };

  const sorted = [...items].sort((a, b) => parseDate(b) - parseDate(a));
  const top5 = sorted.slice(0, 5);

  const formatDate = (d) => {
    if (!d) return "—";
    const parsed = new Date(d);
    if (isNaN(parsed)) return d;
    return parsed.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div
        className="bg-white shadow rounded-xl border border-[#8A1538] p-4"
        aria-busy="true"
      >
        <h3 className="font-semibold mb-4">New Users</h3>

        {/* Skeleton table: 5 rows */}
        <div className="w-full">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />

          <table
            className="w-full text-sm"
            role="status"
            aria-label="Loading users"
          >
            <thead>
              <tr className="text-[#A9A9A9] font-normal  border-b">
                <th className="text-left font-normal p-2">User Name</th>
                <th className="text-left font-normal p-2">Date In</th>
                <th className="text-left font-normal p-2">Email</th>
                <th className="text-left font-normal p-2">ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="p-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-4 bg-gray-200 rounded w-6 animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white shadow rounded-xl border border-[#8A1538] p-4">
        <h3 className="font-semibold mb-4">New Users</h3>
        <div className="text-sm text-red-500">
          Failed to load users: {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl border border-[#8A1538] p-4">
      <h3 className="font-semibold mb-4">New Users</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[#A9A9A9] font-normal  border-b">
            <th className="text-left font-normal p-2">User Name</th>
            <th className="text-left font-normal p-2">Date In</th>
            <th className="text-left font-normal p-2">Email</th>
            <th className="text-left font-normal p-2">ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {top5.length === 0 && (
            <tr>
              <td colSpan={5} className="p-2 text-gray-500">
                No users found
              </td>
            </tr>
          )}

          {top5.map((user, idx) => {
            const fullName = `${user?.Name || user?.name || ""} ${
              user?.last_name || user?.lastName || ""
            }`.trim();
            const dateVal = getDateVal(user);
            const idVal = user?.user_id || "—";
            const email = user?.email || user?.emailAddress || "—";

            return (
              <tr
                key={user?._id ?? idVal ?? idx}
                className="border-b last:border-none"
              >
                <td className="p-2 flex items-center gap-2">
                  <img
                    src={
                      user?.user_image ||
                      `https://i.pravatar.cc/30?img=${(idx % 70) + 1}`
                    }
                    alt={fullName || "user"}
                    className="w-8 h-8 rounded-full"
                  />
                  {fullName || "—"}
                </td>
                <td className="p-2">{formatDate(dateVal)}</td>
                <td className="p-2">{email}</td>
                <td className="p-2">{idVal}</td>
                <td className="p-2 text-red-500 cursor-pointer">
                  <FiTrash2 />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
