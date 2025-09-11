import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
const termsData = [
  {
    id: 1,
    title: "Terms & Conditions Title",
    description: `Welcome to Homewirl. By accessing or using our services—whether through our website, app, or in-person interactions—you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
1. Service Usage
Homewirl provides real estate services including property listings, buying, selling, renting, and related administrative support. All users must ensure that any information provided is accurate and not misleading.
2. Property Listings
All property details are subject to verif...`,
  },
  {
    id: 2,
    title: "Terms & Conditions Title",
    description: `Welcome to Homewirl. By accessing or using our services—whether through our website, app, or in-person interactions—you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
1. Service Usage
Homewirl provides real estate services including property listings, buying, selling, renting, and related administrative support. All users must ensure that any information provided is accurate and not misleading.
2. Property Listings
All property details are subject to verif...`,
  },
];

const TermsCard = ({ data }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2">
        {/* Header with Title + Icons */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{data.title}</h3>
          <div className="flex gap-3">
            <button className="text-gray-500 hover:text-gray-700">
              <Pencil size={18} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {data.description}
        </p>
      </div>
    </>
  );
};

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" space-y-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Terms & Condition</h2>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
              hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
          >
            Add A New Term & Condition <Plus size={16} />
          </button>
        </div>
        {/* description below heading */}
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      {termsData.map((item) => (
        <TermsCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TermsPage;
