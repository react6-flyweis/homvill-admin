import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  useDeletePromoCode,
  useExtendPromoExpiry,
} from "@/mutations/promoCode";
import { toast } from "sonner";

// Inline small delete dialog used only by PromoExpiredDialog
function InnerDeleteDialog({ open, onOpenChange, onConfirm, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-start justify-between w-full">
            <DialogTitle className="text-2xl font-semibold text-primary">
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
          <LoadingButton
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 w-36 rounded"
            onClick={() => {
              onConfirm && onConfirm();
              // Don't close dialog optimistically - let parent handle closing on success
            }}
            isLoading={loading}
          >
            Delete Forever
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Inline small extend dialog used only by PromoExpiredDialog
function InnerExtendDialog({ open, onOpenChange, onExtend, loading }) {
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
          <LoadingButton
            className="bg-[#8A1538] text-white rounded w-full"
            onClick={() => {
              if (selectedDate) {
                onExtend && onExtend(selectedDate);
                // Don't close dialog optimistically - let parent handle closing on success
              }
            }}
            disabled={!selectedDate}
            isLoading={loading}
          >
            Extend
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PromoExpiredDialog({
  open,
  onOpenChange,
  onExtend,
  onDelete,
  promoId,
}) {
  // internal nested dialog states
  const [showDelete, setShowDelete] = useState(false);
  const [showExtend, setShowExtend] = useState(false);

  // mutations
  const deleteMutation = useDeletePromoCode();
  const extendMutation = useExtendPromoExpiry();

  const handleDelete = async () => {
    if (!promoId) return;

    try {
      await deleteMutation.mutateAsync(promoId);
      toast.success("Promo code deleted successfully");
      // close nested delete dialog first
      setShowDelete(false);
      // close all dialogs and notify parent
      onDelete && onDelete();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete promo code";
      toast.error(errorMessage);
      console.error("Delete promo code error:", error);
    }
  };

  const handleExtend = async (date) => {
    if (!promoId || !date) return;

    try {
      // API expects newEndDate and newEndTime (time provided separately)
      await extendMutation.mutateAsync({
        id: promoId,
        newEndDate: date,
        newEndTime: "00:00",
      });
      toast.success("Promo code extended successfully");
      // close nested extend dialog first
      setShowExtend(false);
      onExtend && onExtend();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to extend promo code";
      toast.error(errorMessage);
      console.error("Extend promo code error:", error);
    }
  };

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
            <LoadingButton
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 w-36 rounded"
              onClick={() => {
                // open nested delete dialog
                setShowDelete(true);
              }}
              isLoading={deleteMutation.isPending}
            >
              No
            </LoadingButton>
            <LoadingButton
              className="bg-green-600 hover:bg-green-700 w-36 rounded"
              onClick={() => {
                // open nested extend dialog
                setShowExtend(true);
              }}
              isLoading={extendMutation.isPending}
            >
              Yes
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nested dialogs rendered alongside main dialog so they appear above */}
      <InnerDeleteDialog
        open={showDelete}
        onOpenChange={(v) => setShowDelete(!!v)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />

      <InnerExtendDialog
        open={showExtend}
        onOpenChange={(v) => setShowExtend(!!v)}
        onExtend={handleExtend}
        loading={extendMutation.isPending}
      />
    </>
  );
}
