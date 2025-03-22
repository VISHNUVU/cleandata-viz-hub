
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ChartType, ChartConfig } from "@/types/dashboard";
import DataSourceSelector from "@/components/dashboard/DataSourceSelector";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { CHART_COLORS } from "./charts/ChartUtils";

interface ChartCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChart: (chart: ChartConfig) => void;
  dataSources: UploadedFile[];
}

const ChartCreationModal = ({ open, onOpenChange, onCreateChart, dataSources }: ChartCreationModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("general");
  const [newChartConfig, setNewChartConfig] = useState<Partial<ChartConfig>>({
    title: "New Chart",
    type: "bar",
    dataSource: "",
    dimensions: [],
    measures: [],
    aggregation: "sum",
    showGrid: true,
    colorScheme: 0
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
      suffix: newChartConfig.suffix,
      colorScheme: newChartConfig.colorScheme || 0,
      curveType: newChartConfig.curveType || "linear",
      showGrid: newChartConfig.showGrid !== false,
      filterField: newChartConfig.filterField,
      filterOperator: newChartConfig.filterOperator,
      filterValue: newChartConfig.filterValue
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
      aggregation: "sum",
      showGrid: true,
      colorScheme: 0
    });
    setActiveTab("general");
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full pt-2">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
          </TabsList>
        
          <TabsContent value="general">
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
                <Label htmlFor="chart-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="chart-description"
                  value={newChartConfig.description || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Optional description"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="grid gap-4 py-4">
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
              
              {newChartConfig.type === 'card' ? (
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
                </>
              ) : (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="x-axis" className="text-right">
                      X-Axis Field
                    </Label>
                    <Input
                      id="x-axis"
                      value={newChartConfig.x || ""}
                      onChange={(e) => setNewChartConfig({...newChartConfig, x: e.target.value})}
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
                      value={newChartConfig.y || ""}
                      onChange={(e) => setNewChartConfig({...newChartConfig, y: e.target.value})}
                      className="col-span-3"
                      placeholder="Column name for y-axis"
                    />
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="style">
            <div className="grid gap-4 py-4">
              {newChartConfig.type === 'card' ? (
                <>
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
              ) : (
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
                          className={`h-8 w-8 rounded-full border-2 ${newChartConfig.colorScheme === index ? 'border-gray-900 dark:border-white' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setNewChartConfig({ ...newChartConfig, colorScheme: index })}
                          aria-label={`Color ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {(newChartConfig.type === 'line' || newChartConfig.type === 'area') && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="curve-type" className="text-right">
                        Curve Type
                      </Label>
                      <Select
                        value={newChartConfig.curveType || "linear"}
                        onValueChange={(value) => setNewChartConfig({ ...newChartConfig, curveType: value })}
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
                      value={newChartConfig.showGrid?.toString() || "true"}
                      onValueChange={(value) => setNewChartConfig({ ...newChartConfig, showGrid: value === "true" })}
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
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="filters">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="filter-field" className="text-right">
                  Filter Field
                </Label>
                <Input
                  id="filter-field"
                  value={newChartConfig.filterField || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, filterField: e.target.value})}
                  className="col-span-3"
                  placeholder="Column name to filter by"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="filter-operator" className="text-right">
                  Filter Operator
                </Label>
                <Select
                  value={newChartConfig.filterOperator || "equals"}
                  onValueChange={(value) => setNewChartConfig({...newChartConfig, filterOperator: value})}
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
                  value={newChartConfig.filterValue || ""}
                  onChange={(e) => setNewChartConfig({...newChartConfig, filterValue: e.target.value})}
                  className="col-span-3"
                  placeholder="Value to filter by"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="submit" onClick={handleCreateChart}>Add Chart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChartCreationModal;
