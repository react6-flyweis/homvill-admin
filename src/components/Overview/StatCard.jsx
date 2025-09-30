import React from "react";

export const StatCard = ({
  title,
  value,
  delta,
  deltaColor = "text-green-500",
  icon,
  iconBg = "bg-gray-100",
  onClick,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg border border-[#8A1538]">
      <div
        onClick={onClick}
        className="flex flex-col cursor-pointer items-start"
      >
        <div
          className={`${iconBg} p-2 rounded-lg inline-flex items-center justify-center mb-2`}
        >
          {icon}
        </div>
        <p className="text-sm text-[#676767] mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">{value}</h2>
          {delta !== undefined && (
            <span className={`${deltaColor} text-sm flex items-center gap-1`}>
              ▲ {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
