
import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CHART_COLORS } from "./ChartUtils";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface AreaChartProps {
  config: ChartConfig;
  data: any[];
}

const AreaChartComponent = ({ config, data }: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
            <Area 
              key={measure} 
              type="monotone" 
              dataKey={measure} 
              stroke={CHART_COLORS[index % CHART_COLORS.length]} 
              fill={CHART_COLORS[index % CHART_COLORS.length]} 
              fillOpacity={0.3}
            />
          ))
        ) : (
          <Area 
            type="monotone" 
            dataKey={config.y || Object.keys(data[0])[1]} 
            stroke="#4F46E5" 
            fill="#4F46E5" 
            fillOpacity={0.3}
          />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
