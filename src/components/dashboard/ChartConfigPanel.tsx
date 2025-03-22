
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadedFile } from "@/types/file";
import { ChartConfig, ChartType } from "@/types/dashboard";
import DataSourceSelector from "./DataSourceSelector";
import { BarChart2, LineChart, PieChart, AreaChart, CreditCard } from "lucide-react";

interface ChartConfigPanelProps {
  chart: ChartConfig;
  dataSources: UploadedFile[];
  onUpdateChart: (chart: ChartConfig) => void;
  onClose: () => void;
}

const ChartConfigPanel = ({ chart, dataSources, onUpdateChart, onClose }: ChartConfigPanelProps) => {
  const [editedChart, setEditedChart] = useState<ChartConfig>({ ...chart });
  const [activeTab, setActiveTab] = useState<string>("general");

  useEffect(() => {
    // Update the form when the chart changes
    setEditedChart({ ...chart });
  }, [chart]);

  const handleSaveChanges = () => {
    onUpdateChart(editedChart);
  };

  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case "bar": return <BarChart2 className="h-4 w-4" />;
      case "line": return <LineChart className="h-4 w-4" />;
      case "pie": return <PieChart className="h-4 w-4" />;
      case "area": return <AreaChart className="h-4 w-4" />;
      case "card": return <CreditCard className="h-4 w-4" />;
      default: return <BarChart2 className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {getChartIcon(editedChart.type)}
          <h2 className="text-lg font-medium">Edit Chart: {editedChart.title}</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chart-title">Chart Title</Label>
                <Input
                  id="chart-title"
                  value={editedChart.title}
                  onChange={(e) => setEditedChart({ ...editedChart, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="chart-type">Chart Type</Label>
                <Select
                  value={editedChart.type}
                  onValueChange={(value) => setEditedChart({ ...editedChart, type: value as ChartType })}
                >
                  <SelectTrigger id="chart-type" className="mt-1">
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
            </div>

            <div>
              <Label htmlFor="chart-description">Description (Optional)</Label>
              <Input
                id="chart-description"
                value={editedChart.description || ""}
                onChange={(e) => setEditedChart({ ...editedChart, description: e.target.value })}
                className="mt-1"
                placeholder="Add a description for your chart"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="data-source">Data Source</Label>
              <div className="mt-1">
                <DataSourceSelector
                  dataSources={dataSources}
                  selectedSource={editedChart.dataSource}
                  onSelectSource={(sourceId) => setEditedChart({ ...editedChart, dataSource: sourceId })}
                />
              </div>
            </div>

            {editedChart.type === 'card' ? (
              <>
                <div>
                  <Label htmlFor="metric-field">Metric Field</Label>
                  <Input
                    id="metric-field"
                    value={editedChart.y || ""}
                    onChange={(e) => setEditedChart({ ...editedChart, y: e.target.value })}
                    className="mt-1"
                    placeholder="Field to display as metric"
                  />
                </div>
                <div>
                  <Label htmlFor="aggregation">Aggregation</Label>
                  <Select
                    value={editedChart.aggregation || "sum"}
                    onValueChange={(value) => setEditedChart({
                      ...editedChart, 
                      aggregation: value as "sum" | "average" | "count" | "max" | "min"
                    })}
                  >
                    <SelectTrigger id="aggregation" className="mt-1">
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
                <div>
                  <Label htmlFor="x-axis">X-Axis Field</Label>
                  <Input
                    id="x-axis"
                    value={editedChart.x || ""}
                    onChange={(e) => setEditedChart({ ...editedChart, x: e.target.value })}
                    className="mt-1"
                    placeholder="Field for x-axis"
                  />
                </div>
                <div>
                  <Label htmlFor="y-axis">Y-Axis Field</Label>
                  <Input
                    id="y-axis"
                    value={editedChart.y || ""}
                    onChange={(e) => setEditedChart({ ...editedChart, y: e.target.value })}
                    className="mt-1"
                    placeholder="Field for y-axis"
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="style">
          <div className="grid gap-4">
            {editedChart.type === 'card' && (
              <>
                <div>
                  <Label htmlFor="prefix">Prefix</Label>
                  <Input
                    id="prefix"
                    value={editedChart.prefix || ""}
                    onChange={(e) => setEditedChart({ ...editedChart, prefix: e.target.value })}
                    className="mt-1"
                    placeholder="e.g. $, €, £"
                  />
                </div>
                <div>
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input
                    id="suffix"
                    value={editedChart.suffix || ""}
                    onChange={(e) => setEditedChart({ ...editedChart, suffix: e.target.value })}
                    className="mt-1"
                    placeholder="e.g. %, pts"
                  />
                </div>
              </>
            )}
            {/* Add more style options here as needed */}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
};

export default ChartConfigPanel;
