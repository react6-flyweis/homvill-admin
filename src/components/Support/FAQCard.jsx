import { Edit3, Trash2 } from "lucide-react";

export function FAQCard({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white border rounded-md p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold">{data.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{data.description}</p>
        </div>

        <div className="flex items-start gap-2 ml-4">
          <button
            className="text-gray-500 hover:text-primary"
            onClick={() => onEdit && onEdit(data)}
            title="Edit"
          >
            <Edit3 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete && onDelete(data.id)}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
