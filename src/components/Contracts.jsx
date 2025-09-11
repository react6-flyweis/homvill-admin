import React, { useState } from "react";

const ContractsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const contracts = [
    {
      owner: "Nikolas Bendy",
      property: "C975322",
      category: "Plumbing Contract",
      contact: "+1 5246 945 120",
      contractor: "Altoni Jakob",
      company: "ABC Construction",
    },
    {
      owner: "Jason Ricatti",
      property: "C198522",
      category: "Maintenance Contract",
      contact: "+1 7894 945 980",
      contractor: "Touhran Hen",
      company: "DAISY Builder Works",
    },
    {
      owner: "Freddy Dios",
      property: "C177022",
      category: "Electrical Contract",
      contact: "+1 9663 845 320",
      contractor: "Geidu Lutton",
      company: "YUJA Construction Work",
    },
    {
      owner: "Kian Caroni",
      property: "C177032",
      category: "Roofing Contract",
      contact: "+1 7488 845 120",
      contractor: "Abram Domin",
      company: "Rodry Rocks Construction",
    },
    {
      owner: "Steve Saris",
      property: "C145322",
      category: "Plumbing Contract",
      contact: "+1 7788 945 320",
      contractor: "Desiare Philips",
      company: "STEPN Builder Works",
    },
    {
      owner: "Cecila Philips",
      property: "C874124",
      category: "Electrical Contract",
      contact: "+1 4589 365 320",
      contractor: "Celani Dulce",
      company: "ELECTRO Construction WK",
    },
    {
      owner: "Lindsey Regorsard",
      property: "C854632",
      category: "HVAC Contract",
      contact: "+1 8963 945 368",
      contractor: "Botash Ahmad",
      company: "UJS Contractor Works",
    },
    {
      owner: "Galet Martin",
      property: "C214322",
      category: "Painting Contract",
      contact: "+1 7788 845 380",
      contractor: "Bilano George",
      company: "ABC Construction",
    },
    {
      owner: "Davis Delin",
      property: "C177432",
      category: "Landscaping Contract",
      contact: "+1 1285 745 630",
      contractor: "Alona Caloni",
      company: "UPL Construction Works",
    },
    {
      owner: "Harter Vaccaro",
      property: "C186882",
      category: "Painting Contract",
      contact: "+1 7415 945 320",
      contractor: "Desiare Philips",
      company: "ASTAR Construction",
    },
    {
      owner: "Miracle Westervelt",
      property: "C110232",
      category: "Carpentry Contract",
      contact: "+1 9693 945 630",
      contractor: "Rayna Baptista",
      company: "YHUJ Construction",
    },
    {
      owner: "Vaccaro Betor",
      property: "C115032",
      category: "Painting Contract",
      contact: "+1 9689 945 630",
      contractor: "Yojun John",
      company: "RUS Construction",
    },
    {
      owner: "Dulce Bator",
      property: "C153232",
      category: "Maintenance Contract",
      contact: "+1 7748 945 530",
      contractor: "Cristalfer Press",
      company: "DTS Construction",
    },
  ];

  return (
    <div className="p-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Contracts</h1>
        <div className="flex gap-2">
          <button className="bg-[#8A1538] text-white px-4 py-2 rounded-md">
            All Partners
          </button>
          <button className="bg-[#8A1538] text-white px-4 py-2 rounded-md">
            Contract Enquiries
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#8A1538] text-white whitespace-nowrap text-left">
              <th className="px-4 py-2">OWNER NAME</th>
              <th className="px-4 py-2">PROPERTY ID</th>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">OWNER CONTACT</th>
              <th className="px-4 py-2">CONTRACTOR PERSON</th>
              <th className="px-4 py-2">COMPANY</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, i) => (
              <tr
                key={i}
                className={`border-b hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-2">{c.owner}</td>
                <td className="px-4 py-2">{c.property}</td>
                <td className="px-4 py-2">{c.category}</td>
                <td className="px-4 py-2">{c.contact}</td>
                <td className="px-4 py-2">{c.contractor}</td>
                <td className="px-4 py-2">{c.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing 1 to 13 of 412 entries</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md">Previous</button>
          <button className="px-3 py-1 border rounded-md bg-[#a90d47] text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <button className="px-3 py-1 border rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ContractsTable;
