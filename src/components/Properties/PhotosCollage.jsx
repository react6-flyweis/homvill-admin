import React from "react";
import { Button } from "@/components/ui/button";

// Single tile component handles click -> file input -> preview
function UploadTile({
  index,
  value,
  onChange,
  large = false,
  style = {},
  preview = false,
}) {
  const fileInputRef = React.useRef(null);

  const base =
    "relative overflow-hidden rounded border-2 border-dashed flex items-center justify-center text-center bg-white";
  const sizeClass = large ? "" : "h-36";
  const colorClass = value
    ? "border-transparent"
    : preview
    ? "border-transparent"
    : "border-primary text-primary";

  const handleClick = () => {
    if (preview) return;
    fileInputRef.current?.click();
  };

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(index, ev.target.result);
    };
    reader.readAsDataURL(f);
  };

  // if preview mode, don't expose the input or clickable behaviour
  const interactiveProps = preview
    ? {}
    : {
        onClick: handleClick,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => e.key === "Enter" && handleClick(),
        className: `${base} ${sizeClass} ${colorClass} cursor-pointer`,
      };

  const staticProps = preview
    ? { className: `${base} ${sizeClass} ${colorClass}` }
    : {};

  return (
    <div {...interactiveProps} style={style} {...staticProps}>
      {!preview && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      )}

      {value ? (
        <>
          <img
            src={value}
            alt={`photo-${index}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {!preview && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onChange(index, null);
              }}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-sm"
              aria-label={`Remove photo ${index + 1}`}
            >
              ✕
            </Button>
          )}
        </>
      ) : // show placeholder only when not in preview mode
      !preview ? (
        <div className="pointer-events-none">
          <div className={`${large ? "mb-2 text-3xl" : "mb-1 text-2xl"}`}>
            +
          </div>
          <div className={`${large ? "text-sm" : "text-xs"}`}>
            Upload new photo
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PhotosCollage({
  form,
  name = "photos",
  className = "",
  initialImages = [],
  preview = false,
}) {
  // Expect form to be the react-hook-form return value. If no form is
  // provided, manage an internal images array initialized from
  // `initialImages` (up to `max`).
  const max = 7;

  const formValues = (form ? form.watch(name) : []) || [];

  const [internalImages, setInternalImages] = React.useState(() => {
    const arr = Array.isArray(initialImages) ? [...initialImages] : [];
    while (arr.length < max) arr.push(null);
    return arr.slice(0, max);
  });

  const values = form ? formValues : internalImages;

  const set = (idx, val) => {
    if (form) {
      const current = Array.isArray(form.getValues(name))
        ? [...form.getValues(name)]
        : [];
      while (current.length < max) current.push(null);
      current[idx] = val;
      form.setValue(name, current, {
        shouldDirty: true,
        shouldValidate: false,
      });
      return;
    }
    const next = Array.isArray(values) ? [...values] : [];
    while (next.length < max) next.push(null);
    next[idx] = val;
    setInternalImages(next.slice(0, max));
  };

  const tiles = [
    { id: 0, gridColumn: "1 / 2", gridRow: "1 / 2" },
    { id: 1, gridColumn: "1 / 2", gridRow: "2 / 3" },
    { id: 2, gridColumn: "2 / 5", gridRow: "1 / 3", large: true },
    { id: 3, gridColumn: "5 / 6", gridRow: "1 / 2" },
    { id: 4, gridColumn: "6 / 7", gridRow: "1 / 2" },
    { id: 5, gridColumn: "5 / 6", gridRow: "2 / 3" },
    { id: 6, gridColumn: "6 / 7", gridRow: "2 / 3" },
  ];

  return (
    <div className={className}>
      <div
        className="w-full grid gap-4 relative"
        style={{
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gridAutoRows: "1fr",
        }}
      >
        {tiles.map((t) => (
          <UploadTile
            key={t.id}
            index={t.id}
            large={t.large}
            value={values[t.id] ?? null}
            onChange={set}
            preview={preview}
            style={{ gridColumn: t.gridColumn, gridRow: t.gridRow }}
          />
        ))}
      </div>
    </div>
  );
}
