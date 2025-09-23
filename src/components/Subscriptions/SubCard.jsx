import React from "react";

export function SubCard({
  role = "Seller",
  plan = "Basic",
  price = "$0 / mo",
  features = [],
  onEdit,
}) {
  const featureList = Array.isArray(features)
    ? features
    : Array.from({ length: features });

  return (
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
          {role} <span className="text-[#8A1538] text-[22px]">{plan}</span>
        </span>

        {/* Features */}
        <ul className="mt-10 space-y-1 text-sm text-[#1D1D1D]">
          {featureList.map((f, i) => (
            <li key={i} className="flex justify-between">
              {typeof f === "string" && f.length
                ? f
                : "Lorem Ipsum is simply dummy text"}{" "}
              <span>{i < 9 ? `0${i + 1}` : i + 1}</span>
            </li>
          ))}
        </ul>

        {/* Price & Button */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold text-[#8A1538]">{price}</p>
          <button
            onClick={onEdit}
            className="px-8 py-1 bg-[#8A1538] text-white rounded text-sm"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
