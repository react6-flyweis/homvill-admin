"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

// value: string in ISO format (YYYY-MM-DD) or empty
export function DatePicker({ value, onChange, id = "date" }) {
  const [open, setOpen] = React.useState(false);

  // parse incoming value into Date
  const parse = React.useCallback((v) => {
    if (!v) return undefined;
    const d = new Date(v);
    return isValidDate(d) ? d : undefined;
  }, []);

  const initialDate = parse(value);

  const [date, setDate] = React.useState(initialDate);
  const [month, setMonth] = React.useState(initialDate);
  const [display, setDisplay] = React.useState(formatDate(initialDate));

  // sync when external value changes
  React.useEffect(() => {
    const d = parse(value);
    setDate(d);
    setMonth(d);
    setDisplay(formatDate(d));
  }, [value, parse]);

  // helper to create ISO yyyy-mm-dd
  const toIso = (d) => {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  };

  return (
    <div className="relative flex gap-2">
      <Input
        id={id}
        value={display}
        placeholder="Select date"
        className="bg-background pr-10"
        onChange={(e) => {
          const v = e.target.value;
          setDisplay(v);
          const parsed = new Date(v);
          if (isValidDate(parsed)) {
            setDate(parsed);
            setMonth(parsed);
            onChange && onChange(toIso(parsed));
          } else {
            // don't call onChange for invalid inputs, allow clearing
            if (v === "") {
              setDate(undefined);
              setMonth(undefined);
              onChange && onChange("");
            }
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${id}-picker`}
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(d) => {
              setDate(d);
              setDisplay(formatDate(d));
              setOpen(false);
              onChange && onChange(toIso(d));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
