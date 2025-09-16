import nrk from "@/assets/nrk.svg";
import { useNavigate } from "react-router-dom";

export default function New() {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Header */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <img
          onClick={() => navigate("/dashboard/banners/social")}
          src={nrk}
          className="cursor-pointer"
        ></img>{" "}
        Add New Social Links
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Card */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex gap-6">
          {/* Left Icon Placeholder */}
          <div className="w-32 h-32 flex items-center justify-center rounded-lg bg-gray-100 border text-gray-600 text-sm">
            Link Icon
          </div>

          {/* Right Form Fields */}
          <div className="flex-1 space-y-4">
            {/* Link Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Link Title
              </label>
              <input
                type="text"
                placeholder="Title here"
                className="w-full h-10 px-3 rounded-md bg-gray-100 outline-none text-sm"
              />
            </div>

            {/* Link Address */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Link Address
              </label>
              <input
                type="text"
                placeholder="Link Address"
                className="w-full h-10 px-3 rounded-md bg-gray-100 outline-none text-sm"
              />
            </div>

            {/* Alternative Link Address */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Alternative Link Address (optional)
              </label>
              <input
                type="text"
                placeholder="Alternative Links"
                className="w-full h-10 px-3 rounded-md bg-gray-100 outline-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <button className="bg-[#8A1538] text-white px-6 py-2 rounded-md text-sm font-medium shadow">
              Add New Links
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
