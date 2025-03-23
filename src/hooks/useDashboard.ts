
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { getRecentUploads } from "@/services/fileDataService";
import { Dashboard, ChartConfig, DashboardTemplate } from "@/types/dashboard";

export function useDashboard() {
  const { toast } = useToast();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [activeDashboard, setActiveDashboard] = useState<Dashboard | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartConfig | null>(null);
  const [isCreatingChart, setIsCreatingChart] = useState(false);
  const [availableDataSources, setAvailableDataSources] = useState<UploadedFile[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState("My Dashboard");
  const [dashboardDescription, setDashboardDescription] = useState("");
  const [isEditingDashboard, setIsEditingDashboard] = useState(false);

  // Fetch data sources
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

  // Initialize with a default dashboard if none exists
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

  const handleSaveDashboard = () => {
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard has been saved successfully."
    });
  };

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

  const handleApplyTemplate = (template: DashboardTemplate) => {
    if (!activeDashboard || !template) return;

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

  return {
    dashboards,
    activeDashboard,
    selectedChart,
    isCreatingChart,
    availableDataSources,
    dashboardTitle,
    dashboardDescription,
    isEditingDashboard,
    setActiveDashboard,
    setSelectedChart,
    setIsCreatingChart,
    setDashboardTitle,
    setDashboardDescription,
    setIsEditingDashboard,
    handleCreateChart,
    handleDeleteChart,
    handleUpdateChart,
    handleUpdateDashboard,
    handleSaveDashboard,
    handleExportDashboard,
    handleShareDashboard,
    handleCreateDashboard,
    handleApplyTemplate,
    handleLayoutChange,
    handleDuplicateChart
  };
}
