
import { ChartConfig } from "@/pages/DashboardBuilder";
import { useChartData } from "./charts/useChartData";
import CardChart from "./charts/CardChart";
import BarChartComponent from "./charts/BarChart";
import LineChartComponent from "./charts/LineChart";
import PieChartComponent from "./charts/PieChart";
import AreaChartComponent from "./charts/AreaChart";
import ScatterChartComponent from "./charts/ScatterChart";

interface ChartComponentProps {
  config: ChartConfig;
}

const ChartComponent = ({ config }: ChartComponentProps) => {
  const { data, isLoading, error, aggregatedValue, previousValue } = useChartData(config);

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

  // Render appropriate chart based on type
  switch (config.type) {
    case "bar":
      return <BarChartComponent config={config} data={data} />;
      
    case "line":
      return <LineChartComponent config={config} data={data} />;
      
    case "pie":
      return <PieChartComponent config={config} data={data} />;
      
    case "area":
      return <AreaChartComponent config={config} data={data} />;
      
    case "scatter":
      return <ScatterChartComponent config={config} data={data} />;
      
    case "donut":
      return <PieChartComponent config={config} data={data} isDonut={true} />;
      
    default:
      return <div>Unsupported chart type: {config.type}</div>;
  }
};

export default ChartComponent;
