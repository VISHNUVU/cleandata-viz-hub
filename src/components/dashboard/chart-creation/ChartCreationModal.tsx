
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartConfig } from "@/types/dashboard";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

import GeneralSettingsTab from "./GeneralSettingsTab";
import DataSettingsTab from "./DataSettingsTab";
import StyleSettingsTab from "./StyleSettingsTab";
import FilterSettingsTab from "./FilterSettingsTab";

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
      type: newChartConfig.type as any || "bar",
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
            <GeneralSettingsTab 
              chartConfig={newChartConfig} 
              onUpdateConfig={(config) => setNewChartConfig({...newChartConfig, ...config})} 
            />
          </TabsContent>
          
          <TabsContent value="data">
            <DataSettingsTab 
              chartConfig={newChartConfig}
              dataSources={dataSources}
              onUpdateConfig={(config) => setNewChartConfig({...newChartConfig, ...config})}
            />
          </TabsContent>
          
          <TabsContent value="style">
            <StyleSettingsTab 
              chartConfig={newChartConfig}
              onUpdateConfig={(config) => setNewChartConfig({...newChartConfig, ...config})}
            />
          </TabsContent>
          
          <TabsContent value="filters">
            <FilterSettingsTab 
              chartConfig={newChartConfig}
              onUpdateConfig={(config) => setNewChartConfig({...newChartConfig, ...config})}
            />
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
