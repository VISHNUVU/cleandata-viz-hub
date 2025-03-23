
interface ChartSuggestionRequest {
  dataSource: string;
  fields?: string[];
  prompt?: string;
}

interface ChartSuggestion {
  title: string;
  description: string;
  type: string;
  x?: string;
  measures?: string[];
}

interface ChartSuggestionResponse {
  charts: ChartSuggestion[];
  explanation: string;
}

export async function getAIChartSuggestions(
  request: ChartSuggestionRequest
): Promise<ChartSuggestionResponse> {
  try {
    const { dataSource, fields, prompt } = request;

    const response = await fetch("/functions/v1/generate-chart-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataSource,
        fields: fields || [],
        prompt: prompt || "",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to get AI chart suggestions"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting AI chart suggestions:", error);
    
    // Return a default response in case of error
    return {
      charts: [
        {
          title: "Bar Chart",
          description: "Standard bar chart for comparing values",
          type: "bar",
          x: "category",
          measures: ["value"]
        },
        {
          title: "Line Chart",
          description: "Time series visualization",
          type: "line",
          x: "date",
          measures: ["value"]
        },
        {
          title: "Pie Chart",
          description: "Distribution across categories",
          type: "pie",
          x: "category",
          measures: ["value"]
        }
      ],
      explanation: "These are default suggestions. For better suggestions, please try again."
    };
  }
}
