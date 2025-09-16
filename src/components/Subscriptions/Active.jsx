import React from "react";
import nrk from "@/assets/nrk.svg";
import { useNavigate } from "react-router-dom";

const subscriptions = [
  {
    userName: "Mohith Gyam",
    userType: "Buyer",
    subscriptionType: "Basic",
    endsOn: "10-06-2025",
    price: "$199 / mo",
    features: "03",
  },
  {
    userName: "Laol J",
    userType: "Buyer",
    subscriptionType: "Gold",
    endsOn: "25-07-2025",
    price: "$499 / mo",
    features: "15",
  },
  {
    userName: "Haylie Calzoni",
    userType: "Buyer",
    subscriptionType: "Basic",
    endsOn: "18-05-2025",
    price: "$999 / mo",
    features: "06",
  },
  {
    userName: "Carla Saplimus",
    userType: "Seller",
    subscriptionType: "Premium",
    endsOn: "01-08-2026",
    price: "$199 / mo",
    features: "23",
  },
  {
    userName: "Salarl",
    userType: "Seller",
    subscriptionType: "Gold",
    endsOn: "18-06-2025",
    price: "$499 / mo",
    features: "18",
  },
  {
    userName: "Maria Roisser",
    userType: "Seller",
    subscriptionType: "Basic",
    endsOn: "25-09-2025",
    price: "$199 / mo",
    features: "10",
  },
  {
    userName: "Roger Vaccaro",
    userType: "Contractor",
    subscriptionType: "Premium",
    endsOn: "03-03-2026",
    price: "$1099 / mo",
    features: "20",
  },
  {
    userName: "Tiang George",
    userType: "Buyer",
    subscriptionType: "Gold",
    endsOn: "10-10-2025",
    price: "$599 / mo",
    features: "07",
  },
  {
    userName: "Holly Morga",
    userType: "Builder",
    subscriptionType: "Gold",
    endsOn: "25-10-2025",
    price: "$799 / mo",
    features: "10",
  },
  {
    userName: "John Tina",
    userType: "Seller",
    subscriptionType: "Basic",
    endsOn: "10-06-2025",
    price: "$199 / mo",
    features: "07",
  },
];

export default function ActiveSubscriptions() {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Heading */}
      {/* <h2 className="text-lg font-semibold mb-1">Active Subscriptions</h2> */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <img
          onClick={() => navigate("/dashboard/subscribe")}
          src={nrk}
          className="cursor-pointer"
        ></img>{" "}
        Active Subscriptions
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#8A1538] text-white text-left">
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Type</th>
              <th className="px-4 py-2">Subscriptions Type</th>
              <th className="px-4 py-2">Subscription Ends On</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">TOTAL FEATURES</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 border-r py-3">{sub.userName}</td>
                <td className="px-4 border-r py-3">{sub.userType}</td>
                <td
                  style={{
                    background:
                      "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
                  }}
                  className="px-4 border-r py-3"
                >
                  <span className="px-3 py-1 rounded-md text-black text-sm">
                    {sub.subscriptionType}
                  </span>
                </td>
                <td className="px-4 border-r py-3">{sub.endsOn}</td>
                <td className="px-4 border-r py-3">{sub.price}</td>
                <td className="px-4 py-3">{sub.features}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        <p>Showing 1 to 10 of 68 entries</p>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 border rounded">&lt; Previous</button>
          <button className="px-3 py-1 border rounded bg-[#8A1538] text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">...</button>
          <button className="px-3 py-1 border rounded">23</button>
          <button className="px-2 py-1 border rounded">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}
