import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export function TermsCard({ data, onEdit, onDelete, onView }) {
  // Prevent clicks on the icon buttons from triggering the card's onClick
  const stop = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2 cursor-pointer"
      onClick={() => onView && onView(data)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onView && onView(data);
      }}
    >
      {/* Header with Title + Icons */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{data.title}</h3>
        <div className="flex gap-3">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              stop(e);
              onEdit && onEdit(data);
            }}
            aria-label={`Edit ${data.title}`}
          >
            <Pencil size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              stop(e);
              onDelete && onDelete(data.id);
            }}
            aria-label={`Delete ${data.title}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-4">
        {data.description}
      </p>
    </div>
  );
}
