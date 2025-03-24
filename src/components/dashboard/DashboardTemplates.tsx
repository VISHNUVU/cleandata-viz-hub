
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardTemplate } from "@/types/dashboard";
import { LayoutTemplate, Plus, BarChart, LineChart, PieChart, CreditCard, TrendingUp, Activity, Layers } from "lucide-react";
import { UploadedFile } from "@/types/file";
import { getAIChartSuggestions } from "@/services/aiChartSuggestions";
import { useToast } from "@/hooks/use-toast";

// Template types for different use cases
const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    description: "Track sales, revenue, and customer metrics",
    charts: [
      {
        type: "card",
        title: "Total Revenue",
        position: { x: 0, y: 0, w: 3, h: 2 },
        prefix: "$"
      },
      {
        type: "card",
        title: "Total Orders",
        position: { x: 3, y: 0, w: 3, h: 2 }
      },
      {
        type: "bar",
        title: "Sales by Region",
        position: { x: 0, y: 2, w: 6, h: 4 }
      },
      {
        type: "line",
        title: "Revenue Trend",
        position: { x: 6, y: 0, w: 6, h: 4 }
      },
      {
        type: "pie",
        title: "Sales by Category",
        position: { x: 6, y: 4, w: 6, h: 4 }
      }
    ]
  },
  {
    id: "marketing-dashboard",
    name: "Marketing Dashboard",
    description: "Track campaigns, website traffic, and conversions",
    charts: [
      {
        type: "card",
        title: "Total Visitors",
        position: { x: 0, y: 0, w: 3, h: 2 }
      },
      {
        type: "card",
        title: "Conversion Rate",
        position: { x: 3, y: 0, w: 3, h: 2 },
        suffix: "%"
      },
      {
        type: "area",
        title: "Traffic Over Time",
        position: { x: 0, y: 2, w: 6, h: 4 }
      },
      {
        type: "bar",
        title: "Traffic by Source",
        position: { x: 6, y: 0, w: 6, h: 4 }
      },
      {
        type: "pie",
        title: "Traffic by Device",
        position: { x: 6, y: 4, w: 6, h: 4 }
      }
    ]
  },
  {
    id: "operations-dashboard",
    name: "Operations Dashboard",
    description: "Track inventory, logistics, and operational metrics",
    charts: [
      {
        type: "card",
        title: "On-time Delivery",
        position: { x: 0, y: 0, w: 3, h: 2 },
        suffix: "%"
      },
      {
        type: "card",
        title: "Inventory Items",
        position: { x: 3, y: 0, w: 3, h: 2 }
      },
      {
        type: "line",
        title: "Delivery Times",
        position: { x: 0, y: 2, w: 6, h: 4 }
      },
      {
        type: "bar",
        title: "Inventory by Location",
        position: { x: 6, y: 0, w: 6, h: 4 }
      },
      {
        type: "area",
        title: "Stock Levels Over Time",
        position: { x: 6, y: 4, w: 6, h: 4 }
      }
    ]
  },
  {
    id: "financial-dashboard",
    name: "Financial Dashboard",
    description: "Track financial performance, expenses, and budgets",
    charts: [
      {
        type: "card",
        title: "Total Revenue",
        position: { x: 0, y: 0, w: 3, h: 2 },
        prefix: "$"
      },
      {
        type: "card",
        title: "Profit Margin",
        position: { x: 3, y: 0, w: 3, h: 2 },
        suffix: "%"
      },
      {
        type: "line",
        title: "Revenue vs Expenses",
        position: { x: 0, y: 2, w: 6, h: 4 }
      },
      {
        type: "bar",
        title: "Expenses by Category",
        position: { x: 6, y: 0, w: 6, h: 4 }
      },
      {
        type: "pie",
        title: "Revenue by Product",
        position: { x: 6, y: 4, w: 6, h: 4 }
      }
    ]
  }
];

interface DashboardTemplatesProps {
  onSelectTemplate: (template: DashboardTemplate) => void;
  availableDataSources: UploadedFile[];
}

