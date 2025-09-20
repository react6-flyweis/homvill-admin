import { useGetAllStates } from "@/queries/states";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const StateSelect = ({ value, onValueChange, className }) => {
  const { data, isLoading } = useGetAllStates();
  const states = data?.items || [];

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn("rounded w-full", className)}>
        <SelectValue placeholder={isLoading ? "Loading..." : "Select State"} />
      </SelectTrigger>
      <SelectContent>
        {states.map((s) => (
          <SelectItem key={s._id} value={s.state_name}>
            {s.state_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
