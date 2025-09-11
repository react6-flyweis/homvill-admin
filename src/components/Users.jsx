import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const tabs = [
    { id: "all", label: "All Users", count: 840 },
    { id: "buyers", label: "Buyers", count: 400 },
    { id: "sellers", label: "Sellers", count: 365 },
    { id: "renters", label: "Renters", count: 120 },
    { id: "builders", label: "Builder", count: 95 },
    { id: "contractors", label: "Contractor", count: 88 },
    { id: "verified", label: "Verified Owners", count: 64 },
    { id: "newowners", label: "New Owners", count: 47 },
  ];

  const data = {
    all: [
      {
        name: "Jakob Calzoni",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Buyer",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Jaxon Mango",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Contractor",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Martin Dias",
        id: "S1478536",
        phone: "+1 7788 945 630",
        type: "Builder",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Jakob Calzoni",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Buyer",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Jaxon Mango",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Contractor",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Martin Dias",
        id: "S1478536",
        phone: "+1 7788 945 630",
        type: "Builder",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Jakob Calzoni",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Buyer",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Jaxon Mango",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Contractor",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Martin Dias",
        id: "S1478536",
        phone: "+1 7788 945 630",
        type: "Builder",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
    ],
    buyers: [
      {
        name: "Jakob Calzoni",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Buyer",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Gretchen Culhane",
        id: "B1478239",
        phone: "+1 7788 945 630",
        type: "Buyer",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
    ],
    sellers: [
      {
        name: "Jakob Calzoni",
        id: "S1478536",
        phone: "+1 7788 945 630",
        type: "Seller",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
      {
        name: "Kaylynn Bothman",
        id: "S1478536",
        phone: "+1 7788 945 630",
        type: "Seller",
        email: "example@gmail.com",
        date: "12/05/2024",
      },
    ],
    renters: [],
    builders: [],
    contractors: [],
    verified: [],
    newowners: [],
  };

  const headers = {
    all: [
      "Name",
      "ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    buyers: [
      "Name",
      "Buyer ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    sellers: [
      "Name",
      "Seller ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    renters: [
      "Name",
      "Renter ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    builders: [
      "Name",
      "Builder ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    contractors: [
      "Name",
      "Contractor ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    verified: [
      "Name",
      "Owner ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
    newowners: [
      "Name",
      "Owner ID",
      "Phone Number",
      "User Type",
      "Email",
      "Date of Joining",
    ],
  };

  return (
    <div style={{ fontFamily: "Poppins" }} className="">
      {/* Top Bar */}
      {/* <div className="flex gap-4 items-center mb-6">
        <h1 className="text-xl font-semibold">Users</h1>
        <button onClick={() => navigate('/dashboard/subscribe/addsubscribe')} className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
  hover:bg-[#8A1538] hover:text-white transition-colors duration-200">
          Add A New User <Plus size={16} />
        </button>
      </div> */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Users</h1>
            <button
              onClick={() => navigate("/dashboard/users/newuser")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
            >
              Add a New User <Plus size={16} />
            </button>
          </div>
          <p className="text-xs mt-2 text-gray-500">
            Users layout is in step & query based on the printing and
            typesetting industry.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <select className="border rounded-md px-3 py-2 text-sm shadow-md">
            <option>Download</option>
          </select>
          <select className="border rounded-md px-3 py-2 text-sm shadow-md">
            <option>All</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex whitespace-nowrap space-x-6 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center pb-2 text-sm font-medium relative ${
              activeTab === tab.id
                ? "text-[#8A1538] border-b-2 border-[#8A1538]"
                : "text-gray-600"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? "bg-pink-100 text-[#8A1538]"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#8A1538] text-white">
              {headers[activeTab].map((head, i) => (
                <th key={i} className="px-4 py-2 text-sm font-medium">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[activeTab].length > 0 ? (
              data[activeTab].map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.phone}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers[activeTab].length}
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>
          Showing 1 to {Math.min(12, data[activeTab].length)} of{" "}
          {tabs.find((t) => t.id === activeTab).count} entries
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1 border rounded bg-[#8A1538] text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
