import React from "react";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const contractCategories = [
  "Electrical Contract",
  "Plumbing Contract",
  "HVAC Contract",
  "Roofing Contract",
  "Carpentry Contract",
  "Painting Contract",
  "Masonry Contract",
  "Landscaping Contract",
  "Maintenance Contract",
];

export const ContractCategoryFilter = ({
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-primary border-2"
          >
            <FiFilter size={18} className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[220px] p-3">
          {contractCategories.map((c) => (
            <DropdownMenuItem
              key={c}
              onSelect={() =>
                setCategoryFilter((prev) => (prev === c ? "ALL" : c))
              }
              className={`w-full rounded-md my-1 px-4 py-3 text-left border ${
                categoryFilter === c
                  ? "bg-pink-200 text-pink-800 border-pink-300"
                  : "bg-pink-50 text-pink-700 border-pink-100"
              }`}
            >
              {c}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active filter pill shown when a category is selected */}
      {categoryFilter && categoryFilter !== "ALL" && (
        <>
          <div className="flex items-center space-x-2 bg-primary text-white rounded-full px-3 py-1">
            <span className="text-sm font-medium">{categoryFilter}</span>
          </div>
          <button
            aria-label="Clear category filter"
            onClick={() => setCategoryFilter("ALL")}
            className="w-5 h-5 rounded-full bg-gray-400 text-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center"
            title="Clear filter"
          >
            <IoClose size={14} />
          </button>
        </>
      )}
    </div>
  );
};
