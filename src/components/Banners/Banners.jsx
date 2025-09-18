import { useState } from "react";
import { Plus } from "lucide-react"; // for icons
import { BannerCard } from "./BannerCard";
import { BannerEditor } from "./BannerEditor";

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
    headline: "How to Find a Foreclosure",
    image: fore1,
  },
  {
    id: 2,
    category: "Financing",
    headline: "HUD's Pre-Foreclosure Sales Program",
    image: fore2,
  },
  {
    id: 3,
    category: "Financing",
    headline: "What Are the Types of Foreclosure?",
    image: fore3,
  },
  {
    id: 4,
    category: "Buying",
    headline: "Overview of Buying a Foreclosure",
    image: fore4,
  },
  {
    id: 5,
    category: "Buying",
    headline: "Buying a Pre-Foreclosure Property",
    image: fore5,
  },
  {
    id: 6,
    category: "Buying",
    headline: "Buying a Home at a Foreclosure Auction",
    image: fore6,
  },
  {
    id: 7,
    category: "Buying",
    headline: "Buying a Foreclosure Contract",
    image: fore7,
  },
  {
    id: 8,
    category: "Buying",
    headline: "Foreclosure Financing",
    image: fore8,
  },
];

export default function Banners() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // banners are static sample data in this component. When the editor saves a new
  // banner, we just push it into local state for demo purposes.
  const [items, setItems] = useState(bannersData);

  const handleSaveBanner = (values) => {
    const next = {
      id: items.length + 1,
      category: values.category || "",
      headline: values.headline || "",
      image: undefined,
    };
    setItems((s) => [next, ...s]);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-bold">Banners</h1>
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
      <button className="bg-primary text-white px-4 py-2 rounded-bl-2xl rounded-tr-2xl mb-4">
        Foreclosures
      </button>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}

        {/* Upload new banner card */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center border-2 border-dashed border-[#8A1538] rounded-xl "
        >
          <div className="flex flex-col items-center text-[#8B1C32]">
            <Plus size={24} />
            <span className="mt-1 text-sm font-medium">Upload new banner</span>
          </div>
        </button>
      </div>
      <BannerEditor
        open={open}
        onOpenChange={setOpen}
        onSave={(values) => {
          handleSaveBanner(values);
        }}
      />
    </div>
  );
}
