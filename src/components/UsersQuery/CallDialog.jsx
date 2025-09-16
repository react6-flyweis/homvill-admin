import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CallDialog({ open, onOpenChange, contact }) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!p-0 bg-transparent border-0 shadow-none flex items-center justify-center sm:max-w-xs"
        showCloseButton={false}
      >
        <div className="w-full max-w-md mx-auto my-10 px-6 py-6 rounded-2xl bg-blue-700 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">Calling to</h3>
          <div className="flex justify-center">
            <p className="text-base mb-2 opacity-90">Contact :</p>
            <p className="font-medium tracking-wide">{contact}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
