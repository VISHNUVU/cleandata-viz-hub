
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartConfig } from "@/types/dashboard";
import { CHART_COLORS } from "../charts/ChartUtils";

interface StyleSettingsTabProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const StyleSettingsTab = ({ chartConfig, onUpdateConfig }: StyleSettingsTabProps) => {
  return (
    <div className="grid gap-4 py-4">
      {chartConfig.type === 'card' ? (
        <CardStyleSettings chartConfig={chartConfig} onUpdateConfig={onUpdateConfig} />
      ) : (
        <ChartStyleSettings chartConfig={chartConfig} onUpdateConfig={onUpdateConfig} />
      )}
    </div>
  );
};

interface StyleSettingsComponentProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const CardStyleSettings = ({ chartConfig, onUpdateConfig }: StyleSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="prefix" className="text-right">
          Prefix
        </Label>
        <Input
          id="prefix"
          value={chartConfig.prefix || ""}
          onChange={(e) => onUpdateConfig({ prefix: e.target.value })}
          className="col-span-3"
          placeholder="e.g. $, €, £"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="suffix" className="text-right">
          Suffix
        </Label>
        <Input
          id="suffix"
          value={chartConfig.suffix || ""}
          onChange={(e) => onUpdateConfig({ suffix: e.target.value })}
          className="col-span-3"
          placeholder="e.g. %, pts"
        />
      </div>
    </>
  );
};

const ChartStyleSettings = ({ chartConfig, onUpdateConfig }: StyleSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right pt-2">
          Color Scheme
        </Label>
        <div className="col-span-3 grid grid-cols-5 gap-2">
          {CHART_COLORS.map((color, index) => (
            <button
              key={index}
              type="button"
              className={`h-8 w-8 rounded-full border-2 ${chartConfig.colorScheme === index ? 'border-gray-900 dark:border-white' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
              onClick={() => onUpdateConfig({ colorScheme: index })}
              aria-label={`Color ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {(chartConfig.type === 'line' || chartConfig.type === 'area') && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="curve-type" className="text-right">
            Curve Type
          </Label>
          <Select
            value={chartConfig.curveType || "linear"}
            onValueChange={(value) => onUpdateConfig({ curveType: value })}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select curve type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="natural">Natural</SelectItem>
              <SelectItem value="monotone">Monotone</SelectItem>
              <SelectItem value="step">Step</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="show-grid" className="text-right">
          Grid Lines
        </Label>
        <Select
          value={chartConfig.showGrid?.toString() || "true"}
          onValueChange={(value) => onUpdateConfig({ showGrid: value === "true" })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Grid lines visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Show Grid Lines</SelectItem>
            <SelectItem value="false">Hide Grid Lines</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default StyleSettingsTab;
