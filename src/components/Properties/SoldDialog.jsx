import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import soldBanner from "@/assets/sold-banner.png";
import rentedBanner from "@/assets/rented-banner.png";

export const SoldDialog = ({ open, onOpenChange, isRented }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm text-center">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <img
              src={isRented ? rentedBanner : soldBanner}
              alt="Sold"
              className="w-48 h-48 object-contain"
            />
            <DialogTitle className="text-xl font-bold text-green-800">
              This Property is already {isRented ? "Rented" : "Sold"}..!
            </DialogTitle>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
