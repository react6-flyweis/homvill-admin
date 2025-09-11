import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const AddUserForm = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      // Close modal and navigate after 5 seconds
      timer = setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard/users");
      }, 2000);
    }
    return () => clearTimeout(timer); // cleanup timer
  }, [isOpen, navigate]);
  return (
    <div className="">
      {/* Header */}
      <div
        onClick={() => navigate("/dashboard/users")}
        className="flex items-center gap-2 mb-1"
      >
        <ArrowLeft size={20} className="cursor-pointer" />
        <h1 className="text-lg font-semibold">Add A User</h1>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Profile Section */}
        <h2 className="text-lg font-semibold mb-4 ml-[86px]">
          Profile Details
        </h2>
        <div className="flex items-start gap-6 mb-6">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">+</span>
          </div>

          {/* Profile Inputs */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="border rounded-md px-3 py-2 text-sm w-full"
              />
            </div>

            {/* User Type */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                User Type
              </label>
              <select className="border rounded-md px-3 py-2 text-sm w-full">
                <option>Select User Type</option>
                <option>Buyer</option>
                <option>Renter</option>
                <option>Seller</option>
                <option>Contractor</option>
                <option>Builder</option>
              </select>
            </div>

            {/* User Category */}
            <div className="flex flex-col">
              <label className="text-[16px] font-medium text-[#232323] mb-1">
                User Category
              </label>
              <select className="border rounded-md px-3 py-2 text-sm w-full">
                <option>Select User Category</option>
                <option>N/A</option>
                <option>Electrical Contractor</option>
                <option>Plumbing Contractor</option>
                <option>HVMC Contractor</option>
                <option>Roofing Contractor</option>
                <option>Carpentry Contractor</option>
                <option>Painting Contractor</option>
                <option>Masonry Contractor</option>
                <option>Landscape Contractor</option>
                <option>Maintenance Contractor</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Apartment / Items / Plumbing / Painting etc.
              </p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="ml-24">
          <h2 className="text-lg font-semibold mb-4">User Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Street Address"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            <input
              type="text"
              placeholder="City"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            <input
              type="text"
              placeholder="Zip"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            <input
              type="text"
              placeholder="Country"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
          </div>

          {/* Other Details */}
          <h2 className="text-lg font-semibold mb-4">Other Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="date"
              placeholder="Today Date"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
            <input
              type="text"
              placeholder="Aadhar/PAN"
              className="border rounded-md px-3 py-2 text-sm w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#8A1538] text-white py-2 rounded-md"
          >
            Add
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] h-[300px]  text-center">
                {/* Icon */}
                <div className="flex justify-center mt-12 mb-6">
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-pink-400">
                    <Check className="w-8 h-8 text-white" />
                    {/* Dots animation effect */}
                    <span className="absolute w-24 h-24 rounded-full border-4 border-pink-200 animate-ping"></span>
                  </div>
                </div>

                {/* Message */}
                <p className="text-[#8A1538] font-medium mt-16 text-lg">
                  A New User Added Successfully
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
