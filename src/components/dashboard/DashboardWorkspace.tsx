
import { Button } from "@/components/ui/button";
import { ChartConfig, Dashboard } from "@/types/dashboard";
import { UploadedFile } from "@/types/file";
import { Plus } from "lucide-react";
import { ChartCreationModal } from "@/components/dashboard/chart-creation";
import DashboardTemplates from "@/components/dashboard/DashboardTemplates";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import ChartConfigPanelContainer from "@/components/dashboard/ChartConfigPanelContainer";

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
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex justify-end space-x-3">
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
