
import { Button } from "@/components/ui/button";
import { ChartConfig, Dashboard } from "@/types/dashboard";
import { UploadedFile } from "@/types/file";
import { Plus } from "lucide-react";
import { ChartCreationModal } from "@/components/dashboard/chart-creation";
import DashboardTemplates from "@/components/dashboard/DashboardTemplates";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import ChartConfigPanelContainer from "@/components/dashboard/ChartConfigPanelContainer";
import AIAssistant from "@/components/dashboard/AIAssistant";
import { useState } from "react";

interface DashboardWorkspaceProps {
  activeDashboard: Dashboard | null;
  selectedChart: ChartConfig | null;
  isCreatingChart: boolean;
  availableDataSources: UploadedFile[];
  onSetIsCreatingChart: (isCreating: boolean) => void;
  onCreateChart: (chart: ChartConfig) => void;
  onLayoutChange: (layout: any) => void;
  onSelectChart: (chart: ChartConfig | null) => void;
  onDeleteChart: (chartId: string) => void;
  onDuplicateChart: (chart: ChartConfig) => void;
  onUpdateChart: (chart: ChartConfig) => void;
  onApplyTemplate: (template: any) => void;
}

const DashboardWorkspace = ({
  activeDashboard,
  selectedChart,
  isCreatingChart,
  availableDataSources,
  onSetIsCreatingChart,
  onCreateChart,
  onLayoutChange,
  onSelectChart,
  onDeleteChart,
  onDuplicateChart,
  onUpdateChart,
  onApplyTemplate
}: DashboardWorkspaceProps) => {
  const [showAI, setShowAI] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<string>(
    availableDataSources.length > 0 ? availableDataSources[0].id : ""
  );

  const handleCreateChartFromSuggestion = (chartConfig: Partial<ChartConfig>) => {
    if (!chartConfig.dataSource) {
      chartConfig.dataSource = selectedDataSource;
    }
    
    // Create a proper ChartConfig with uuid and position
    const fullConfig: ChartConfig = {
      id: crypto.randomUUID(),
      title: chartConfig.title || "New Chart",
      description: chartConfig.description || "",
      type: chartConfig.type as any || "bar",
      dataSource: chartConfig.dataSource,
      dimensions: chartConfig.dimensions || [],
      measures: chartConfig.measures || [],
      x: chartConfig.x,
      y: chartConfig.y,
      position: {
        x: Math.floor(Math.random() * 6) * 2,
        y: Math.floor(Math.random() * 4) * 2,
        w: 6,
        h: 4
      },
      aggregation: chartConfig.aggregation || "sum",
      prefix: chartConfig.prefix,
      suffix: chartConfig.suffix,
      colorScheme: chartConfig.colorScheme || 0,
      curveType: chartConfig.curveType || "linear",
      showGrid: true
    };
    
    onCreateChart(fullConfig);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex justify-between">
        <div>
          <Button 
            variant={showAI ? "default" : "outline"} 
            onClick={() => setShowAI(!showAI)}
            className="mr-2"
          >
            {showAI ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
          
          {showAI && (
            <select 
              className="px-3 py-2 bg-background border border-input rounded-md text-sm" 
              value={selectedDataSource}
              onChange={(e) => setSelectedDataSource(e.target.value)}
            >
              <option value="" disabled>Select data source</option>
              {availableDataSources.map(source => (
                <option key={source.id} value={source.id}>
                  {source.filename}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="flex space-x-3">
          <DashboardTemplates onSelectTemplate={onApplyTemplate} />
          
          <ChartCreationModal
            open={isCreatingChart}
            onOpenChange={onSetIsCreatingChart}
            onCreateChart={onCreateChart}
            dataSources={availableDataSources}
          />
          
          <Button onClick={() => onSetIsCreatingChart(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>
      </div>
      
      {showAI && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIAssistant 
              dataSources={availableDataSources}
              selectedDataSource={selectedDataSource}
              onAddChart={handleCreateChartFromSuggestion}
            />
          </div>
          <div>
            <div className="bg-muted/30 p-4 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">AI Chart Assistant Tips</h3>
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li>Try describing the insights you want to gain from your data</li>
                <li>Mention specific fields you're interested in analyzing</li>
                <li>Ask for help with specific chart types if you're unsure</li>
                <li>You can request charts for specific business questions</li>
                <li>The AI will suggest the most appropriate visualizations based on your data</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow min-h-[600px] p-4">
        {activeDashboard && activeDashboard.charts.length > 0 ? (
          <DashboardGrid
            charts={activeDashboard.charts}
            onLayoutChange={onLayoutChange}
            onSelectChart={onSelectChart}
            onDeleteChart={onDeleteChart}
            onDuplicateChart={onDuplicateChart}
          />
        ) : (
          <EmptyDashboard onAddChart={() => onSetIsCreatingChart(true)} />
        )}
      </div>

      {selectedChart && (
        <ChartConfigPanelContainer
          chart={selectedChart}
          dataSources={availableDataSources}
          onUpdateChart={onUpdateChart}
          onClose={() => onSelectChart(null)}
        />
      )}
    </div>
  );
};

export default DashboardWorkspace;
