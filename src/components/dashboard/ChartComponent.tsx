
import { ChartConfig } from "@/types/dashboard";
import { useChartData } from "./charts/useChartData";
import CardChart from "./charts/CardChart";
import BarChartComponent from "./charts/BarChart";
import LineChartComponent from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";
import AreaChartComponent from "./charts/AreaChart";
import ScatterChartComponent from "./charts/ScatterChart";
import { getColorPalette } from "./charts/ChartUtils";

interface ChartComponentProps {
  config: ChartConfig;
}

const ChartComponent = ({ config }: ChartComponentProps) => {
  const { data, isLoading, error, aggregatedValue, previousValue } = useChartData(config);

  // Get color palette based on the config
  const colors = getColorPalette(config.colorScheme);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading chart data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  // Card visualization for metrics
  if (config.type === "card") {
    return (
      <CardChart 
        config={config} 
        aggregatedValue={aggregatedValue} 
        previousValue={previousValue} 
      />
    );
  }

  // Common props for all charts
  const chartProps = {
    config,
    data,
    colors
  };

  // Render appropriate chart based on type
  switch (config.type) {
    case "bar":
      return <BarChartComponent {...chartProps} />;
      
    case "line":
      return <LineChartComponent {...chartProps} />;
      
    case "pie":
      return <PieChartComponent {...chartProps} />;
      
    case "area":
      return <AreaChartComponent {...chartProps} />;
      
    case "scatter":
      return <ScatterChartComponent {...chartProps} />;
      
    case "donut":
      return <PieChartComponent {...chartProps} isDonut={true} />;
      
    default:
      return <div>Unsupported chart type: {config.type}</div>;
  }
};

export default ChartComponent;
