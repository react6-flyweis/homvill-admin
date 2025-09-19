import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoadingButton({ isLoading, children, ...props }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
}
