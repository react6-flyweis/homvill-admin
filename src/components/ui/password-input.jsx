import React, { forwardRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const PasswordInput = forwardRef(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(showToggle && "pr-16", className)}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <Button
            type="button"
            variant="link"
            className="text-primary absolute top-0 right-0 h-full px-3 py-2 text-sm font-medium hover:no-underline"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
