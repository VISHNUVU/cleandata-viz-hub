
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ChartConfig } from "@/pages/DashboardBuilder";
import { getAIChartSuggestions } from "@/services/aiChartSuggestions";
import { UploadedFile } from "@/types/file";
import { useToast } from "@/hooks/use-toast";
import { Bot, Lightbulb, PlusCircle, Send } from "lucide-react";

interface AIAssistantProps {
  dataSources: UploadedFile[];
  selectedDataSource: string;
  onAddChart: (chart: Partial<ChartConfig>) => void;
}

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
    try {
      const response = await getAIChartSuggestions({
        dataSource: selectedDataSource,
        fields: [],
        prompt
      });

      setSuggestions(response.charts);
      setExplanation(response.explanation);
      setPrompt("");
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

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Chart AI Assistant</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask for chart suggestions..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading || !prompt}>
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Ask
              </>
            )}
          </Button>
        </div>
      </form>

      {explanation && (
        <div className="mb-4 p-3 bg-muted/50 rounded-md">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
            <p className="text-sm">{explanation}</p>
          </div>
        </div>
      )}
      
      {suggestions.length > 0 && (
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
                  <div>
                    <h5 className="font-medium">{suggestion.title}</h5>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        {suggestion.type} chart
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddChart(suggestion)}
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
      
      {!explanation && !suggestions.length && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bot className="h-12 w-12 text-muted-foreground mb-3" />
          <h4 className="text-lg font-medium">Need some help?</h4>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Ask me to suggest charts based on your data or provide specific visualization ideas.
          </p>
          <div className="mt-4 space-y-2 w-full max-w-md">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => setPrompt("Suggest visualizations to show sales trends over time")}
            >
              <span className="truncate">Suggest visualizations to show sales trends over time</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => setPrompt("Create a dashboard for geographic data analysis")}
            >
              <span className="truncate">Create a dashboard for geographic data analysis</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-2"
              onClick={() => setPrompt("Help me visualize customer segmentation data")}
            >
              <span className="truncate">Help me visualize customer segmentation data</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AIAssistant;
