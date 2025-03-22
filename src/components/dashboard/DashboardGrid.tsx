
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/pages/DashboardBuilder";
import ChartComponent from "./ChartComponent";
import { MoreHorizontal, Edit3, Trash2, Maximize, Download, Copy, ExternalLink } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  charts: ChartConfig[];
  onLayoutChange: (layout: any) => void;
  onSelectChart: (chart: ChartConfig) => void;
  onDeleteChart: (chartId: string) => void;
  onDuplicateChart?: (chart: ChartConfig) => void;
}

const DashboardGrid = ({ 
  charts, 
  onLayoutChange, 
  onSelectChart, 
  onDeleteChart,
  onDuplicateChart 
}: DashboardGridProps) => {
  const [layouts, setLayouts] = useState<any>({ lg: [] });
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  useEffect(() => {
    // Generate layouts from chart positions
    if (charts && charts.length > 0) {
      const newLayouts = {
        lg: charts.map(chart => ({
          i: chart.id,
          x: chart.position.x,
          y: chart.position.y,
          w: chart.position.w,
          h: chart.position.h,
          minW: chart.type === 'card' ? 2 : 4,
          minH: chart.type === 'card' ? 2 : 3
        }))
      };
      setLayouts(newLayouts);
    }
  }, [charts]);

  const handleLayoutChange = (layout: any, layouts: any) => {
    setLayouts(layouts);
    onLayoutChange(layout);
  };

  // Handle exporting an individual chart
  const handleExportChart = (chart: ChartConfig) => {
    try {
      const chartData = JSON.stringify(chart, null, 2);
      const blob = new Blob([chartData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${chart.title.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting chart:", error);
    }
  };

  // Toggle full screen for a chart
  const toggleFullScreen = (chartId: string) => {
    if (expandedChart === chartId) {
      setExpandedChart(null);
    } else {
      setExpandedChart(chartId);
    }
  };

  // If a chart is in fullscreen mode, show only that chart
  if (expandedChart) {
    const expandedChartConfig = charts.find(chart => chart.id === expandedChart);
    if (expandedChartConfig) {
      return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800 flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {expandedChartConfig.title}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setExpandedChart(null)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Exit Fullscreen
            </Button>
          </div>
          <div className="flex-1">
            <ChartComponent config={expandedChartConfig} />
          </div>
        </div>
      );
    }
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      layouts={layouts}
      onLayoutChange={(layout, layouts) => handleLayoutChange(layout, layouts)}
      isDraggable={true}
      isResizable={true}
      compactType="vertical"
      margin={[16, 16]}
    >
      {charts.map(chart => (
        <div key={chart.id}>
          <Card className="h-full">
            {/* Chart Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {chart.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onSelectChart(chart)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  {onDuplicateChart && (
                    <DropdownMenuItem onClick={() => onDuplicateChart(chart)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => toggleFullScreen(chart.id)}>
                    <Maximize className="h-4 w-4 mr-2" />
                    Fullscreen
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportChart(chart)}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteChart(chart.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Chart Content */}
            <div className="p-4 h-[calc(100%-50px)] flex items-center justify-center">
              <ChartComponent 
                config={chart} 
              />
            </div>
          </Card>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default DashboardGrid;