const DashboardTemplates = ({ onSelectTemplate, availableDataSources }: DashboardTemplatesProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiTemplate, setAiTemplate] = useState<DashboardTemplate | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (availableDataSources.length > 0) {
      setSelectedDataSource(availableDataSources[0].id);
    }
  }, [availableDataSources]);

  const handleSelectTemplate = (template: DashboardTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const generateAIDashboard = async () => {
    if (!selectedDataSource) {
      toast({
        title: "No data source selected",
        description: "Please select a data source first.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      // Get the data source details
      const dataSource = availableDataSources.find(ds => ds.id === selectedDataSource);
      if (!dataSource) throw new Error("Data source not found");
      
      // Get fields from the data source
      const fields = dataSource.columns || [];
      
      // Ask the AI for chart suggestions
      const response = await getAIChartSuggestions({
        dataSource: selectedDataSource,
        fields: fields,
        prompt: "Generate a complete dashboard with different chart types for this data"
      });

      // Create an AI-generated template based on the suggestions
      const aiTemplate: DashboardTemplate = {
        id: "ai-generated",
        name: `AI Dashboard for ${dataSource.name}`,
        description: response.explanation || "AI-generated dashboard based on your data",
        charts: response.charts.map((chart, index) => {
          // Calculate position in a grid layout
          const row = Math.floor(index / 2);
          const col = index % 2;
          
          let width = 6;
          let height = 4;
          
          if (chart.type === 'card') {
            width = 3;
            height = 2;
          }
          
          return {
            type: chart.type as any,
            title: chart.title,
            description: chart.description,
            position: {
              x: col * 6,
              y: row * 4,
              w: width,
              h: height
            },
            x: chart.x,
            measures: chart.measures,
            dataSource: selectedDataSource
          };
        })
      };

      setAiTemplate(aiTemplate);
    } catch (error) {
      console.error("Error generating AI dashboard:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI dashboard. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };
  
  const getTemplateIcon = (id: string) => {
    switch (id) {
      case 'sales-dashboard': return <BarChart className="h-8 w-8 text-blue-500" />;
      case 'marketing-dashboard': return <TrendingUp className="h-8 w-8 text-green-500" />;
      case 'operations-dashboard': return <Layers className="h-8 w-8 text-amber-500" />;
      case 'financial-dashboard': return <CreditCard className="h-8 w-8 text-purple-500" />;
      case 'ai-generated': return <Activity className="h-8 w-8 text-rose-500" />;
      default: return <LayoutTemplate className="h-8 w-8 text-gray-500" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Dashboard Template</DialogTitle>
          <DialogDescription>
            Select a template to quickly create a dashboard with pre-configured charts.
          </DialogDescription>
        </DialogHeader>
        
        {availableDataSources.length > 0 && (
          <div className="mb-6 p-4 bg-muted/40 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Generate AI Dashboard</h3>
            <div className="flex items-center gap-3">
              <select 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={selectedDataSource}
                onChange={(e) => setSelectedDataSource(e.target.value)}
                disabled={isGeneratingAI}
              >
                {availableDataSources.map(ds => (
                  <option key={ds.id} value={ds.id}>{ds.name}</option>
                ))}
              </select>
              <Button
                onClick={generateAIDashboard}
                disabled={isGeneratingAI || !selectedDataSource}
                className="whitespace-nowrap"
              >
                {isGeneratingAI ? "Generating..." : "Generate AI Dashboard"}
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {DASHBOARD_TEMPLATES.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                <div>
                  {getTemplateIcon(template.id)}
                </div>
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-xs">{template.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-4 gap-1 p-2 w-full h-full opacity-70">
                    {template.charts.map((chart, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-300 dark:bg-gray-600 rounded" 
                        style={{ 
                          gridColumn: `span ${chart.type === 'card' ? 1 : 2}`,
                          gridRow: `span ${chart.type === 'card' ? 1 : 2}`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-xs"
                  onClick={() => handleSelectTemplate(template)}
                >
                  Use This Template
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {aiTemplate && (
            <Card className="overflow-hidden border-rose-200 dark:border-rose-800 hover:border-rose-500 transition-colors">
              <CardHeader className="pb-2 flex flex-row items-center gap-2 bg-rose-50 dark:bg-rose-950/30">
                <div>
                  <Activity className="h-8 w-8 text-rose-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">{aiTemplate.name}</CardTitle>
                  <CardDescription className="text-xs">{aiTemplate.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-4 gap-1 p-2 w-full h-full opacity-70">
                    {aiTemplate.charts.map((chart, i) => (
                      <div 
                        key={i} 
                        className="bg-rose-200 dark:bg-rose-800/50 rounded" 
                        style={{ 
                          gridColumn: `span ${chart.type === 'card' ? 1 : 2}`,
                          gridRow: `span ${chart.type === 'card' ? 1 : 2}`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-xs"
                  onClick={() => handleSelectTemplate(aiTemplate)}
                  variant="secondary"
                >
                  Use AI-Generated Template
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTemplates;
