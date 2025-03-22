
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

// Predefined color schemes
export const COLOR_SCHEMES = {
  // Indigo blues
  indigo: ["#4F46E5", "#6366F1", "#818CF8", "#A5B4FC", "#C7D2FE"],
  // Reds to oranges
  firefly: ["#EF4444", "#F59E0B", "#F97316", "#FB923C", "#FEB273"],
  // Blues to greens
  ocean: ["#0EA5E9", "#22D3EE", "#2DD4BF", "#10B981", "#34D399"],
  // Purples to pinks
  twilight: ["#8B5CF6", "#A78BFA", "#C084FC", "#E879F9", "#F472B6"],
  // Greens to yellows
  forest: ["#22C55E", "#84CC16", "#BEF264", "#FDE047", "#FACC15"]
};

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

// Get color palette based on selected scheme
export const getColorPalette = (colorScheme?: number) => {
  if (colorScheme === undefined || colorScheme < 0 || colorScheme >= CHART_COLORS.length) {
    return CHART_COLORS; // Default
  }
  
  // Starting from the selected color, create a palette
  const baseColor = CHART_COLORS[colorScheme];
  const palette = [baseColor];
  
  // Add variations by cycling through the other colors
  for (let i = 1; i < 5; i++) {
    palette.push(CHART_COLORS[(colorScheme + i) % CHART_COLORS.length]);
  }
  
  return palette;
};

// Format percent for display
export const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};

// Calculate percent change
export const calculatePercentChange = (current: number, previous: number) => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};
