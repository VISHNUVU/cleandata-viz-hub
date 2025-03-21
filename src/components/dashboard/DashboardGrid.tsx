
import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/pages/DashboardBuilder";
import ChartComponent from "./ChartComponent";
import { MoreHorizontal, Edit3, Trash2, Maximize, Download } from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  charts: ChartConfig[];
  onLayoutChange: (layout: any) => void;
  onSelectChart: (chart: ChartConfig) => void;
  onDeleteChart: (chartId: string) => void;
}

const DashboardGrid = ({ 
  charts, 
  onLayoutChange, 
  onSelectChart, 
  onDeleteChart 
}: DashboardGridProps) => {
  const [layouts, setLayouts] = useState<any>({ lg: [] });

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
          minW: 4,
          minH: 3
        }))
      };
      setLayouts(newLayouts);
    }
  }, [charts]);

  const handleLayoutChange = (layout: any, layouts: any) => {
    setLayouts(layouts);
    onLayoutChange(layout);
  };

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
                  <DropdownMenuItem onClick={() => onDeleteChart(chart.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Maximize className="h-4 w-4 mr-2" />
                    Fullscreen
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export
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
