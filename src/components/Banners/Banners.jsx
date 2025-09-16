import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react"; // for icons

import fore1 from "@/assets/fore1.jpg";
import fore2 from "@/assets/fore2.jpg";
import fore3 from "@/assets/fore3.jpg";
import fore4 from "@/assets/fore4.jpg";
import fore5 from "@/assets/fore5.jpg";
import fore6 from "@/assets/fore6.jpg";
import fore7 from "@/assets/fore7.jpg";
import fore8 from "@/assets/fore8.jpg";
import { useNavigate } from "react-router-dom";

const bannersData = [
  {
    id: 1,
    category: "Buying",
    title: "How to Find a Foreclosure",
    image: fore1,
  },
  {
    id: 2,
    category: "Financing",
    title: "HUD's Pre-Foreclosure Sales Program",
    image: fore2,
  },
  {
    id: 3,
    category: "Financing",
    title: "What Are the Types of Foreclosure?",
    image: fore3,
  },
  {
    id: 4,
    category: "Buying",
    title: "Overview of Buying a Foreclosure",
    image: fore4,
  },
  {
    id: 5,
    category: "Buying",
    title: "Buying a Pre-Foreclosure Property",
    image: fore5,
  },
  {
    id: 6,
    category: "Buying",
    title: "Buying a Home at a Foreclosure Auction",
    image: fore6,
  },
  {
    id: 7,
    category: "Buying",
    title: "Buying a Foreclosure Contract",
    image: fore7,
  },
  {
    id: 8,
    category: "Buying",
    title: "Foreclosure Financing",
    image: fore8,
  },
];

export default function Banners() {
  const navigate = useNavigate();

  const [banners, setBanners] = useState(bannersData);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [filledOnce, setFilledOnce] = useState(false);
  const [form, setForm] = useState({
    headline: "",
    category: "",
    date: "",
    description: "",
    imageNote: "", // just a label for the left box
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Autofill all fields the first time the user focuses/clicks any input
  const handleAutoFill = () => {
    if (filledOnce) return;
    setForm({
      headline: "Lorem Ipsum",
      category: "Buying",
      date: "12/07/2024",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting.",
      imageNote: "Uploaded Image",
    });
    setFilledOnce(true);
  };

  const isComplete =
    form.headline && form.category && form.date && form.description;

  const handleAdd = () => {
    // submit or do something with `form` if needed
    setOpen(false); // close modal
  };

  return (
    <div className="p-">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Banners</h1>
          <p className="text-gray-500 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/banners/social")}
          className="bg-[#8B1C32] text-white px-4 py-2 rounded-lg"
        >
          Social Media Links
        </button>
      </div>

      {/* Foreclosures button */}
      <button className="bg-[#8B1C32] text-white px-4 py-2 rounded-lg mb-6">
        Foreclosures
      </button>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-xl overflow-hidden shadow-xl  relative"
          >
            {/* Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full p-1 rounded-xl h-40 object-cover"
            />

            {/* Edit/Delete icons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setOpen1(true)}
                className="bg-white rounded-full p-1 shadow"
              >
                <Pencil size={16} className="text-gray-600" />
              </button>

              <button className="bg-white rounded-full p-1 shadow">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
            {open1 && (
              <div className="fixed inset-0 z-50 flex items-center justify-center ">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative p-6">
                  {/* Close Button */}
                  <button
                    onClick={() => setOpen1(false)}
                    className="absolute top-0 right-3 text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>

                  {/* Modal Content */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      {/* LEFT: image box */}
                      <label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-xs text-gray-500">
                        <img
                          src={fore1}
                          alt="Preview"
                          className="w-20 h-20 rounded object-cover"
                        />
                      </label>

                      {/* RIGHT: fields */}
                      <div className="flex-1 space-y-3">
                        {/* Row 1: headline */}
                        <input
                          type="text"
                          placeholder="enter headline here"
                          defaultValue="How to Find a Foreclosure"
                          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                        />

                        {/* Row 2: category + date */}
                        <div className="flex gap-3">
                          <input
                            type="text"
                            placeholder="Category"
                            defaultValue="Buying"
                            className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                          />
                          <input
                            type="text"
                            placeholder="publishing date"
                            defaultValue="2024-08-11"
                            className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                          />
                        </div>

                        {/* Row 3: description */}
                      </div>
                    </div>
                    <textarea
                      placeholder="Description."
                      defaultValue="2024-08-11"
                      className="h-28 w-full mt-4 resize-none rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                    />

                    {/* Save Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => setOpen1(false)}
                        className="bg-[#8A1538] text-white px-6 py-2 rounded-md font-medium"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <div className=" p-3">
              <span className=" bg-[#8A1538CC] text-white text-[14px] font-semibold px-3 py-2 rounded-md">
                {banner.category}
              </span>
              <h2 className="text-[15px] pt-2 text-[#1D1D1D] font-medium">
                {banner.title}
              </h2>
            </div>
          </div>
        ))}

        {/* Upload new banner card */}
        <div className="flex items-center justify-center border-2 border-dashed border-[#8A1538] rounded-xl h-120">
          <button
            onClick={handleOpen}
            className="flex flex-col items-center text-[#8B1C32]"
          >
            <Plus size={24} />
            <span className="mt-1 text-sm font-medium">Upload new banner</span>
          </button>
          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="relative w-[720px] rounded-2xl bg-white p-5">
                {/* Close */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-0 text-xl leading-none text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  ×
                </button>

                {/* Left image box + Right fields stacked */}
                <div className="flex gap-4">
                  {/* LEFT: image box */}
                  <label className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed text-xs text-gray-500">
                    {form.imageNote || "Enter thumbnail image here"}
                    <input type="file" className="hidden" />
                  </label>

                  {/* RIGHT: fields */}
                  <div className="flex-1 space-y-3">
                    {/* Row 1: headline */}
                    <input
                      type="text"
                      placeholder="enter headline here"
                      value={form.headline}
                      onFocus={handleAutoFill}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, headline: e.target.value }))
                      }
                      className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                    />

                    {/* Row 2: category + date */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onFocus={handleAutoFill}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, category: e.target.value }))
                        }
                        className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                      />
                      <input
                        type="text"
                        placeholder="publishing date"
                        value={form.date}
                        onFocus={handleAutoFill}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, date: e.target.value }))
                        }
                        className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                      />
                    </div>

                    {/* Row 3: description */}
                  </div>
                </div>
                <textarea
                  placeholder="Description."
                  value={form.description}
                  onFocus={handleAutoFill}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="h-28 w-full mt-4 resize-none rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#8B1C32]/40"
                />

                {/* Add button */}
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={handleAdd}
                    disabled={!isComplete}
                    className={`w-40 rounded-lg px-4 py-2 font-medium ${
                      isComplete
                        ? "bg-[#8B1C32] text-white"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
