import React from "react";
import { useNavigate } from "react-router-dom";
import { NewUsersTable } from "@/components/Overview/NewUsersTable";
import { EarningChart } from "@/components/Overview/EarningChart";
import { StatCard } from "@/components/Overview/StatCard";

import TotalUsersCard from "@/components/Overview/TotalUsersCard";
import ListedStates from "@/components/Overview/ListedStates";
import wallet from "@/assets/wallet.svg";
import head from "@/assets/head.svg";
import bag from "@/assets/bag.svg";
import table from "@/assets/table.svg";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const displayName = `${user?.Name ?? ""} ${user?.last_name ?? ""}`.trim();

  return (
    <div className=" bg-white">
      {/* Top section: total users card (dynamic) and listed states */}

      <div className="text-lg">
        Good Morning,{" "}
        <span className="text-2xl text-primary  font-bold">{displayName}</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <TotalUsersCard />
        </div>

        <ListedStates />
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
