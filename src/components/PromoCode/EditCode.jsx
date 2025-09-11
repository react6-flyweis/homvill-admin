import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePromoCode = () => {
  const [visibility, setVisibility] = useState(true);
  const [discountType, setDiscountType] = useState("flat");
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft
          onClick={() => navigate("/dashboard/promocode")}
          size={20}
          className="cursor-pointer"
        />
        <h1 className="text-lg font-semibold">Edit Promo Code</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Learn ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Form */}
      <div className="grid bg-white shadow rounded-md p-3 grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Offer Name</label>
          <input
            type="text"
            defaultValue="New Year Sale"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Coupon Code */}
        <div>
          <label className="block text-sm font-medium mb-1">Coupon Code</label>
          <input
            type="text"
            defaultValue="NY2025"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Coupon Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Coupon Type</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="type" defaultChecked /> Public Coupon
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="type" /> Private Coupon
            </label>
          </div>
        </div>
        <br />
        {/* Number of times used */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of time code has been used
          </label>
          <input
            type="number"
            defaultValue={10}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Use per user */}
        <div>
          <label className="block text-sm font-medium mb-1">Use per user</label>
          <input
            type="number"
            defaultValue={2}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Select Area */}
        <div>
          <label className="block text-sm font-medium mb-1">Select Area</label>
          <select
            defaultValue="Area 1"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          >
            <option>Select any</option>
            <option>Area 1</option>
            <option>Area 2</option>
          </select>
        </div>
        <br />
        {/* Visibility Toggle */}
        <div>
          <label className="block text-sm font-medium mb-1">Visibility</label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Toggle OFF, in case you don’t want to show this coupon to your
              users.
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={visibility}
                onChange={() => setVisibility(!visibility)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>
        <br />
        {/* Discount Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Discount Type
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={discountType === "flat"}
                onChange={() => setDiscountType("flat")}
              />{" "}
              Flat Discount
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={discountType === "percentage"}
                onChange={() => setDiscountType("percentage")}
              />{" "}
              Percentage Discount
            </label>
          </div>
          <input
            type="text"
            defaultValue="500"
            className="mt-2 w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <br />
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            defaultValue="2025-08-28"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            defaultValue="10:00"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            defaultValue="2025-09-15"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium mb-1">End Time</label>
          <input
            type="time"
            defaultValue="18:00"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Add Button */}
        <div className="mt-6 items-center flex justify-center md:col-span-2">
          <button className="bg-[#8A1538] text-white px-6 py-2 rounded-md text-sm font-medium">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePromoCode;
