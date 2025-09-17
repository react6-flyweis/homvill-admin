import React from "react";
import { UploadIcon } from "lucide-react";
import { photoUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const mockMedia = [
  { id: "1", name: "Image 1", src: photoUrl("fore1", 400, 300) },
  { id: "2", name: "Image 2", src: photoUrl("fore2", 400, 300) },
  { id: "3", name: "Image 3", src: photoUrl("fore3", 400, 300) },
  { id: "4", name: "Image 4", src: photoUrl("fore4", 400, 300) },
];

export function MediaSelector({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(mockMedia);
  const [selected, setSelected] = React.useState(value || null);

  const onSelect = (item) => {
    setSelected(item);
  };

  const confirmSelect = () => {
    if (selected) onChange?.(selected);
    setOpen(false);
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newItem = { id: String(Date.now()), name: file.name, src: url };
    setItems((s) => [newItem, ...s]);
    setSelected(newItem);
    // don't auto-close on upload; user can confirm
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="rounded h-9 border w-full flex justify-between items-center px-3 cursor-pointer">
            <span className="text-sm">{value?.name ?? "Select Media"}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded bg-gray-200 h-7"
            >
              <span className="text-xs">{value ? value.name : "Upload"}</span>
              <UploadIcon className="ml-2" />
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent side="bottom" className="w-[480px] p-4 bg-gray-200">
          {/* Header: title left, Close right */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-primary">
              Select From Media
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-gray-600"
            >
              Close
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-400 mb-6" />

          {/* Media grid: larger rounded tiles with centered label like image */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {items.slice(0, 4).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m)}
                className={`flex items-center justify-center rounded h-20 bg-gray-400 border ${
                  selected?.id === m.id
                    ? "border-primary shadow"
                    : "border-transparent"
                }`}
              >
                {/* Show label centered, no small thumbnail */}
                <div className="text-base text-gray-700">{m.name}</div>
              </button>
            ))}
          </div>

          {/* Divider line */}
          <div className="h-px bg-gray-400 mb-4" />

          {/* Bottom actions: select button bottom-right */}
          <div className="flex justify-end">
            <Button
              type="button"
              variant="default"
              className="bg-[#901733] hover:bg-[#7a1329] text-white rounded-lg px-6 py-3"
              onClick={confirmSelect}
            >
              Select Media
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
