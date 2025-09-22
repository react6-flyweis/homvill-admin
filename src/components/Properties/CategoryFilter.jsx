import React from "react";
import { FiFilter } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useGetAllCategories } from "@/queries/categories";

export const CategoryFilter = ({ categoryFilter, setCategoryFilter }) => {
  const { data: apiData, isLoading } = useGetAllCategories();
  const categories = apiData?.items?.length
    ? apiData.items.map((c) => c.name)
    : [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FiFilter size={18} className="text-[#800020]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[200px] p-3">
        {categories.map((c) => (
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
  );
};
