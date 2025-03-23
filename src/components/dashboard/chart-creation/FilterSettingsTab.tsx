
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartConfig } from "@/types/dashboard";

interface FilterSettingsTabProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const FilterSettingsTab = ({ chartConfig, onUpdateConfig }: FilterSettingsTabProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="filter-field" className="text-right">
          Filter Field
        </Label>
        <Input
          id="filter-field"
          value={chartConfig.filterField || ""}
          onChange={(e) => onUpdateConfig({ filterField: e.target.value })}
          className="col-span-3"
          placeholder="Column name to filter by"
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="filter-operator" className="text-right">
          Filter Operator
        </Label>
        <Select
          value={chartConfig.filterOperator || "equals"}
          onValueChange={(value) => onUpdateConfig({ filterOperator: value })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select filter operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="not-equals">Not Equals</SelectItem>
            <SelectItem value="greater-than">Greater Than</SelectItem>
            <SelectItem value="less-than">Less Than</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="filter-value" className="text-right">
          Filter Value
        </Label>
        <Input
          id="filter-value"
          value={chartConfig.filterValue || ""}
          onChange={(e) => onUpdateConfig({ filterValue: e.target.value })}
          className="col-span-3"
          placeholder="Value to filter by"
        />
      </div>
    </div>
  );
};

export default FilterSettingsTab;
