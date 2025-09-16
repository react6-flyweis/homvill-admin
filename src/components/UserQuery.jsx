import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import tick from "@/assets/mdi_tick-all.svg";
const UsersQueryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 13;

  const data = [
    {
      date: "12/05/2024",
      user: "Ujaya Devei",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Carter Franci",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Jordyn Culhane",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Ujaya Devei",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Carter Franci",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Jordyn Culhane",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Ujaya Devei",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Carter Franci",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    {
      date: "12/05/2024",
      user: "Jordyn Culhane",
      contact: "+91 92389 38923",
      mail: "example@gmail.com",
      query: "Lorem Ipsum is Simply Dummy Text Of The Printing Industry",
    },
    // 👉 Add more rows here (copy-paste for demo)
  ];

  // Pagination logic
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = data.slice(startIndex, startIndex + entriesPerPage);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">User’s Query</h2>
        <p className="text-xs text-gray-500 mt-1">
          Learn payment & inquiry summary text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#8A1538] text-white font-semibold">
            <tr>
              <th className="px-4 py-3">DATE</th>
              <th className="px-4 py-3">USER NAME</th>
              <th className="px-4 py-3">CONTACT</th>
              <th className="px-4 py-3">MAIL ID</th>
              <th className="px-4 py-3">QUERY</th>
              <th className="px-4 py-3 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="px-4  border-r py-3">{row.date}</td>
                <td className="px-4 border-r py-3">{row.user}</td>
                <td className="px-4 border-r py-3">{row.contact}</td>
                <td className="px-4 border-r py-3">{row.mail}</td>
                <td className="px-4 border-r py-3 truncate max-w-xs">
                  {row.query}
                </td>
                <td className="px-4 py-3 flex justify-center gap-3">
                  <button className="text-[#8A1538] hover:text-red-700">
                    <FaEye className="text-lg" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <img src={tick} className="w-6" />
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

export default UsersQueryPage;
