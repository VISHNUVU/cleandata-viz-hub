
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { ChartConfig } from "@/pages/DashboardBuilder";
import { formatValue } from "./ChartUtils";

interface CardChartProps {
  config: ChartConfig;
  aggregatedValue: number | null;
  previousValue: number | null;
}

const CardChart = ({ config, aggregatedValue, previousValue }: CardChartProps) => {
  const percentChange = previousValue && aggregatedValue 
    ? ((aggregatedValue - previousValue) / previousValue) * 100 
    : 0;
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-medium">{config.cardTitle || config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-1">
          <span className="text-3xl font-bold">
            {config.prefix || ""}{formatValue(aggregatedValue)}{config.suffix || ""}
          </span>
          {percentChange !== null && (
            <div className="flex items-center">
              <span className={`text-sm font-medium flex items-center ${percentChange > 0 ? 'text-green-500' : percentChange < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {percentChange > 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : percentChange < 0 ? (
                  <ArrowDown className="h-4 w-4 mr-1" />
                ) : (
                  <Minus className="h-4 w-4 mr-1" />
                )}
                {Math.abs(percentChange).toFixed(1)}% from previous
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardChart;
