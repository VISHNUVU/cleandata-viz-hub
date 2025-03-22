
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardTemplate } from "@/types/dashboard";
import { LayoutTemplate, Plus } from "lucide-react";

// Sample dashboard templates
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
  }
];

interface DashboardTemplatesProps {
  onSelectTemplate: (template: DashboardTemplate) => void;
}

const DashboardTemplates = ({ onSelectTemplate }: DashboardTemplatesProps) => {
  const [open, setOpen] = useState(false);
  
  const handleSelectTemplate = (template: DashboardTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <LayoutTemplate className="h-4 w-4" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Choose a Dashboard Template</DialogTitle>
          <DialogDescription>
            Select a template to quickly create a dashboard with pre-configured charts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {DASHBOARD_TEMPLATES.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="text-xs">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-1 p-2 w-full h-full opacity-70">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-300 dark:bg-gray-600 rounded" 
                        style={{ 
                          gridColumn: `span ${i % 3 === 0 ? 2 : 1}`,
                          gridRow: `span ${i % 4 === 0 ? 2 : 1}`
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTemplates;
