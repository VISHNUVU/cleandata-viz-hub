
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CHART_COLORS } from "./ChartUtils";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface LineChartProps {
  config: ChartConfig;
  data: any[];
}

const LineChartComponent = ({ config, data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
            <Line 
              key={measure} 
              type="monotone" 
              dataKey={measure} 
              stroke={CHART_COLORS[index % CHART_COLORS.length]} 
              strokeWidth={2}
            />
          ))
        ) : (
          <Line 
            type="monotone" 
            dataKey={config.y || Object.keys(data[0])[1]} 
            stroke="#4F46E5" 
            strokeWidth={2}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
