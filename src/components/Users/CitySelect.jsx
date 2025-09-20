import { useGetAllCities } from "@/queries/cities";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CitySelect = ({ value, onValueChange, className }) => {
  const { data, isLoading } = useGetAllCities();
  const cities = data?.items || [];

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn("rounded w-full", className)}>
        <SelectValue placeholder={isLoading ? "Loading..." : "Select City"} />
      </SelectTrigger>
      <SelectContent>
        {cities.map((c) => (
          <SelectItem key={c._id} value={c.City_name}>
            {c.City_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
