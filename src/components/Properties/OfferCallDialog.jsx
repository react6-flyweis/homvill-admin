import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export function OfferCallDialog({ open, onOpenChange, offer }) {
  if (!offer) return null;

  const phoneRaw = offer.phone ? String(offer.phone) : "";
  const phoneTel = phoneRaw.replace(/\s+/g, "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-3 sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center  font-semibold text-primary">
            Call And Enquiry..?
          </DialogTitle>
        </DialogHeader>

        <div className="border-t" />

        <div className="">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Name:</span>
            <span className="font-semibold text-gray-900">
              {offer.raisedBy || "—"}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Contact:</span>
            {phoneTel ? (
              <a
                className="font-semibold text-indigo-800"
                href={`tel:${phoneTel}`}
                onClick={(e) => {
                  /* allow default behavior; Phone dialer will open on supported devices */
                }}
              >
                {phoneRaw}
              </a>
            ) : (
              <span className="font-semibold text-gray-700">—</span>
            )}
          </div>

          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400">Property ID:</span>
            <span className="font-semibold text-gray-900">
              {offer.propertyId || "—"}
            </span>
          </div>

          <div className="mt-6">
            <Button
              asChild
              className="w-full rounded-md bg-violet-200 hover:bg-violet-300 text-violet-900 shadow-sm"
            >
              <a
                href={`tel:${phoneTel}`}
                className="block w-full text-center py-3"
              >
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
