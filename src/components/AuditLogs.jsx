import React, { useState } from "react";

const AuditLogs = () => {
  const data = [
    {
      user: "Mathew Joe",
      entityId: "5174236",
      action: "UPDATE",
      type: "Webhook",
      environment: "Master",
      timestamp: "28 Jun 2025 23:17",
    },
    {
      user: "Likson Boro",
      entityId: "5956536",
      action: "UNPUBLISH",
      type: "Model",
      environment: "Master",
      timestamp: "28 Jun 2025 23:17",
    },
    {
      user: "Mungo Jidu",
      entityId: "53208336",
      action: "PUBLISH",
      type: "Content",
      environment: "Staging",
      timestamp: "29 Jun 2025 23:17",
    },
    {
      user: "Turi Thtica",
      entityId: "57458745",
      action: "DELETE",
      type: "Content",
      environment: "Master",
      timestamp: "28 Jun 2025 23:17",
    },
    {
      user: "Pony Huato",
      entityId: "51028754",
      action: "CREATED",
      type: "Model",
      environment: "Staging",
      timestamp: "28 Jun 2025 23:17",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = 32;

  return (
    <div>
      <h2 className="text-[20px] font-semibold mb-2">Audit Logs</h2>
      <p className="text-sm text-gray-500 mb-4">
        Monitor any changes made to your project, view them and connect with
        audit logs.
      </p>

      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#8A1538] text-white text-left">
              <th className="px-4 py-2">USER</th>
              <th className="px-4 py-2">ENTITY ID</th>
              <th className="px-4 py-2">ACTION</th>
              <th className="px-4 py-2">TYPE</th>
              <th className="px-4 py-2">ENVERMENT</th>
              <th className="px-4 py-2">TIMESTAMP</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2">{row.user}</td>
                  <td className="px-4 py-2">{row.entityId}</td>
                  <td className="px-4 py-2">{row.action}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.environment}</td>
                  <td className="px-4 py-2">{row.timestamp}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>
          Showing {rowsPerPage} of {data.length} entries
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded-md hover:bg-gray-200"
          >
            Previous
          </button>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === num
                  ? "bg-[#8A1538] text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
          <span className="px-2">...</span>
          <button className="px-3 py-1 border rounded-md">32</button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded-md hover:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
