
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CHART_COLORS } from "./ChartUtils";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface PieChartProps {
  config: ChartConfig;
  data: any[];
  isDonut?: boolean;
}

const PieChartComponent = ({ config, data, isDonut = false }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          innerRadius={isDonut ? 60 : 0}
          fill="#8884d8"
          dataKey={config.y || Object.keys(data[0])[1]}
          nameKey={config.x || Object.keys(data[0])[0]}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
