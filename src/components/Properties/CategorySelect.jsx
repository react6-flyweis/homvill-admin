import React from "react";
import { useGetAllCategories } from "@/queries/categories";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CategorySelect = ({ value, onValueChange, className }) => {
  const { data, isLoading } = useGetAllCategories();
  const categories = data?.items || [];

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn("rounded w-full", className)}>
        <SelectValue
          placeholder={isLoading ? "Loading..." : "Select Category"}
        />
      </SelectTrigger>
      <SelectContent>
        {categories.map((c) => (
          <SelectItem key={c._id || c.name} value={c.name}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
