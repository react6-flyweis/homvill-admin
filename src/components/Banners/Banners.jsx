import { useState } from "react";
import { Plus } from "lucide-react"; // for icons
import { BannerCard } from "./BannerCard";
import { BannerEditor } from "./BannerEditor";

import { useNavigate } from "react-router-dom";
import { useGetAllBanners } from "@/queries/banner";

export default function Banners() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  // fetch banners from API
  const { data: bannersPayload = { items: [], count: 0 }, isLoading } =
    useGetAllBanners();

  const handleSaveBanner = (values) => {
    console.log("Saving banner with values:", values);
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
        {isLoading ? (
          // show skeleton placeholders while loading
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-xl p-4 h-48 flex flex-col justify-between"
            >
              <div className="bg-gray-200 rounded-md h-28 w-full mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : (
          <>
            {(bannersPayload.items || []).map((b, idx) => {
              // map API banner shape to BannerCard expected shape
              const mapped = {
                id: b._id || b.Banners_id || idx,
                category: b.Catetory_id || b.category || "",
                headline: b.headline || b.Headline || "",
                // construct image url if banner_image is provided, else fallback to sample
                image: b.banner_image
                  ? (import.meta.env.VITE_API_BASE || "") +
                    "/uploads/" +
                    b.banner_image
                  : sampleImages[idx % sampleImages.length],
                raw: b,
              };

              return <BannerCard key={mapped.id} banner={mapped} />;
            })}

            {/* Upload new banner card */}
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center border-2 border-dashed border-[#8A1538] rounded-xl "
            >
              <div className="flex flex-col items-center text-[#8B1C32]">
                <Plus size={24} />
                <span className="mt-1 text-sm font-medium">
                  Upload new banner
                </span>
              </div>
            </button>
          </>
        )}
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
