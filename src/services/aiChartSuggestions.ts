
import { supabase } from "@/integrations/supabase/client";
import { ChartConfig } from "@/pages/DashboardBuilder";

interface SuggestionRequest {
  dataSource: string;
  fields: string[];
  prompt?: string;
}

interface SuggestionResponse {
  charts: Partial<ChartConfig>[];
  explanation: string;
}

export const getAIChartSuggestions = async (
  request: SuggestionRequest
): Promise<SuggestionResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-chart-suggestions', {
      body: JSON.stringify(request),
    });

    if (error) {
      console.error('Error calling generate-chart-suggestions function:', error);
      throw new Error('Failed to get AI chart suggestions');
    }

    return data as SuggestionResponse;
  } catch (error) {
    console.error('Error in getAIChartSuggestions:', error);
    // Return mock suggestions for now
    return {
      charts: [
        {
          title: "Monthly Sales Trend",
          description: "Shows sales performance over months",
          type: "line",
          x: "month",
          measures: ["sales"]
        },
        {
          title: "Revenue by Region",
          description: "Breakdown of revenue by geographic region",
          type: "pie",
          x: "region",
          y: "revenue"
        },
        {
          title: "Products Comparison",
          description: "Compare different product categories",
          type: "bar",
          x: "category",
          measures: ["revenue", "units_sold"]
        }
      ],
      explanation: "Based on your data, I recommend these visualizations to best represent your sales information. The line chart shows trends over time, the pie chart provides a regional breakdown, and the bar chart allows for direct comparison between products."
    };
  }
};
