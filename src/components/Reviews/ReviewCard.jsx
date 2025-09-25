import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export const ReviewCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 border">
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="bg-[#8A1538] text-white text-xs font-medium px-3 py-1 rounded">
          Buyer ID: {data.id}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          Ratings:{" "}
          <span className="text-yellow-500">
            {"★".repeat(data.rating)}
            <span className="text-gray-300">{"★".repeat(5 - data.rating)}</span>
          </span>
        </span>
      </div>

      {/* User Info */}
      <div className="flex gap-3 items-start">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-[#363636]">{data.name}</h3>
          <p className="text-sm text-gray-600">{data.review}</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-[#363636] mt-2"
          >
            {showDetails ? "Hide details ▲" : "Review details ▼"}
          </button>
        </div>
      </div>

      {/* Expandable Section */}
      {showDetails && (
        <div className="border-t pt-3 mt-2 grid grid-cols-2 gap-4 text-sm">
          {/* Property Details */}
          <div>
            <h4 className="font-semibold mb-1">Property details</h4>
            <img
              src={data.property.image}
              alt="Property"
              className="w-20 h-16 rounded mb-2 object-cover"
            />
            <p>Street Address: {data.property.address}</p>
            <p>City: {data.property.city}</p>
            <p>Zip: {data.property.zip}</p>
            <p className="text-gray-500 text-xs">
              Joined: {data.property.joined}
            </p>
          </div>

          {/* Seller Details */}
          <div>
            <h4 className="font-semibold mb-1">Seller’s details</h4>
            <img
              src={data.seller.avatar}
              alt={data.seller.name}
              className="w-12 h-12 rounded-full mb-2 object-cover"
            />
            <p>Seller’s Name: {data.seller.name}</p>
            <p>Phone No: {data.seller.phone}</p>
            <p>Country: {data.seller.country}</p>
            <p className="text-gray-500 text-xs">
              Joined: {data.seller.joined}
            </p>
          </div>
        </div>
      )}

      {/* Delete Icon */}
      <div className="flex justify-end">
        <button className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
