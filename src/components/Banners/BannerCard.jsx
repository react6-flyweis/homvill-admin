import { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { BannerEditor } from "./BannerEditor";

export function BannerCard({ banner }) {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl  relative">
      {/* Image */}
      <img
        src={banner.image}
        alt={banner.headline}
        className="w-full p-1 rounded-xl h-40 object-cover"
      />

      {/* Edit/Delete icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => setOpenEdit(true)}
          className="bg-white rounded-full p-1 shadow"
        >
          <Pencil size={16} className="text-gray-600" />
        </button>

        <button className="bg-white rounded-full p-1 shadow">
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>

      {/* Title */}
      <div className=" p-3">
        <span className=" bg-primary text-white text-[14px] font-semibold px-3 py-2 rounded">
          {banner.category}
        </span>
        <h2 className="text-[15px] pt-2 text-[#1D1D1D] font-medium">
          {banner.title}
        </h2>
      </div>

      {openEdit && (
        <BannerEditor
          open={openEdit}
          onOpenChange={setOpenEdit}
          initialValues={banner}
        />
      )}
    </div>
  );
}
