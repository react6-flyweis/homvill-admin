import React from "react";
import totalUsersImg from "../components/assets/group3.svg"; // Replace with your left image
import listedStatesImg from "../components/assets/frame.svg"; // Replace with your right image

import { FaUser, FaHome, FaLayerGroup } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import wallet from "./assets/wallet.svg";
import head from "./assets/head.svg";
import bag from "./assets/bag.svg";
import table from "./assets/table.svg";
import { useNavigate } from "react-router-dom";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const data = [
    { name: "Jan", earning: 8000 },
    { name: "Feb", earning: 12000 },
    { name: "Mar", earning: 18000 },
    { name: "Apr", earning: 25000 },
    { name: "May", earning: 21000 },
    { name: "Jun", earning: 42000 },
    { name: "Jul", earning: 37000 },
    { name: "Aug", earning: 29000 },
    { name: "Sep", earning: 35000 },
    { name: "Oct", earning: 51000 },
    { name: "Nov", earning: 18000 },
    { name: "Dec", earning: 26000 },
  ];

  const newUsers = [
    {
      name: "Jenny Wilson",
      date: "Dec 18, 2024",
      email: "example@gmail.com",
      id: "7452031",
    },
    {
      name: "Albert Flores",
      date: "Dec 18, 2024",
      email: "example@gmail.com",
      id: "7452031",
    },
    {
      name: "Marvin McKinney",
      date: "Dec 18, 2024",
      email: "example@gmail.com",
      id: "7452031",
    },
    {
      name: "Sharyn Haney",
      date: "Dec 18, 2024",
      email: "example@gmail.com",
      id: "7452031",
    },
  ];
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: (val) => `$${val}k` } },
    },
  };
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
              {/* Earnings Card */}
              <div className="p-4 bg-white shadow rounded-lg border border-[#8A1538]">
                <div
                  onClick={() => navigate("/dashboard/earning")}
                  className="flex flex-col cursor-pointer items-start"
                >
                  <div className="bg-[#DFFBEF] p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <img src={wallet} alt="wallet" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#676767] mb-1">Earnings</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text- font-semibold">$23,425</h2>
                    <span className="text-[#56A67C] text-sm flex items-center gap-1">
                      ▲ 201
                    </span>
                  </div>
                </div>
              </div>

              {/* Users Card */}
              <div className="p-4 bg-white shadow rounded-lg border border-[#8A1538]">
                <div
                  onClick={() => navigate("/dashboard/users")}
                  className="flex flex-col cursor-pointer items-start"
                >
                  <div className="bg-[#FFF2E2] p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <img src={head} alt="wallet" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#676767] mb-1">Users</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text- font-semibold">$23,425</h2>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      ▲ 201
                    </span>
                  </div>
                </div>
              </div>

              {/* Properties Card */}
              <div className="p-4 bg-white shadow rounded-lg border border-[#8A1538]">
                <div
                  onClick={() => navigate("/dashboard/properties")}
                  className="flex flex-col cursor-pointer items-start"
                >
                  <div className="bg-[#FCE4EC] p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <img src={bag} alt="wallet" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#676767] mb-1">Properties</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text- font-semibold">$23,425</h2>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      ▲ 201
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Card */}
              <div className="p-4 bg-white shadow rounded-lg border border-[#8A1538]">
                <div
                  onClick={() => navigate("/dashboard/properties")}
                  className="flex cursor-pointer flex-col items-start"
                >
                  <div className="bg-[#EDE7F6] p-2 rounded-lg inline-flex items-center justify-center mb-2">
                    <img src={table} alt="wallet" className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#676767] mb-1">Category</p>
                  <h2 className=" font-semibold">9</h2>
                </div>
              </div>
            </div>

            {/* New Users */}
            <div className="bg-white shadow rounded-xl border border-[#8A1538] p-4">
              <h3 className="font-semibold mb-4">New Users</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#A9A9A9] font-normal  border-b">
                    <th className="text-left font-normal p-2">User Name</th>
                    <th className="text-left font-normal p-2">Date In</th>
                    <th className="text-left font-normal p-2">Email</th>
                    <th className="text-left font-normal p-2">ID</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {newUsers.map((user, idx) => (
                    <tr key={idx} className="border-b last:border-none">
                      <td className="p-2 flex items-center gap-2">
                        <img
                          src={`https://i.pravatar.cc/30?img=${idx + 1}`}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {user.name}
                      </td>
                      <td className="p-2">{user.date}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.id}</td>
                      <td className="p-2 text-red-500 cursor-pointer">
                        <FiTrash2 />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT SIDE (Earning Chart) */}
          <div className="bg-white shadow rounded-xl border border-[#8A1538] p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Earning</h3>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Yearly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="h-[380px]">
              {" "}
              {/* taller to match left height */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="earning" fill="#d9466a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
