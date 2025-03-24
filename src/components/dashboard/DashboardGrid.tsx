
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/types/dashboard";
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
  const [gridWidth, setGridWidth] = useState<number>(1200);

  // Calculate proper layout on mount and when charts change
  useEffect(() => {
    if (charts && charts.length > 0) {
      // Generate layouts from chart positions, ensuring no overlaps
      const newLayouts = {
        lg: charts.map((chart, index) => {
          const defaultPos = getDefaultPosition(chart, index, charts);
          return {
            i: chart.id,
            x: chart.position?.x ?? defaultPos.x,
            y: chart.position?.y ?? defaultPos.y,
            w: chart.position?.w ?? defaultPos.w,
            h: chart.position?.h ?? defaultPos.h,
            minW: getMinWidth(chart.type),
            minH: getMinHeight(chart.type)
          };
        })
      };
      setLayouts(newLayouts);
    }
  }, [charts]);

  // Get appropriate minimum width based on chart type
  const getMinWidth = (chartType?: string): number => {
    switch (chartType) {
      case 'card': return 2;
      case 'pie': 
      case 'donut': return 4;
      default: return 4;
    }
  };

  // Get appropriate minimum height based on chart type
  const getMinHeight = (chartType?: string): number => {
    switch (chartType) {
      case 'card': return 2;
      case 'pie': 
      case 'donut': return 4;
      default: return 3;
    }
  };

  // Calculate non-overlapping default position for new charts
  const getDefaultPosition = (chart: ChartConfig, index: number, allCharts: ChartConfig[]) => {
    const defaultWidth = getMinWidth(chart.type) + 1;
    const defaultHeight = getMinHeight(chart.type);
    
    // Define a grid with 12 columns
    const cols = 12;
    const row = Math.floor(index / (cols / defaultWidth));
    const col = (index * defaultWidth) % cols;
    
    // Check if this position overlaps with existing charts
    let position = { x: col, y: row * defaultHeight, w: defaultWidth, h: defaultHeight };
    
    // If this is a new chart being added to existing ones, ensure no overlap
    if (chart.position && (chart.position.x !== undefined || chart.position.y !== undefined)) {
      return chart.position;
    }
    
    return position;
  };

  const handleLayoutChange = (layout: any, layouts: any) => {
    // Validate layout to ensure it's valid before updating
    if (layout && Array.isArray(layout)) {
      setLayouts(layouts);
      onLayoutChange(layout);
    }
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

  // Update grid width on window resize for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth > 1200 ? 1200 : window.innerWidth - 40);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
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
    <div className="dashboard-grid-wrapper">
      {charts.length === 0 ? (
        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 p-8 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">No charts added yet.</p>
            <p className="text-sm text-muted-foreground">Create your first chart by clicking the "Add Chart" button above.</p>
          </div>
        </div>
      ) : (
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
          containerPadding={[0, 0]}
          width={gridWidth}
          draggableHandle=".chart-handle"
        >
          {charts.map(chart => (
            <div key={chart.id} className="transition-shadow hover:shadow-lg">
              <Card className="h-full flex flex-col">
                {/* Chart Header - Draggable Handle */}
                <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700 chart-handle cursor-move">
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
                <div className="p-4 flex-1 flex items-center justify-center overflow-hidden">
                  <ChartComponent 
                    config={chart} 
                  />
                </div>
              </Card>
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default DashboardGrid;
