
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartConfig } from "@/types/dashboard";
import { UploadedFile, Column } from "@/types/file";
import DataSourceSelector from "@/components/dashboard/DataSourceSelector";
import { getFileData } from "@/services/fileDataService";

interface DataSettingsTabProps {
  chartConfig: Partial<ChartConfig>;
  dataSources: UploadedFile[];
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
}

const DataSettingsTab = ({ chartConfig, dataSources, onUpdateConfig }: DataSettingsTabProps) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoadingColumns, setIsLoadingColumns] = useState(false);

  // Fetch columns when data source changes
  useEffect(() => {
    const fetchColumns = async () => {
      if (chartConfig.dataSource) {
        setIsLoadingColumns(true);
        try {
          const fileData = await getFileData(chartConfig.dataSource);
          if (fileData && fileData.rows && fileData.rows.length > 0) {
            // Extract column names from the first row
            const columnNames = Object.keys(fileData.rows[0]);
            setColumns(columnNames);
          } else {
            setColumns([]);
          }
        } catch (error) {
          console.error("Error fetching columns:", error);
          setColumns([]);
        } finally {
          setIsLoadingColumns(false);
        }
      } else {
        setColumns([]);
      }
    };

    fetchColumns();
  }, [chartConfig.dataSource]);

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
        <CardDataSettings 
          chartConfig={chartConfig} 
          onUpdateConfig={onUpdateConfig} 
          columns={columns}
          isLoadingColumns={isLoadingColumns}
        />
      ) : (
        <ChartDataSettings 
          chartConfig={chartConfig} 
          onUpdateConfig={onUpdateConfig} 
          columns={columns}
          isLoadingColumns={isLoadingColumns}
        />
      )}
    </div>
  );
};

interface DataSettingsComponentProps {
  chartConfig: Partial<ChartConfig>;
  onUpdateConfig: (config: Partial<ChartConfig>) => void;
  columns: string[];
  isLoadingColumns: boolean;
}

const CardDataSettings = ({ chartConfig, onUpdateConfig, columns, isLoadingColumns }: DataSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="card-metric" className="text-right">
          Metric Field
        </Label>
        {columns.length > 0 ? (
          <Select
            value={chartConfig.y || ""}
            onValueChange={(value) => onUpdateConfig({ y: value })}
          >
            <SelectTrigger id="card-metric" className="col-span-3">
              <SelectValue placeholder="Select a field for metric" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="card-metric"
            value={chartConfig.y || ""}
            onChange={(e) => onUpdateConfig({ y: e.target.value })}
            className="col-span-3"
            placeholder={isLoadingColumns ? "Loading columns..." : "Column name for metric value"}
            disabled={isLoadingColumns}
          />
        )}
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
          <SelectTrigger className="col-span-3" id="aggregation">
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

const ChartDataSettings = ({ chartConfig, onUpdateConfig, columns, isLoadingColumns }: DataSettingsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="x-axis" className="text-right">
          X-Axis Field
        </Label>
        {columns.length > 0 ? (
          <Select
            value={chartConfig.x || ""}
            onValueChange={(value) => onUpdateConfig({ x: value })}
          >
            <SelectTrigger id="x-axis" className="col-span-3">
              <SelectValue placeholder="Select a field for x-axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="x-axis"
            value={chartConfig.x || ""}
            onChange={(e) => onUpdateConfig({ x: e.target.value })}
            className="col-span-3"
            placeholder={isLoadingColumns ? "Loading columns..." : "Column name for x-axis"}
            disabled={isLoadingColumns}
          />
        )}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="y-axis" className="text-right">
          Y-Axis Field
        </Label>
        {columns.length > 0 ? (
          <Select
            value={chartConfig.y || ""}
            onValueChange={(value) => onUpdateConfig({ y: value })}
          >
            <SelectTrigger id="y-axis" className="col-span-3">
              <SelectValue placeholder="Select a field for y-axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="y-axis"
            value={chartConfig.y || ""}
            onChange={(e) => onUpdateConfig({ y: e.target.value })}
            className="col-span-3"
            placeholder={isLoadingColumns ? "Loading columns..." : "Column name for y-axis"}
            disabled={isLoadingColumns}
          />
        )}
      </div>
    </>
  );
};

export default DataSettingsTab;
