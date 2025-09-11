import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // for password toggle icons

const AddSubAdmin = () => {
  const employees = [
    {
      id: "EMP12423",
      name: "Tiana Curtis",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "EMP12423",
      name: "Justin Donin",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "EMP12423",
      name: "Talan Saris",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "EMP12423",
      name: "Alfonso Botosh",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "EMP12423",
      name: "Maria Curtis",
      image: "https://via.placeholder.com/40",
    },
    {
      id: "EMP12423",
      name: "Talan Kentor",
      image: "https://via.placeholder.com/40",
    },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-2">Add Sub-Admin</h2>
      <p className="text-sm text-gray-500 mb-4">
        Monitor any changes made to your project, view them and connect with
        audit logs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Employee List */}
        <div className="space-y-3">
          {employees.map((emp, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={emp.image}
                  alt={emp.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-xs text-green-600">
                    Employee ID: {emp.id}
                  </p>
                </div>
              </div>
              <button className="px-4 py-1 border rounded-md text-sm hover:bg-gray-100">
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Right Side - Form */}
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="enter id"
              className="w-full border border-pink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              className="w-full border border-pink-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Re-enter Password */}
          <div className="mb-6 relative">
            <label className="block mb-1 font-medium">
              Re-Enter Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showRePassword ? "text" : "password"}
              placeholder="enter password"
              className="w-full border border-pink-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="px-5 py-2 border rounded-md">Cancel</button>
            <button className="px-5 py-2 bg-[#a80036] text-white rounded-md hover:bg-[#8a002c]">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubAdmin;
