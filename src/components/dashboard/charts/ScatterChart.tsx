
import { ResponsiveContainer, ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface ScatterChartProps {
  config: ChartConfig;
  data: any[];
}

const ScatterChartComponent = ({ config, data }: ScatterChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={config.x || Object.keys(data[0])[0]} 
          type="number" 
          name={config.x || "x"} 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          dataKey={config.y || Object.keys(data[0])[1]} 
          type="number" 
          name={config.y || "y"} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter 
          name={config.title} 
          data={data} 
          fill="#4F46E5" 
        />
      </RechartsScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartComponent;
