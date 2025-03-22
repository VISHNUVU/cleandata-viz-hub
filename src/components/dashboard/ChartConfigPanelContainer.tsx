
import { Card } from "@/components/ui/card";
import { ChartConfig } from "@/types/dashboard";
import { UploadedFile } from "@/types/file";
import ChartConfigPanel from "./ChartConfigPanel";

interface ChartConfigPanelContainerProps {
  chart: ChartConfig;
  dataSources: UploadedFile[];
  onUpdateChart: (chart: ChartConfig) => void;
  onClose: () => void;
}

/**
 * Container component that wraps the chart configuration panel
 * and handles passing props to the ChartConfigPanel component
 */
const ChartConfigPanelContainer = ({
  chart,
  dataSources,
  onUpdateChart,
  onClose
}: ChartConfigPanelContainerProps) => {
  return (
    <Card className="mt-6 p-6">
      <ChartConfigPanel
        chart={chart}
        dataSources={dataSources}
        onUpdateChart={onUpdateChart}
        onClose={onClose}
      />
    </Card>
  );
};

export default ChartConfigPanelContainer;
