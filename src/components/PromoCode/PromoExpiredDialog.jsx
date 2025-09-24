import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Inline small delete dialog used only by PromoExpiredDialog
function InnerDeleteDialog({ open, onOpenChange, onConfirm }) {
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

// Inline small extend dialog used only by PromoExpiredDialog
function InnerExtendDialog({ open, onOpenChange, onExtend }) {
  const [selectedDate, setSelectedDate] = useState("");

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

export function PromoExpiredDialog({ open, onOpenChange, onExtend, onDelete }) {
  // internal nested dialog states
  const [showDelete, setShowDelete] = useState(false);
  const [showExtend, setShowExtend] = useState(false);

  return (
    <>
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
              Do you want to extend and keep using this promo code going
              forward?
            </DialogDescription>
          </div>

          <DialogFooter className="mt-4 flex gap-4 sm:justify-center">
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 w-36 rounded"
              onClick={() => {
                // open nested delete dialog
                setShowDelete(true);
              }}
            >
              <span>No</span>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 w-36 rounded"
              onClick={() => {
                // open nested extend dialog
                setShowExtend(true);
              }}
            >
              <span>Yes</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nested dialogs rendered alongside main dialog so they appear above */}
      <InnerDeleteDialog
        open={showDelete}
        onOpenChange={(v) => setShowDelete(!!v)}
        onConfirm={() => {
          onDelete && onDelete();
          // keep parent closed by caller if needed
        }}
      />

      <InnerExtendDialog
        open={showExtend}
        onOpenChange={(v) => setShowExtend(!!v)}
        onExtend={(date) => {
          onExtend && onExtend(date);
        }}
      />
    </>
  );
}
