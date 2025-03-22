
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { getRecentUploads } from "@/services/fileDataService";
import { v4 as uuidv4 } from "uuid";
import { Plus, LayoutTemplate } from "lucide-react";

// Import types from our types file
import { ChartConfig, ChartType, Dashboard, DashboardTemplate } from "@/types/dashboard";

// Import our components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import ChartConfigPanelContainer from "@/components/dashboard/ChartConfigPanelContainer";
import ChartCreationModal from "@/components/dashboard/ChartCreationModal";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import DashboardTemplates from "@/components/dashboard/DashboardTemplates";

// Re-export types with proper syntax for isolatedModules
export type { ChartType, Dashboard, ChartConfig };

export default function DashboardBuilder() {
  const { toast } = useToast();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [activeDashboard, setActiveDashboard] = useState<Dashboard | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartConfig | null>(null);
  const [isCreatingChart, setIsCreatingChart] = useState(false);
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
  const handleCreateChart = (chart: ChartConfig) => {
    if (!activeDashboard) return;
    
    const updatedDashboard = {
      ...activeDashboard,
      charts: [...activeDashboard.charts, chart]
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);

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
    try {
      const dashboardData = JSON.stringify(activeDashboard, null, 2);
      const blob = new Blob([dashboardData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeDashboard?.title || 'dashboard'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Dashboard Exported",
        description: "Your dashboard has been exported as JSON."
      });
    } catch (error) {
      console.error("Error exporting dashboard:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your dashboard.",
        variant: "destructive"
      });
    }
  };

  // Share the dashboard
  const handleShareDashboard = () => {
    const mockShareableLink = `https://example.com/dashboards/${activeDashboard?.id}`;
    
    navigator.clipboard.writeText(mockShareableLink)
      .then(() => {
        toast({
          title: "Dashboard Shared",
          description: "Shareable link copied to clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Sharing Failed",
          description: "Could not copy the sharing link to clipboard.",
          variant: "destructive"
        });
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

  // Apply a dashboard template
  const handleApplyTemplate = (template: DashboardTemplate) => {
    if (!activeDashboard || !template) return;

    // Generate complete chart configs from template partial configs
    const templateCharts: ChartConfig[] = template.charts.map(chartTemplate => {
      return {
        id: uuidv4(),
        title: chartTemplate.title || "Untitled Chart",
        type: chartTemplate.type || "bar",
        position: chartTemplate.position || { x: 0, y: 0, w: 6, h: 4 },
        dataSource: chartTemplate.dataSource || (availableDataSources[0]?.id || ""),
        dimensions: chartTemplate.dimensions || [],
        measures: chartTemplate.measures || [],
        prefix: chartTemplate.prefix,
        suffix: chartTemplate.suffix
      } as ChartConfig;
    });

    // Apply the template to the active dashboard
    const updatedDashboard = {
      ...activeDashboard,
      title: template.name,
      description: template.description,
      charts: templateCharts,
      templateId: template.id
    };

    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
    setDashboardTitle(template.name);
    setDashboardDescription(template.description);

    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your dashboard.`
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

  // Function to duplicate a chart
  const handleDuplicateChart = (chart: ChartConfig) => {
    if (!activeDashboard) return;
    
    const duplicatedChart = {
      ...chart,
      id: uuidv4(),
      title: `${chart.title} (Copy)`,
      position: {
        ...chart.position,
        x: (chart.position.x + 2) % 12,
        y: chart.position.y + 1
      }
    };
    
    const updatedDashboard = {
      ...activeDashboard,
      charts: [...activeDashboard.charts, duplicatedChart]
    };
    
    setDashboards(
      dashboards.map(d => d.id === activeDashboard.id ? updatedDashboard : d)
    );
    setActiveDashboard(updatedDashboard);
    
    toast({
      title: "Success",
      description: "Chart duplicated successfully.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <DashboardHeader
          activeDashboard={activeDashboard}
          dashboards={dashboards}
          dashboardTitle={dashboardTitle}
          dashboardDescription={dashboardDescription}
          isEditingDashboard={isEditingDashboard}
          onUpdateDashboard={handleUpdateDashboard}
          onSaveDashboard={handleSaveDashboard}
          onExportDashboard={handleExportDashboard}
          onShareDashboard={handleShareDashboard}
          onCreateDashboard={handleCreateDashboard}
          onSetActiveDashboard={(dashboard) => {
            setActiveDashboard(dashboard);
            setDashboardTitle(dashboard.title);
            setDashboardDescription(dashboard.description || "");
          }}
          onSetDashboardTitle={setDashboardTitle}
          onSetDashboardDescription={setDashboardDescription}
          onSetIsEditingDashboard={setIsEditingDashboard}
        />

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-end space-x-3">
            <DashboardTemplates onSelectTemplate={handleApplyTemplate} />
            
            <ChartCreationModal
              open={isCreatingChart}
              onOpenChange={setIsCreatingChart}
              onCreateChart={handleCreateChart}
              dataSources={availableDataSources}
            />
            
            <Button onClick={() => setIsCreatingChart(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Chart
            </Button>
          </div>
          
          {/* Dashboard Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow min-h-[600px] p-4">
            {activeDashboard && activeDashboard.charts.length > 0 ? (
              <DashboardGrid
                charts={activeDashboard.charts}
                onLayoutChange={handleLayoutChange}
                onSelectChart={setSelectedChart}
                onDeleteChart={handleDeleteChart}
                onDuplicateChart={handleDuplicateChart}
              />
            ) : (
              <EmptyDashboard onAddChart={() => setIsCreatingChart(true)} />
            )}
          </div>
        </div>

        {/* Chart Configuration Panel */}
        {selectedChart && (
          <ChartConfigPanelContainer
            chart={selectedChart}
            dataSources={availableDataSources}
            onUpdateChart={handleUpdateChart}
            onClose={() => setSelectedChart(null)}
          />
        )}
      </div>
    </div>
  );
};
