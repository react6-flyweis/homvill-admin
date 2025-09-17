import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export function TermsCard({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow border p-4 flex flex-col gap-2">
      {/* Header with Title + Icons */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800">{data.title}</h3>
        <div className="flex gap-3">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onEdit && onEdit(data)}
            aria-label={`Edit ${data.title}`}
          >
            <Pencil size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete && onDelete(data.id)}
            aria-label={`Delete ${data.title}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 whitespace-pre-line">
        {data.description}
      </p>
    </div>
  );
}
