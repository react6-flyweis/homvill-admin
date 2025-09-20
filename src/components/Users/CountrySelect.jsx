import { useGetAllCountries } from "@/queries/countries";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const CountrySelect = ({ value, onValueChange, className }) => {
  const { data, isLoading } = useGetAllCountries();
  const countries = data?.items || [];

  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn("rounded w-full", className)}>
        <SelectValue
          placeholder={isLoading ? "Loading..." : "Select Country"}
        />
      </SelectTrigger>
      <SelectContent>
        {countries.map((c) => (
          <SelectItem key={c._id} value={c.Country_name}>
            {c.Country_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
