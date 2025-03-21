
import { useState, useEffect } from "react";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  AreaChart, 
  ScatterChart,
  Bar, 
  Line, 
  Pie, 
  Area, 
  Scatter,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ChartConfig } from "@/pages/DashboardBuilder";
import { getMockFileData } from "@/services/mockDataService";
import { getFileData } from "@/services/fileDataService";

interface ChartComponentProps {
  config: ChartConfig;
}

// Sample color palette
const COLORS = [
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

const ChartComponent = ({ config }: ChartComponentProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data based on the data source ID
        const fileData = await getFileData(config.dataSource);
        
        if (fileData && fileData.rows) {
          setData(fileData.rows);
        } else {
          // Fallback to mock data for demo purposes
          const mockData = await getMockFileData(config.dataSource);
          if (mockData && mockData.rows) {
            setData(mockData.rows);
          } else {
            setError("No data available");
          }
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Failed to load chart data");
        
        // Use sample data for development purposes
        setData(getSampleData(config.type));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [config.dataSource, config.type]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading chart data...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  // Render appropriate chart based on type
  switch (config.type) {
    case "bar":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
                  fill={COLORS[index % COLORS.length]} 
                />
              ))
            ) : (
              <Bar 
                dataKey={config.y || Object.keys(data[0])[1]} 
                fill="#4F46E5" 
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
      
    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
                  stroke={COLORS[index % COLORS.length]} 
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
          </LineChart>
        </ResponsiveContainer>
      );
      
    case "pie":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={config.y || Object.keys(data[0])[1]}
              nameKey={config.x || Object.keys(data[0])[0]}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
      
    case "area":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
                  stroke={COLORS[index % COLORS.length]} 
                  fill={COLORS[index % COLORS.length]} 
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
          </AreaChart>
        </ResponsiveContainer>
      );
      
    case "scatter":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
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
          </ScatterChart>
        </ResponsiveContainer>
      );
      
    case "donut":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey={config.y || Object.keys(data[0])[1]}
              nameKey={config.x || Object.keys(data[0])[0]}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
      
    default:
      return <div>Unsupported chart type: {config.type}</div>;
  }
};

// Helper function to generate sample data for different chart types
function getSampleData(chartType: string): any[] {
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

export default ChartComponent;
