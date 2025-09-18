import { Reply } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function PageLayout({ title, description, children, onBack, action }) {
  const navigate = useNavigate();
  const handleBack = typeof onBack === "function" ? onBack : () => navigate(-1);

  return (
    <div className="space-y-6 h-full">
      <div>
        <div className="flex items-center  gap-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <Reply className="size-6" />
            </Button>
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>

          {/* Action slot: accepts a React node. If `action` is provided as a node, render it. */}
          <div>{action && typeof action !== "boolean" ? action : null}</div>
        </div>

        {description && <p className="text-sm">{description}</p>}
      </div>

      {children}
    </div>
  );
}
