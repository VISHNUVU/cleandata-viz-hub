
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ChartType, ChartConfig } from "@/pages/DashboardBuilder";
import DataSourceSelector from "@/components/dashboard/DataSourceSelector";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface ChartCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChart: (chart: ChartConfig) => void;
  dataSources: UploadedFile[];
}

const ChartCreationModal = ({ open, onOpenChange, onCreateChart, dataSources }: ChartCreationModalProps) => {
  const { toast } = useToast();
  const [newChartConfig, setNewChartConfig] = useState<Partial<ChartConfig>>({
    title: "New Chart",
    type: "bar",
    dataSource: "",
    dimensions: [],
    measures: [],
    aggregation: "sum"
  });

  const handleCreateChart = () => {
    if (!newChartConfig.dataSource) {
      toast({
        title: "Error",
        description: "Please select a data source for your chart.",
        variant: "destructive"
      });
      return;
    }

    // Set default height/width based on chart type
    let defaultWidth = 6;
    let defaultHeight = 4;
    
    if (newChartConfig.type === "card") {
      defaultWidth = 3;
      defaultHeight = 2;
    } else if (newChartConfig.type === "pie" || newChartConfig.type === "donut") {
      defaultWidth = 4;
      defaultHeight = 4;
    }

    const chart: ChartConfig = {
      id: uuidv4(),
      title: newChartConfig.title || "New Chart",
      description: newChartConfig.description || "",
      type: newChartConfig.type as ChartType || "bar",
      dataSource: newChartConfig.dataSource,
      dimensions: newChartConfig.dimensions || [],
      measures: newChartConfig.measures || [],
      x: newChartConfig.x,
      y: newChartConfig.y,
      position: {
        x: Math.floor(Math.random() * 6) * 2,
        y: Math.floor(Math.random() * 4) * 2,
        w: defaultWidth,
        h: defaultHeight
      },
      aggregation: newChartConfig.aggregation || "sum",
      prefix: newChartConfig.prefix,
      suffix: newChartConfig.suffix
    };

    onCreateChart(chart);
    onOpenChange(false);
    
    // Reset the form
    setNewChartConfig({
      title: "New Chart",
      type: "bar",
      dataSource: "",
      dimensions: [],
      measures: [],
      aggregation: "sum"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Chart</DialogTitle>
          <DialogDescription>
            Configure your chart settings. You can modify these later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chart-title" className="text-right">
              Title
            </Label>
            <Input
              id="chart-title"
              value={newChartConfig.title || ""}
              onChange={(e) => setNewChartConfig({...newChartConfig, title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chart-type" className="text-right">
              Chart Type
            </Label>
            <Select 
              value={newChartConfig.type} 
              onValueChange={(value) => setNewChartConfig({...newChartConfig, type: value as ChartType})}
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
            <Label htmlFor="data-source" className="text-right">
              Data Source
            </Label>
            <div className="col-span-3">
              <DataSourceSelector
                dataSources={dataSources}
                selectedSource={newChartConfig.dataSource}
                onSelectSource={(sourceId) => setNewChartConfig({...newChartConfig, dataSource: sourceId})}
              />
            </div>
          </div>
          
          {newChartConfig.type === 'card' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="card-metric" className="text-right">
                  Metric Field
                </Label>
                <Input
                  id="card-metric"
                  value={newChartConfig.y || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, y: e.target.value})}
                  className="col-span-3"
                  placeholder="Column name for metric value"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="aggregation" className="text-right">
                  Aggregation
                </Label>
                <Select 
                  value={newChartConfig.aggregation} 
                  onValueChange={(value) => setNewChartConfig({
                    ...newChartConfig, 
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="prefix" className="text-right">
                  Prefix
                </Label>
                <Input
                  id="prefix"
                  value={newChartConfig.prefix || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, prefix: e.target.value})}
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
                  value={newChartConfig.suffix || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, suffix: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g. %, pts"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateChart}>Add Chart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChartCreationModal;
