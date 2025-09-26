import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function FAQViewDialog({ open, onOpenChange, data }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">{data?.title || ""}</DialogTitle>
        </DialogHeader>

        <div className="">
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {data?.description || ""}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
