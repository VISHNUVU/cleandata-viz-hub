
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartConfig } from "@/pages/DashboardBuilder";
import { getAIChartSuggestions } from "@/services/aiChartSuggestions";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { Bot, Lightbulb, PlusCircle, Send, BarChart3, LineChart, PieChart, Activity, LayoutDashboard, Loader2 } from "lucide-react";

interface AIAssistantProps {
  dataSources: UploadedFile[];
  selectedDataSource: string;
  onAddChart: (chart: Partial<ChartConfig>) => void;
}

const suggestedPrompts = [
  "Suggest visualizations to show sales trends over time",
  "Create charts to analyze customer demographics",
  "Show me the best ways to visualize geographic data",
  "Recommend charts for financial performance metrics",
  "What's the best way to visualize inventory data?"
];

const AIAssistant = ({ 
  dataSources, 
  selectedDataSource, 
  onAddChart 
}: AIAssistantProps) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [explanation, setExplanation] = useState("");
  const [fields, setFields] = useState<string[]>([]);

  // Get fields from the selected data source
  useEffect(() => {
    if (selectedDataSource) {
      const dataSource = dataSources.find(ds => ds.id === selectedDataSource);
      if (dataSource && dataSource.columns) {
        setFields(dataSource.columns);
      } else {
        setFields([]);
      }
    }
  }, [selectedDataSource, dataSources]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDataSource) {
      toast({
        title: "No data source selected",
        description: "Please select a data source first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setSuggestions([]);
    try {
      const response = await getAIChartSuggestions({
        dataSource: selectedDataSource,
        fields: fields,
        prompt
      });

      setSuggestions(response.charts);
      setExplanation(response.explanation);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to get chart suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar': return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case 'line': return <LineChart className="h-4 w-4 text-green-500" />;
      case 'pie': 
      case 'donut': return <PieChart className="h-4 w-4 text-amber-500" />;
      case 'area': return <Activity className="h-4 w-4 text-purple-500" />;
      default: return <LayoutDashboard className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Chart AI Assistant</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Ask for chart suggestions..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading || !prompt || !selectedDataSource}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Ask
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedPrompts.map((suggestedPrompt, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => setPrompt(suggestedPrompt)}
              disabled={isLoading}
            >
              {suggestedPrompt}
            </Button>
          ))}
        </div>
      </form>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      )}

      {explanation && !isLoading && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
            <p className="text-sm">{explanation}</p>
          </div>
        </div>
      )}
      
      {suggestions.length > 0 && !isLoading && (
        <>
          <Separator className="my-3" />
          <h4 className="text-sm font-medium mb-3">Suggested Charts</h4>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="p-3 border rounded-md hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      {getChartIcon(suggestion.type)}
                    </div>
                    <div>
                      <h5 className="font-medium">{suggestion.title}</h5>
                      <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {suggestion.type} chart
                        </span>
                        {suggestion.x && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                            x: {suggestion.x}
                          </span>
                        )}
                        {suggestion.measures && suggestion.measures.length > 0 && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                            measures: {suggestion.measures.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddChart({
                      ...suggestion,
                      dataSource: selectedDataSource,
                      dimensions: suggestion.x ? [suggestion.x] : [],
                      y: suggestion.measures?.[0]
                    })}
                    className="ml-2"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {!explanation && !suggestions.length && !isLoading && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bot className="h-12 w-12 text-muted-foreground mb-3" />
          <h4 className="text-lg font-medium">Need chart suggestions?</h4>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Ask me to suggest charts based on your data or provide specific visualization ideas.
          </p>
          <div className="mt-4 space-y-2 w-full max-w-md">
            {fields.length > 0 ? (
              <div className="p-3 bg-muted/30 rounded-md text-xs text-left">
                <p className="font-medium mb-1">Available fields in this dataset:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {fields.map((field, index) => (
                    <span key={index} className="inline-block px-2 py-0.5 bg-muted rounded-full">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {selectedDataSource ? 
                  "No fields found in the selected data source." : 
                  "Please select a data source to get started."}
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AIAssistant;
