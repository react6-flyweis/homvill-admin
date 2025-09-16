import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function QueryRectifiedDialog({ open, onOpenChange, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between w-full">
            <h3 className="text-2xl font-semibold text-rose-600">
              Query Rectified...?
            </h3>
          </div>
        </DialogHeader>

        <div className="">
          <p className="text-gray-600 text-sm">
            Are your sure resolved this query..?
          </p>
        </div>

        <DialogFooter className="mt-4 flex gap-4 sm:justify-center">
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 w-36 rounded"
            onClick={() => onOpenChange(false)}
          >
            <span>No</span>
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 w-36 rounded"
            onClick={() => {
              onConfirm && onConfirm();
              onOpenChange(false);
            }}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QueryRectifiedDialog;
