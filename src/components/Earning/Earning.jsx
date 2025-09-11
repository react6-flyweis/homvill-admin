import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";

const EarningsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 13;

  const data = [
    {
      date: "12/05/2024",
      buyer: "Alena George",
      seller: "Livia Curtis",
      amount: "$660,000",
      payment: "Online",
      transaction: "147854123668",
      status: "Completed",
    },
    {
      date: "12/05/2024",
      buyer: "Carter Franci",
      seller: "Kaiya Korsgaard",
      amount: "$660,000",
      payment: "Online",
      transaction: "147856123586",
      status: "Completed",
    },
    {
      date: "12/05/2024",
      buyer: "Jordyn Culhane",
      seller: "Angel Carder",
      amount: "$660,000",
      payment: "Online",
      transaction: "143654123586",
      status: "Completed",
    },
    {
      date: "12/05/2024",
      buyer: "Alena George",
      seller: "Livia Curtis",
      amount: "$660,000",
      payment: "Online",
      transaction: "147854123668",
      status: "Completed",
    },
    {
      date: "12/05/2024",
      buyer: "Carter Franci",
      seller: "Kaiya Korsgaard",
      amount: "$660,000",
      payment: "Online",
      transaction: "147856123586",
      status: "Completed",
    },
    {
      date: "12/05/2024",
      buyer: "Jordyn Culhane",
      seller: "Angel Carder",
      amount: "$660,000",
      payment: "Online",
      transaction: "143654123586",
      status: "Completed",
    },
    // Add more rows here (repeat for demo)
  ];

  // Pagination
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = data.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        {/* Top row (Earning + Filters all in one row) */}
        <div className="flex flex-col lg:flex-row lg:items-center  gap-4">
          <h2 className="text-xl font-semibold">Earning</h2>

          <div className="flex flex-wrap  items-center gap-3">
            <div className="border shadow-md ml-4 border-gray-300 bg-white text-[#8A1538] font-semibold text-sm px-4 py-2 rounded-md">
              Total Earnings:{" "}
              <span className="text-[#8A1538]">$100,000,000.00</span>
            </div>

            <div className="flex items-center shadow-md border ml-2 rounded-md px-3 py-2 text-sm">
              Jan 01, 2024 - Dec 31, 2024
              <span className="ml-2">📅</span>
            </div>

            <select className="border px-3 py-2 shadow-md ml-2 rounded-md text-sm">
              <option>Earnings From</option>
            </select>

            <button className="border px-4 py-2 shadow-md ml-2  rounded-md text-sm">
              Download
            </button>

            <select className="border shadow-md ml-2  px-3 py-2 rounded-md text-sm">
              <option>All</option>
            </select>
          </div>
        </div>

        {/* Bottom row (description text) */}
        <p className="text-xs text-gray-500 mt-2">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#8A1538] text-white font-semibold">
            <tr>
              <th className="px-4 py-3">DATE</th>
              <th className="px-4 py-3">BUYER NAME</th>
              <th className="px-4 py-3">SELLER NAME</th>
              <th className="px-4 py-3">AMOUNT</th>
              <th className="px-4 py-3">PAYMENT MODE</th>
              <th className="px-4 py-3">TRANSACTION ID</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 border-r py-3">{row.date}</td>
                <td className="px-4 border-r py-3">{row.buyer}</td>
                <td className="px-4 border-r py-3">{row.seller}</td>
                <td className="px-4 border-r py-3 font-medium">{row.amount}</td>
                <td className="px-4 border-r py-3">{row.payment}</td>
                <td className="px-4 border-r py-3">{row.transaction}</td>
                <td className="px-4 py-3 border-r text-[#8A1538] font-medium">
                  {row.status}
                </td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button className="text-[#8A1538] hover:text-red-700">
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm">
        <p>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + entriesPerPage, data.length)} of {data.length}{" "}
          entries
        </p>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-[#8A1538] text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
