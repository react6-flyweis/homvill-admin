import React from "react";
import marker from "@/assets/icons/marker.svg";

/**
 * Lightweight ListedStates map component.
 * Uses an OpenStreetMap embed iframe with a marker so no new dependencies are required.
 * Props:
 *  - title: string (optional)
 *  - lat: number (default 23.0)
 *  - lon: number (default 79.0)
 *  - zoom: number (default 5)
 */
const ListedStates = ({
  title = "All Listed States",
  lat = 23.0,
  lon = 79.0,
  zoom = 5,
}) => {
  // Build a simple bbox around the center so the embed shows a reasonable area.
  // This is a naive bbox calculation that works well for small zoom values.
  const delta = Math.max(0.5, 2 / Math.max(1, zoom));
  const minLon = lon - delta;
  const minLat = lat - delta;
  const maxLon = lon + delta;
  const maxLat = lat + delta;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}&zoom=${zoom}`;

  return (
    <div className="flex-1 bg-white rounded-xl overflow-hidden mt-14 shadow h-[287.2px] relative">
      <div className="absolute top-3 left-3 text-white font-semibold text-lg z-10">
        {title}
      </div>
      <iframe
        title={title}
        src={src}
        className="w-full h-full border-0"
        loading="lazy"
        aria-label={title}
      />
    </div>
  );
};

export default ListedStates;
