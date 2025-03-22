
import { useState, useEffect } from "react";
import { ChartConfig } from "@/types/dashboard";
import { getFileData } from "@/services/fileDataService";
import { getMockFileData } from "@/services/mockDataService";
import { getSampleData } from "./ChartUtils";

export function useChartData(config: ChartConfig) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aggregatedValue, setAggregatedValue] = useState<number | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data based on the data source ID
        const fileData = await getFileData(config.dataSource);
        
        if (fileData && fileData.rows) {
          let processedData = [...fileData.rows];
          
          // Apply filtering if filter options are specified
          if (config.filterField && config.filterOperator && config.filterValue !== undefined) {
            processedData = processedData.filter(row => {
              const fieldValue = row[config.filterField || ""];
              const filterValue = config.filterValue;
              
              switch (config.filterOperator) {
                case "equals":
                  return fieldValue == filterValue; // Using loose equality for string/number comparison
                case "not-equals":
                  return fieldValue != filterValue;
                case "greater-than":
                  return Number(fieldValue) > Number(filterValue);
                case "less-than":
                  return Number(fieldValue) < Number(filterValue);
                case "contains":
                  return String(fieldValue).toLowerCase().includes(String(filterValue).toLowerCase());
                default:
                  return true;
              }
            });
          }
          
          setData(processedData);
          
          // Calculate aggregated value for card type
          if (config.type === "card" && config.y) {
            const values = processedData.map((row: any) => Number(row[config.y || ""]));
            const validValues = values.filter((value: number) => !isNaN(value));
            
            if (validValues.length > 0) {
              // Calculate current value (usually the sum or average)
              let currentValue = 0;
              if (config.aggregation === "sum") {
                currentValue = validValues.reduce((acc: number, val: number) => acc + val, 0);
              } else if (config.aggregation === "average") {
                currentValue = validValues.reduce((acc: number, val: number) => acc + val, 0) / validValues.length;
              } else if (config.aggregation === "max") {
                currentValue = Math.max(...validValues);
              } else if (config.aggregation === "min") {
                currentValue = Math.min(...validValues);
              } else if (config.aggregation === "count") {
                currentValue = validValues.length;
              } else {
                // Default to sum
                currentValue = validValues.reduce((acc: number, val: number) => acc + val, 0);
              }
              
              setAggregatedValue(currentValue);
              
              // Set a mock previous value for comparison
              // In a real app, this would come from historical data
              setPreviousValue(currentValue * (Math.random() * (1.2 - 0.8) + 0.8));
            }
          }
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
        
        // For cards, set some sample aggregated data
        if (config.type === "card") {
          setAggregatedValue(Math.round(Math.random() * 10000));
          setPreviousValue(Math.round(Math.random() * 10000));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [config.dataSource, config.type, config.y, config.aggregation, config.filterField, config.filterOperator, config.filterValue]);

  return { data, isLoading, error, aggregatedValue, previousValue };
}
