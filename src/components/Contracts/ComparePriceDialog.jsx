import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Styled compare price dialog matching provided design image.
export function ComparePriceDialog({ open, onOpenChange, contract }) {
  if (!contract) return null;

  const sampleComparisons = [
    {
      ribbon: "COMPANY 1",
      company: "RISE Construction",
      price: "$45,000",
      contractor: "Botosh Ahmad",
      phone: "+1 8963 945 368",
    },
    {
      ribbon: "COMPANY 2",
      company: contract.company || "Steph Builder Works",
      price: contract.cost || "$31,500",
      contractor: contract.contractor || "Desirae Philips",
      phone: contract.phone || "+1 7768 359 524",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const suggestRandom = () => {
    const idx = Math.floor(Math.random() * sampleComparisons.length);
    setSelectedIndex(idx);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-h-[90vh] sm:max-w-xl">
        <DialogHeader className="text-primary">
          <div className="text-sm md:text-base">
            <span className="font-bold mr-2">CATEGORY :</span>
            <span className="font-bold text-lg">
              {contract.category || "PLUMBING CONTRACT"}
            </span>
          </div>
        </DialogHeader>

        <div className="relative mt-5">
          {/* left/right chevrons decorative */}
          {/* <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400">
            ◀
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400">
            ▶
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sampleComparisons.map((c, i) => {
              const isSelected = selectedIndex === i;
              const isDimmed = selectedIndex !== null && !isSelected;

              return (
                <div
                  key={i}
                  className={`relative rounded-xl border shadow-lg transition-transform duration-200 ${
                    isSelected
                      ? "bg-white ring-4 ring-green-300 scale-101"
                      : "bg-blue-50"
                  } ${isDimmed ? "opacity-40 grayscale filter" : ""}`}
                >
                  {/* ribbon */}
                  <div
                    className={`absolute -top-5 left-1/2 -translate-x-1/2 text-white px-3 p-2 rounded font-bold text-center shadow ${
                      isSelected ? "bg-green-600" : "bg-primary"
                    }`}
                  >
                    {c.ribbon}
                  </div>

                  <div className="pt-5 text-center p-3">
                    <div
                      className={`text-lg font-bold ${
                        isSelected ? "text-green-700" : "text-primary"
                      }`}
                    >
                      {c.company}
                    </div>

                    <div className="flex flex-col items-center text-center mt-2">
                      <div className="flex gap-1 items-center">
                        <div className="text-sm text-gray-500">Rate Range:</div>
                        <div className="font-semibold">{c.price}</div>
                      </div>

                      <div className="flex gap-1 items-center">
                        <div className="text-sm text-gray-500">
                          Contractor Name:
                        </div>
                        <div className="font-semibold">{c.contractor}</div>
                      </div>

                      <div className="flex gap-1 items-center">
                        <div className=" text-sm text-gray-500 text-nowrap">
                          Contact Number:
                        </div>
                        <div className=" font-medium text-nowrap">
                          {c.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedIndex !== null && (
            <div className="mt-8 text-center">
              <div className="text-sm text-gray-700">
                Since The Budget Amount Align With
              </div>
              <div className="mt-2 font-bold text-green-600 text-lg">
                {sampleComparisons[selectedIndex].company}
              </div>

              <div className="mt-4 font-semibold text-green-700">
                Best Option For This Contract Enquiry -{" "}
                {sampleComparisons[selectedIndex].company}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-2 sm:justify-center">
          {selectedIndex !== null ? (
            <Button
              onClick={() => {
                // For now, simply close the dialog to 'suggest' to the user.
                if (onOpenChange) onOpenChange(false);
              }}
              className="bg-green-500 hover:bg-green-400 rounded !shadow-xl font-semibold"
            >
              Suggest This To User
            </Button>
          ) : (
            <Button
              onClick={suggestRandom}
              className="bg-blue-500 hover:bg-blue-400 rounded !shadow-xl font-semibold"
            >
              Suggest Good Contractor
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
