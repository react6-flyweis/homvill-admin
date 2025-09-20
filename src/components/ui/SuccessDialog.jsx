import { useEffect, useState } from "react";
import checkedImage from "@/assets/checked.gif";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// SuccessDialog now manages its own visible state and auto-close timer.
export const SuccessDialog = ({
  open,
  message = "Success",
  onClose,
  autoCloseMs = 2000,
}) => {
  const [visible, setVisible] = useState(Boolean(open));

  useEffect(() => {
    let timer;
    if (open) {
      // open requested: show dialog and start auto-close timer
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, autoCloseMs);
    } else {
      // external prop turned false: ensure dialog hidden and clear timer
      setVisible(false);
    }

    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onClose]);

  const handleOpenChange = (val) => {
    // Dialog primitive reports open changes (e.g., user closes it). Keep internal state
    // in sync and notify parent via onClose.
    if (!val) {
      setVisible(false);
      if (onClose) onClose();
    }
  };

  return (
    <Dialog open={visible} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="sr-only">Success</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 px-4">
          <img
            src={checkedImage}
            alt="Success"
            className="max-w-40 max-h-40 h-full w-full"
          />
          <p className="text-primary font-medium text-lg text-center">
            {message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
