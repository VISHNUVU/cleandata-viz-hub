
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getRecentUploads } from "@/services/fileDataService";
import { UploadedFile } from "@/types/file";
import ChartComponent from "@/components/dashboard/ChartComponent";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import ChartConfigPanel from "@/components/dashboard/ChartConfigPanel";
import { v4 as uuidv4 } from "uuid";
import DataSourceSelector from "@/components/dashboard/DataSourceSelector";
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  AreaChart, 
  Save, 
  Download, 
  Share2, 
  Plus, 
  Trash2,
  Settings,
  MoreHorizontal,
  Edit3
} from "lucide-react";

// Define chart types
export type ChartType = "bar" | "line" | "pie" | "area" | "scatter" | "donut";

// Define chart configuration type
export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  type: ChartType;
  dataSource: string;
  dimensions: string[];
  measures: string[];
  x?: string;
  y?: string;
  color?: string;
  filters?: any[];
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

// Define dashboard type
export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  charts: ChartConfig[];
  layout?: any;
}

export default function DashboardBuilder() {
  const { toast } = useToast();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [activeDashboard, setActiveDashboard] = useState<Dashboard | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartConfig | null>(null);
  const [isCreatingChart, setIsCreatingChart] = useState(false);
  const [newChartConfig, setNewChartConfig] = useState<Partial<ChartConfig>>({
    title: "New Chart",
    type: "bar",
    dataSource: "",
    dimensions: [],
    measures: []
  });
  const [availableDataSources, setAvailableDataSources] = useState<UploadedFile[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState("My Dashboard");
  const [dashboardDescription, setDashboardDescription] = useState("");
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);

  // Load available data sources when component mounts
  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const files = await getRecentUploads(10);
        setAvailableDataSources(files);
      } catch (error) {
        console.error("Error fetching data sources:", error);
        toast({
          title: "Error",
          description: "Failed to load data sources. Please try again.",
          variant: "destructive"
        });
      }
    };

    fetchDataSources();
  }, [toast]);

  // Create a new dashboard if none exists
  useEffect(() => {
    if (dashboards.length === 0) {
      const newDashboard: Dashboard = {
        id: uuidv4(),
        title: "My Dashboard",
        description: "",
        charts: []
      };
      setDashboards([newDashboard]);
      setActiveDashboard(newDashboard);
    }
  }, [dashboards]);

  // Create a new chart and add it to the active dashboard
  const handleCreateChart = () => {
    if (!activeDashboard) return;
    
    if (!newChartConfig.dataSource) {
      toast({
        title: "Error",
        description: "Please select a data source for your chart.",
        variant: "destructive"
      });
      return;
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
        w: 6,
        h: 4
      }
    };

    const updatedDashboard = {
      ...activeDashboard,
      charts: [...activeDashboard.charts, chart]
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
    setIsCreatingChart(false);
    setNewChartConfig({
      title: "New Chart",
      type: "bar",
      dataSource: "",
      dimensions: [],
      measures: []
    });

    toast({
      title: "Success",
      description: "Chart added successfully.",
    });
  };

  // Delete a chart from the active dashboard
  const handleDeleteChart = (chartId: string) => {
    if (!activeDashboard) return;

    const updatedCharts = activeDashboard.charts.filter(c => c.id !== chartId);
    const updatedDashboard = {
      ...activeDashboard,
      charts: updatedCharts
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);

    if (selectedChart && selectedChart.id === chartId) {
      setSelectedChart(null);
    }

    toast({
      title: "Success",
      description: "Chart deleted successfully.",
    });
  };

  // Update an existing chart
  const handleUpdateChart = (updatedChart: ChartConfig) => {
    if (!activeDashboard) return;

    const updatedCharts = activeDashboard.charts.map(c => 
      c.id === updatedChart.id ? updatedChart : c
    );

    const updatedDashboard = {
      ...activeDashboard,
      charts: updatedCharts
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
    setSelectedChart(updatedChart);

    toast({
      title: "Success",
      description: "Chart updated successfully.",
    });
  };

  // Update dashboard title and description
  const handleUpdateDashboard = () => {
    if (!activeDashboard) return;

    const updatedDashboard = {
      ...activeDashboard,
      title: dashboardTitle,
      description: dashboardDescription
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
    setIsEditingDashboard(false);

    toast({
      title: "Success",
      description: "Dashboard updated successfully.",
    });
  };

  // Save the dashboard
  const handleSaveDashboard = () => {
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard has been saved successfully."
    });
  };

  // Export the dashboard
  const handleExportDashboard = () => {
    toast({
      title: "Dashboard Exported",
      description: "Your dashboard has been exported."
    });
  };

  // Share the dashboard
  const handleShareDashboard = () => {
    toast({
      title: "Dashboard Shared",
      description: "Your dashboard sharing link has been created."
    });
  };

  // Create new dashboard
  const handleCreateDashboard = () => {
    const newDashboard: Dashboard = {
      id: uuidv4(),
      title: "New Dashboard",
      description: "",
      charts: []
    };
    
    setDashboards([...dashboards, newDashboard]);
    setActiveDashboard(newDashboard);
    setDashboardTitle("New Dashboard");
    setDashboardDescription("");

    toast({
      title: "Success",
      description: "New dashboard created.",
    });
  };

  // Handle layout changes
  const handleLayoutChange = (layout: any) => {
    if (!activeDashboard) return;

    const updatedCharts = activeDashboard.charts.map(chart => {
      const layoutItem = layout.find((item: any) => item.i === chart.id);
      if (layoutItem) {
        return {
          ...chart,
          position: {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h
          }
        };
      }
      return chart;
    });

    const updatedDashboard = {
      ...activeDashboard,
      charts: updatedCharts,
      layout: layout
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
  };

  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case "bar": return <BarChart2 className="h-4 w-4" />;
      case "line": return <LineChart className="h-4 w-4" />;
      case "pie": return <PieChart className="h-4 w-4" />;
      case "area": return <AreaChart className="h-4 w-4" />;
      default: return <BarChart2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              {isEditingDashboard ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={dashboardTitle}
                    onChange={(e) => setDashboardTitle(e.target.value)}
                    className="text-2xl font-bold h-10 w-[300px]"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingDashboard(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpdateDashboard}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeDashboard?.title || "My Dashboard"}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDashboardTitle(activeDashboard?.title || "My Dashboard");
                      setDashboardDescription(activeDashboard?.description || "");
                      setIsEditingDashboard(true);
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {isEditingDashboard ? (
              <Textarea
                value={dashboardDescription}
                onChange={(e) => setDashboardDescription(e.target.value)}
                placeholder="Add a description for your dashboard"
                className="mt-2 w-full max-w-[600px]"
                rows={2}
              />
            ) : (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {activeDashboard?.description || "Add a description to your dashboard"}
              </p>
            )}
          </div>
          <div className="flex mt-4 sm:mt-0 gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Dashboards</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dashboards.map(dashboard => (
                  <DropdownMenuItem 
                    key={dashboard.id}
                    onClick={() => {
                      setActiveDashboard(dashboard);
                      setDashboardTitle(dashboard.title);
                      setDashboardDescription(dashboard.description || "");
                    }}
                  >
                    {dashboard.title}
                  </DropdownMenuItem>
                ))}
                <Separator className="my-2" />
                <DropdownMenuItem onClick={handleCreateDashboard}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={handleSaveDashboard}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleExportDashboard}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleShareDashboard}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-end">
            <Dialog
              open={isCreatingChart}
              onOpenChange={(open) => {
                setIsCreatingChart(open);
                if (!open) {
                  setNewChartConfig({
                    title: "New Chart",
                    type: "bar",
                    dataSource: "",
                    dimensions: [],
                    measures: []
                  });
                }
              }}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Chart
                </Button>
              </DialogTrigger>
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="data-source" className="text-right">
                      Data Source
                    </Label>
                    <div className="col-span-3">
                      <DataSourceSelector
                        dataSources={availableDataSources}
                        selectedSource={newChartConfig.dataSource}
                        onSelectSource={(sourceId) => setNewChartConfig({...newChartConfig, dataSource: sourceId})}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleCreateChart}>Add Chart</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Dashboard Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow min-h-[600px] p-4">
            {activeDashboard && activeDashboard.charts.length > 0 ? (
              <DashboardGrid
                charts={activeDashboard.charts}
                onLayoutChange={handleLayoutChange}
                onSelectChart={setSelectedChart}
                onDeleteChart={handleDeleteChart}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                  <BarChart2 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No charts yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Get started by adding a chart to your dashboard. Click the "Add Chart" button above to create your first visualization.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setIsCreatingChart(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Chart
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Chart Configuration Panel */}
        {selectedChart && (
          <Card className="mt-6 p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {getChartIcon(selectedChart.type)}
                <h2 className="text-lg font-medium">Edit Chart: {selectedChart.title}</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedChart(null)}
              >
                Close
              </Button>
            </div>
            <ChartConfigPanel
              chart={selectedChart}
              dataSources={availableDataSources}
              onUpdateChart={handleUpdateChart}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
