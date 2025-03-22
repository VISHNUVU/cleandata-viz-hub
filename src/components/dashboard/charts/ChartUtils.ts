
// Sample color palette for charts
export const CHART_COLORS = [
  "#4F46E5", // indigo-600
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EC4899", // pink-500
  "#8B5CF6", // violet-500
  "#6366F1", // indigo-500
  "#06B6D4", // cyan-500
  "#84CC16", // lime-500
  "#F97316"  // orange-500
];

// Helper function to generate sample data for different chart types
export function getSampleData(chartType: string): any[] {
  switch (chartType) {
    case "pie":
    case "donut":
      return [
        { name: "North America", value: 400 },
        { name: "Europe", value: 300 },
        { name: "Asia", value: 500 },
        { name: "South America", value: 200 },
        { name: "Africa", value: 100 }
      ];
    
    case "scatter":
      return [
        { x: 10, y: 30, z: 100 },
        { x: 40, y: 50, z: 200 },
        { x: 70, y: 20, z: 300 },
        { x: 30, y: 80, z: 150 },
        { x: 50, y: 10, z: 250 }
      ];
    
    case "card":
      return [
        { value: 1250 }
      ];
      
    default:
      return [
        { name: "Jan", value: 400, category: "A" },
        { name: "Feb", value: 300, category: "B" },
        { name: "Mar", value: 600, category: "C" },
        { name: "Apr", value: 200, category: "D" },
        { name: "May", value: 500, category: "E" },
        { name: "Jun", value: 350, category: "F" },
        { name: "Jul", value: 450, category: "G" }
      ];
  }
}

// Format value for card display
export const formatValue = (value: number | null) => {
  if (value === null) return "N/A";
  
  // Format based on the value magnitude
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  
  return value.toLocaleString(undefined, { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};
