import React from "react";
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* Left side: Title + Add New Subscription + description */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Subscriptions</h2>

            <button
              onClick={() => navigate("/dashboard/subscribe/addsubscribe")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
  hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
            >
              Add A New Subscription <Plus size={16} />
            </button>
          </div>
          {/* description below heading */}
          <p className="text-sm text-gray-500 mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Right side: Active Subscriptions */}
        <button
          onClick={() => navigate("/dashboard/subscribe/active")}
          className="px-4 py-2 bg-[#8A1538] text-white rounded-md text-sm font-medium shadow"
        >
          Active Subscriptions
        </button>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic */}
        <div className="relative rounded-lg p-[1px] shadow bg-gradient-to-bl from-[#FF6794] via-[#FFE6EE] to-[#FFFFFF]">
          <div
            style={{
              border: "1px solid",
              borderImageSource:
                "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
              borderImageSlice: 1,
            }}
            className="rounded-lg p-5 bg-transparent"
          >
            {/* Tag */}
            <span className="bg-[#FF9FBC6B] px-3 py-1 text-[14px] font-semibold text-pink-600 rounded-br-3xl absolute top-0 left-0 shadow">
              Seller <span className="text-[#8A1538] text-[22px]">Basic</span>
            </span>

            {/* Features */}
            <ul className="mt-10 space-y-1 text-sm text-[#1D1D1D]">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex justify-between">
                  Lorem Ipsum is simply dummy text <span>0{i + 1}</span>
                </li>
              ))}
            </ul>

            {/* Price & Button */}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-bold text-[#8A1538]">$199 / mo</p>
              <button
                onClick={() => navigate(`/dashboard/subscribe/edit/${0}`)}
                className="px-8 py-1 bg-[#8A1538] text-white rounded text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="relative rounded-lg p-[1px] shadow bg-gradient-to-bl from-[#FF6794] via-[#FFE6EE] to-[#FFFFFF]">
          <div
            style={{
              border: "1px solid",
              borderImageSource:
                "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
              borderImageSlice: 1,
            }}
            className="rounded-lg p-5 bg-transparent"
          >
            {/* Tag */}
            <span className="bg-[#FF9FBC6B] px-3 py-1 text-[14px] font-semibold text-pink-600 rounded-br-3xl absolute top-0 left-0 shadow">
              Seller <span className="text-[#8A1538] text-[22px]">Gold</span>
            </span>

            {/* Features */}
            <ul className="mt-10 space-y-1 text-sm text-[#1D1D1D]">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex justify-between">
                  Lorem Ipsum is simply dummy text <span>0{i + 1}</span>
                </li>
              ))}
            </ul>

            {/* Price & Button */}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-bold text-[#8A1538]">$499 / mo</p>
              <button
                onClick={() => navigate(`/dashboard/subscribe/edit/${1}`)}
                className="px-8 py-1 bg-[#8A1538] text-white rounded text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="relative rounded-lg p-[1px] shadow bg-gradient-to-bl from-[#FF6794] via-[#FFE6EE] to-[#FFFFFF]">
          <div
            style={{
              border: "1px solid",
              borderImageSource:
                "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
              borderImageSlice: 1,
            }}
            className="rounded-lg p-5 bg-transparent"
          >
            {/* Tag */}
            <span className="bg-[#FF9FBC6B] px-3 py-1 text-[14px] font-semibold text-pink-600 rounded-br-3xl absolute top-0 left-0 shadow">
              Seller <span className="text-[#8A1538] text-[22px]">Premium</span>
            </span>

            {/* Features */}
            <ul className="mt-10 space-y-1 text-sm text-[#1D1D1D]">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex justify-between">
                  Lorem Ipsum is simply dummy text <span>0{i + 1}</span>
                </li>
              ))}
            </ul>

            {/* Price & Button */}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-bold text-[#8A1538]">$999 / mo</p>
              <button
                onClick={() => navigate(`/dashboard/subscribe/edit/${2}`)}
                className="px-8 py-1 bg-[#8A1538] text-white rounded text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-[#8A1538] text-left text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">FEATURES</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">TOTAL FEATURES</th>
              <th className="px-4 py-2">Subscription For</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Basic",
                price: "$199 / mo",
                features: "03",
                sub: "Buyer",
                color: "text-[#8CAC0C]",
              },
              {
                name: "Gold",
                price: "$499 / mo",
                features: "08",
                sub: "Buyer",
                color: "text-[#8CAC0C]",
              },
              {
                name: "Premium",
                price: "$999 / mo",
                features: "15",
                sub: "Buyer",
                color: "text-[#8CAC0C]",
              },
              {
                name: "Basic",
                price: "$199 / mo",
                features: "03",
                sub: "Seller",
                color: "text-[#001381]",
              },
              {
                name: "Gold",
                price: "$499 / mo",
                features: "08",
                sub: "Seller",
                color: "text-[#001381]",
              },
              {
                name: "Premium",
                price: "$999 / mo",
                features: "15",
                sub: "Seller",
                color: "text-[#001381]",
              },
              {
                name: "Basic",
                price: "$199 / mo",
                features: "03",
                sub: "Contractor",
                color: "text-[#970076]",
              },
              {
                name: "Gold",
                price: "$599 / mo",
                features: "07",
                sub: "Contractor",
                color: "text-[#970076]",
              },
            ].map((item, i) => (
              <tr key={i} className="border-b  hover:bg-gray-50">
                <td
                  className="px-4 py-2 text-gray-800 border-r font-medium"
                  style={{
                    background:
                      "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
                  }}
                >
                  {item.name}
                </td>

                <td className="px-4 py-2 border-r text-gray-600">
                  Lorem Ipsum is Simply Dummy Text...
                </td>
                <td className="px-4 py-2 border-r">{item.price}</td>
                <td className="px-4 py-2 border-r">{item.features}</td>
                <td className={`px-4 py-2  font-medium ${item.color}`}>
                  {item.sub}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  <button
                    onClick={() => navigate(`/dashboard/subscribe/edit/${i}`)}
                  >
                    <Pencil size={16} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
