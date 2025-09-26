import { cn } from "@/lib/utils";
import React from "react";

export function RootFormErrors({ errors, className }) {
  if (!errors) return null;

  // Normalize to array
  const items = Array.isArray(errors) ? errors : [errors];

  return (
    <div className={cn("w-full mb-4", className)}>
      <div className="bg-[#FFEDED] border border-[#F5C6C6] text-primary p-3 rounded">
        <ul className="list-inside text-sm">
          {items.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
