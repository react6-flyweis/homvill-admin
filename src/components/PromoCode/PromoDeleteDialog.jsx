import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PromoDeleteDialog({ open, onOpenChange, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between w-full">
            <DialogTitle className="text-2xl font-semibold text-[#8A1538]">
              Promo Code Expired...!!!
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-2">
          <DialogDescription className="text-gray-600 text-sm">
            Delete this code permanently? Once deleted, it cannot be recovered.
          </DialogDescription>
        </div>

        <DialogFooter className="mt-4 flex gap-4 sm:justify-center">
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 w-36 rounded"
            onClick={() => {
              onConfirm && onConfirm();
              onOpenChange(false);
            }}
          >
            <span>Delete Forever</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
