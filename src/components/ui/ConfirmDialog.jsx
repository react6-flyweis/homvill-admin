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

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "destructive",
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between w-full">
            <DialogTitle className="text-2xl font-semibold text-[#8A1538]">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-2">
          <DialogDescription className="text-gray-600 text-sm">
            {description}
          </DialogDescription>
        </div>

        <DialogFooter className="mt-4 flex gap-4 sm:justify-center">
          <Button
            variant="outline"
            className="w-36 rounded"
            onClick={() => {
              onCancel && onCancel();
              onOpenChange && onOpenChange(false);
            }}
          >
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            className={
              "w-36 rounded " +
              (confirmVariant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : "")
            }
            onClick={() => {
              onConfirm && onConfirm();
              onOpenChange && onOpenChange(false);
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
