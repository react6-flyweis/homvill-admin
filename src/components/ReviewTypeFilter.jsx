import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllReviewTypes } from "@/queries/reviews";

export const ReviewTypeFilter = ({ reviewTypeFilter, setReviewTypeFilter }) => {
  const { data: apiData, isLoading } = useGetAllReviewTypes();
  const types = apiData?.items?.length
    ? apiData.items.map((t) => ({
        id: t.Reviews_type_id?.toString() ?? t._id,
        name: t.Reviews_type_name,
      }))
    : [];

  const value =
    reviewTypeFilter && reviewTypeFilter !== "ALL" ? reviewTypeFilter : "ALL";

  return (
    <div className="flex items-center space-x-3">
      <Select
        value={value}
        onValueChange={(v) => setReviewTypeFilter(v || "ALL")}
      >
        <SelectTrigger className="border rounded-md px-3 py-2 text-sm shadow-sm">
          <SelectValue>
            {value === "ALL" ? "All review types" : value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px]">
          <SelectItem value="ALL">All review types</SelectItem>
          {isLoading ? (
            <SelectItem value="__loading" disabled>
              Loading...
            </SelectItem>
          ) : types.length ? (
            types.map((t) => (
              <SelectItem key={t.id} value={t.name}>
                {t.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="__no-types" disabled>
              No review types
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
