import { Reply } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function PageLayout({ title, description, children, onBack }) {
  const navigate = useNavigate();
  const handleBack = typeof onBack === "function" ? onBack : () => navigate(-1);

  return (
    <div className="space-y-6">
      <div className="">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <Reply className="size-6" />
          </Button>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {description && <p className="text-sm">{description}</p>}
      </div>

      {children}
    </div>
  );
}
