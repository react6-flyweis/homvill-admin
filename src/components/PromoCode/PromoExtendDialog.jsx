import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PromoExtendDialog({ open, onOpenChange, onExtend }) {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!open) setSelectedDate("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between w-full">
            <DialogTitle className="text-2xl font-semibold text-[#8A1538]">
              Promo Code Expired...!!!
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-2">
          <DialogDescription className="text-gray-600 text-sm">
            Select the end date until which this should remain active.
          </DialogDescription>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-2 p-2 border rounded w-full block"
          />
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="bg-[#8A1538] text-white rounded w-full"
            onClick={() => {
              if (selectedDate) {
                onExtend && onExtend(selectedDate);
                onOpenChange(false);
              }
            }}
            disabled={!selectedDate}
          >
            Extend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
