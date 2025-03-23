
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartConfig } from "@/types/dashboard";
import { UploadedFile } from "@/types/file";
import DataSourceSelector from "@/components/dashboard/DataSourceSelector";

interface DataSettingsTabProps {
  chartConfig: Partial<ChartConfig>;
  dataSources: UploadedFile[];
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const DataSettingsTab = ({ chartConfig, dataSources, onUpdateConfig }: DataSettingsTabProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="data-source" className="text-right">
          Data Source
        </Label>
        <div className="col-span-3">
          <DataSourceSelector
            dataSources={dataSources}
            selectedSource={chartConfig.dataSource || ""}
            onSelectSource={(sourceId) => onUpdateConfig({ dataSource: sourceId })}
          />
        </div>
      </div>
      
      {chartConfig.type === 'card' ? (
        <CardDataSettings chartConfig={chartConfig} onUpdateConfig={onUpdateConfig} />
      ) : (
        <ChartDataSettings chartConfig={chartConfig} onUpdateConfig={onUpdateConfig} />
      )}
    </div>
  );
};

interface DataSettingsComponentProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const CardDataSettings = ({ chartConfig, onUpdateConfig }: DataSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="card-metric" className="text-right">
          Metric Field
        </Label>
        <Input
          id="card-metric"
          value={chartConfig.y || ""}
          onChange={(e) => onUpdateConfig({ y: e.target.value })}
          className="col-span-3"
          placeholder="Column name for metric value"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="aggregation" className="text-right">
          Aggregation
        </Label>
        <Select 
          value={chartConfig.aggregation} 
          onValueChange={(value) => onUpdateConfig({ 
            aggregation: value as "sum" | "average" | "count" | "max" | "min" 
          })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select aggregation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sum">Sum</SelectItem>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="count">Count</SelectItem>
            <SelectItem value="max">Maximum</SelectItem>
            <SelectItem value="min">Minimum</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

const ChartDataSettings = ({ chartConfig, onUpdateConfig }: DataSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="x-axis" className="text-right">
          X-Axis Field
        </Label>
        <Input
          id="x-axis"
          value={chartConfig.x || ""}
          onChange={(e) => onUpdateConfig({ x: e.target.value })}
          className="col-span-3"
          placeholder="Column name for x-axis"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="y-axis" className="text-right">
          Y-Axis Field
        </Label>
        <Input
          id="y-axis"
          value={chartConfig.y || ""}
          onChange={(e) => onUpdateConfig({ y: e.target.value })}
          className="col-span-3"
          placeholder="Column name for y-axis"
        />
      </div>
    </>
  );
};

export default DataSettingsTab;
