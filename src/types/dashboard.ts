
// Define chart types
export type ChartType = "bar" | "line" | "pie" | "area" | "scatter" | "donut" | "card";

// Define chart configuration type
export interface ChartConfig {
  id: string;
  title: string;
  description?: string;
  type: ChartType;
  dataSource: string;
  dimensions: string[];
  measures: string[];
  x?: string;
  y?: string;
  color?: string;
  filters?: any[];
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  // Card specific properties
  cardTitle?: string;
  prefix?: string; 
  suffix?: string;
  aggregation?: "sum" | "average" | "count" | "max" | "min";
}

// Define dashboard type
export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  charts: ChartConfig[];
  layout?: any;
}
