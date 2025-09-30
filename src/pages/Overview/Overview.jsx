import React from "react";
import { useNavigate } from "react-router-dom";
import { NewUsersTable } from "@/components/Overview/NewUsersTable";
import { EarningChart } from "@/components/Overview/EarningChart";
import { StatCard } from "@/components/Overview/StatCard";

import totalUsersImg from "@/assets/group3.svg";
import listedStatesImg from "@/assets/frame.svg";
import wallet from "@/assets/wallet.svg";
import head from "@/assets/head.svg";
import bag from "@/assets/bag.svg";
import table from "@/assets/table.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-white">
      {/* Top section: two images side by side */}
      <div className="flex gap-6 mb-6">
        {/* Total Users Card Image */}
        <div className="flex bg-white w-[680px] rounded-xl overflow-hidden ">
          <img
            src={totalUsersImg}
            alt="Total Users"
            className=" object-contain"
          />
        </div>

        <div className="flex-1 bg-white rounded-xl overflow-hidden mt-14 shadow h-[287.2px] relative">
          {/* Text Overlay */}
          <div className="absolute top-3 left-3 text-white font-semibold text-lg z-10">
            All Listed States
          </div>

          {/* Image */}
          <img
            src={listedStatesImg}
            alt="All Listed States"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom section - example placeholders */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* LEFT SIDE (spans 2 columns) */}
          <div className="col-span-2 flex flex-col gap-6">
            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  title: "Earnings",
                  value: "$23,425",
                  delta: 201,
                  deltaColor: "text-[#56A67C]",
                  icon: <img src={wallet} alt="wallet" className="w-6 h-6" />,
                  iconBg: "bg-[#DFFBEF]",
                  onClick: () => navigate("/dashboard/earning"),
                },
                {
                  title: "Users",
                  value: "$23,425",
                  delta: 201,
                  deltaColor: "text-green-500",
                  icon: <img src={head} alt="head" className="w-6 h-6" />,
                  iconBg: "bg-[#FFF2E2]",
                  onClick: () => navigate("/dashboard/users"),
                },
                {
                  title: "Properties",
                  value: "$23,425",
                  delta: 201,
                  deltaColor: "text-green-500",
                  icon: <img src={bag} alt="bag" className="w-6 h-6" />,
                  iconBg: "bg-[#FCE4EC]",
                  onClick: () => navigate("/dashboard/properties"),
                },
                {
                  title: "Category",
                  value: "9",
                  icon: <img src={table} alt="table" className="w-6 h-6" />,
                  iconBg: "bg-[#EDE7F6]",
                  onClick: () => navigate("/dashboard/properties"),
                },
              ].map((s, idx) => (
                <StatCard
                  key={idx}
                  title={s.title}
                  value={s.value}
                  delta={s.delta}
                  deltaColor={s.deltaColor}
                  icon={s.icon}
                  iconBg={s.iconBg}
                  onClick={s.onClick}
                />
              ))}
            </div>

            <NewUsersTable />
          </div>

          {/* RIGHT SIDE (Earning Chart) */}
          <EarningChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
