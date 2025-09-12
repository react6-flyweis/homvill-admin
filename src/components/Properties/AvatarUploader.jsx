import React from "react";
import { Button } from "@/components/ui/button";
import { PencilLine, X } from "lucide-react";

export function AvatarUploader({ form, name = "avatar", size = 24 }) {
  const inputRef = React.useRef(null);

  const value = form ? form.watch(name) : null;

  const open = (e) => {
    e?.stopPropagation();
    inputRef.current?.click();
  };

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      form.setValue(name, ev.target.result, { shouldDirty: true });
    };
    reader.readAsDataURL(f);
  };

  const remove = (e) => {
    e.stopPropagation();
    form.setValue(name, null, { shouldDirty: true });
  };

  // Allow size to be a tailwind class string like "w-24 h-24" or a number (24 -> w-24 h-24)
  const sizeClass = typeof size === "string" ? size : `w-${size} h-${size}`;

  return (
    <div className={`relative inline-block group`}>
      <div
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && open()}
        className={`${sizeClass} rounded-full shadow overflow-hidden flex-shrink-0 cursor-pointer flex items-center justify-center`}
      >
        {value ? (
          <img
            src={value}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-600 flex items-center justify-center" />
        )}
      </div>

      {/* Hover overlay with centered text (appears on hover) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="absolute inset-0 bg-black/0 group-hover:bg-black/60 text-white flex items-center justify-center rounded-full transition-colors duration-200 z-10 pointer-events-none group-hover:pointer-events-auto"
        aria-hidden="true"
      >
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-3">
          <div className="text-sm font-semibold">Upload photo</div>
        </div>
      </div>

      {/* Edit button - always visible, above overlay (shadcn Button + lucide icon) */}
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="absolute -bottom-1 -right-1  z-20 shadow-lg rounded-full"
        size="icon"
        aria-label="Edit avatar"
      >
        <PencilLine className="w-4 h-4" />
      </Button>

      {/* Remove button - small x shown when value exists */}
      {value && (
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            remove(e);
          }}
          className="absolute -top-1 -right-1 bg-white text-gray-700 z-20 shadow rounded-full"
          size="icon"
          variant="ghost"
          aria-label="Remove avatar"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
    </div>
  );
}
