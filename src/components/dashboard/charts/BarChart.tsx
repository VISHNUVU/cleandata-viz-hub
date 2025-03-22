
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CHART_COLORS } from "./ChartUtils";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface BarChartProps {
  config: ChartConfig;
  data: any[];
}

const BarChartComponent = ({ config, data }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey={config.x || Object.keys(data[0])[0]} 
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        {config.measures && config.measures.length > 0 ? (
          config.measures.map((measure, index) => (
            <Bar 
              key={measure} 
              dataKey={measure} 
              fill={CHART_COLORS[index % CHART_COLORS.length]} 
            />
          ))
        ) : (
          <Bar 
            dataKey={config.y || Object.keys(data[0])[1]} 
            fill="#4F46E5" 
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
