
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartType, ChartConfig } from "@/types/dashboard";

interface GeneralSettingsTabProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const GeneralSettingsTab = ({ chartConfig, onUpdateConfig }: GeneralSettingsTabProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="chart-title" className="text-right">
          Title
        </Label>
        <Input
          id="chart-title"
          value={chartConfig.title || ""}
          onChange={(e) => onUpdateConfig({ title: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="chart-type" className="text-right">
          Chart Type
        </Label>
        <Select 
          value={chartConfig.type} 
          onValueChange={(value) => onUpdateConfig({ type: value as ChartType })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
            <SelectItem value="scatter">Scatter Plot</SelectItem>
            <SelectItem value="donut">Donut Chart</SelectItem>
            <SelectItem value="card">Card/Metric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="chart-description" className="text-right">
          Description
        </Label>
        <Input
          id="chart-description"
          value={chartConfig.description || ""}
          onChange={(e) => onUpdateConfig({ description: e.target.value })}
          className="col-span-3"
          placeholder="Optional description"
        />
      </div>
    </div>
  );
};

export default GeneralSettingsTab;
