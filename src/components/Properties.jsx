import { FiPlus, FiFilter, FiDownload } from "react-icons/fi";
import { useState } from "react";

const properties = [
  {
    listedBy: "Jasxon Mango",
    sellerId: "51478536",
    category: "Furnished Home",
    price: "$120,000.00",
    available: "RENT",
    email: "example@gmail.com",
    phone: "+1 7788 945 630",
  },
  {
    listedBy: "Mian Gingo",
    sellerId: "51478536",
    category: "Studio Apartments",
    price: "$180,000.00",
    available: "RENT",
    email: "example@gmail.com",
    phone: "+1 7788 945 630",
  },
  {
    listedBy: "Martin Dias",
    sellerId: "51478536",
    category: "Unfurnished Home",
    price: "$200,000.00",
    available: "RENT",
    email: "example@gmail.com",
    phone: "+1 7788 945 630",
  },
  // Add rest of the data here...
];

const PropertyTable = () => {
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <div className=" bg-gray-50">
      <div className="w-full bg-white p-4 shadow-sm">
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-1">
          {/* Left: Properties + Add button */}
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-800">Properties</h1>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
              <FiPlus size={16} /> Add A New Property
            </button>
          </div>

          {/* Right: Filters + Actions */}
          {/* Tabs */}
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-500">
            ALL
          </button>
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-500">
            SALE
          </button>
          <button className="px-4 py-2 rounded-md text-sm font-medium bg-[#800020] text-white">
            RENT
          </button>

          {/* Filter */}
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FiFilter size={18} className="text-[#800020]" />
          </button>

          {/* Download Dropdown */}
          <select className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
            <option>Download</option>
            <option>Excel</option>
            <option>PDF</option>
          </select>

          {/* Offer Raised */}
          <button className="px-4 py-2 bg-[#800020] text-white text-sm font-medium rounded-md hover:bg-[#660019]">
            Offer Raised
          </button>

          {/* Tours Scheduled */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#800020] text-white text-sm font-medium rounded-md hover:bg-[#660019]">
            Tours Scheduled <FiDownload size={16} />
          </button>
        </div>

        {/* Bottom Row: Description */}
        <p className="text-xs text-gray-500 mt-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#800020] text-white">
            <tr>
              <th className="p-3">LISTED BY</th>
              <th className="p-3">SELLER ID</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">AVAILABLE TO</th>
              <th className="p-3">EMAIL</th>
              <th className="p-3">PHONE NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-pink-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">{property.listedBy}</td>
                <td className="p-3">{property.sellerId}</td>
                <td className="p-3">{property.category}</td>
                <td className="p-3">{property.price}</td>
                <td className="p-3 text-pink-600 font-semibold">
                  {property.available}
                </td>
                <td className="p-3">{property.email}</td>
                <td className="p-3">{property.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p>Showing 1 to 13 of 412 entries</p>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 border rounded">Previous</button>
          <button className="px-3 py-1 bg-[#800020] text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTable;
