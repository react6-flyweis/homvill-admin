import { Edit3, Trash2 } from "lucide-react";

export function FAQCard({ data, onEdit, onDelete, onView }) {
  // stop event propagation for icon clicks so the card's onClick doesn't fire
  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="bg-white border rounded-md p-4 shadow-sm mb-4 cursor-pointer"
      onClick={() => onView && onView(data)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onView && onView(data);
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold">{data.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{data.description}</p>
        </div>

        <div className="flex items-start gap-2 ml-4">
          <button
            className="text-gray-500 hover:text-primary"
            onClick={(e) => {
              stop(e);
              onEdit && onEdit(data);
            }}
            title="Edit"
            aria-label={`Edit ${data.title}`}
          >
            <Edit3 size={16} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              stop(e);
              onDelete && onDelete(data.id);
            }}
            title="Delete"
            aria-label={`Delete ${data.title}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
