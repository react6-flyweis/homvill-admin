import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DateRangeField({ value, onChange, className }) {
  const [date, setDate] = useState(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  function handleSelect(range) {
    setDate(range);
    onChange(range);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          data-empty={!date}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon />
          {date && date.from && date.to ? (
            <span className="text-xs">
              {format(date.from, "P") + " - " + format(date.to, "P")}
            </span>
          ) : date && date.from ? (
            <span className="text-xs">{format(date.from, "P")}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="range" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
