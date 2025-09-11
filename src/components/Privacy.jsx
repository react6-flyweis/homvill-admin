import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
const termsData = [
  {
    id: 1,
    title: "Privacy & Policy Headline",
    description: `At Homevill, the administrative framework plays a critical role in maintaining the integrity, transparency, and efficiency of all real estate operations. This project and policy structure is designed to streamline backend processes, ensure secure handling of sensitive data,and enforce compliance with legal and operational standards. From managing property listings and handling legal agreements to overseeing client interactions and internal reporting, every aspect of the admin side is governed by a well-documented, structured policy. The objective is to create a reliable and scalable system that supports business growth while upholding our core values of trust, professionalism, and customer satisfaction....Contd....`,
  },
  {
    id: 2,
    title: "Privacy & Policy Headline",
    description: `At Homevill, the administrative framework plays a critical role in maintaining the integrity, transparency, and efficiency of all real estate operations. This project and policy structure is designed to streamline backend processes, ensure secure handling of sensitive data,and enforce compliance with legal and operational standards. From managing property listings and handling legal agreements to overseeing client interactions and internal reporting, every aspect of the admin side is governed by a well-documented, structured policy. The objective is to create a reliable and scalable system that supports business growth while upholding our core values of trust, professionalism, and customer satisfaction....Contd....`,
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
          <h2 className="text-xl font-semibold">Privacy & Policy</h2>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
              hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
          >
            Add A New Privacy & Policy <Plus size={16} />
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
