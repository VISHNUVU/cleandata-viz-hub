
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChartConfig, ChartType } from "@/pages/DashboardBuilder";
import { UploadedFile } from "@/types/file";
import { getFileData } from "@/services/fileDataService";
import { Check, X, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import DataSourceSelector from "./DataSourceSelector";

interface ChartConfigPanelProps {
  chart: ChartConfig;
  dataSources: UploadedFile[];
  onUpdateChart: (updatedChart: ChartConfig) => void;
}

const ChartConfigPanel = ({ chart, dataSources, onUpdateChart }: ChartConfigPanelProps) => {
  const [editedChart, setEditedChart] = useState<ChartConfig>({...chart});
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState("data");

  useEffect(() => {
    // Reset the edited chart when the input chart changes
    setEditedChart({...chart});
  }, [chart]);

  useEffect(() => {
    // Fetch data columns when data source changes
    const fetchDataColumns = async () => {
      if (editedChart.dataSource) {
        try {
          const fileData = await getFileData(editedChart.dataSource);
          if (fileData && fileData.rows && fileData.rows.length > 0) {
            const fields = Object.keys(fileData.rows[0]);
            setAvailableFields(fields);
          } else {
            setAvailableFields([]);
          }
        } catch (error) {
          console.error("Error fetching data columns:", error);
          setAvailableFields([]);
        }
      }
    };
    
    fetchDataColumns();
  }, [editedChart.dataSource]);

  const handleSaveChanges = () => {
    onUpdateChart(editedChart);
  };

  const handleFieldToggle = (field: string, type: 'dimension' | 'measure') => {
    const currentList = type === 'dimension' ? [...(editedChart.dimensions || [])] : [...(editedChart.measures || [])];
    
    if (currentList.includes(field)) {
      // Remove the field if it's already selected
      const updatedList = currentList.filter(f => f !== field);
      setEditedChart({
        ...editedChart,
        [type === 'dimension' ? 'dimensions' : 'measures']: updatedList
      });
    } else {
      // Add the field if it's not already selected
      const updatedList = [...currentList, field];
      setEditedChart({
        ...editedChart,
        [type === 'dimension' ? 'dimensions' : 'measures']: updatedList
      });
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="data" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="data-source">Data Source</Label>
                <div className="mt-1">
                  <DataSourceSelector
                    dataSources={dataSources}
                    selectedSource={editedChart.dataSource}
                    onSelectSource={(sourceId) => setEditedChart({...editedChart, dataSource: sourceId})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="chart-type">Chart Type</Label>
                <Select 
                  value={editedChart.type} 
                  onValueChange={(value) => setEditedChart({...editedChart, type: value as ChartType})}
                >
                  <SelectTrigger id="chart-type" className="mt-1">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                    <SelectItem value="donut">Donut Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(editedChart.type === 'bar' || editedChart.type === 'line' || editedChart.type === 'area') && (
                <>
                  <div>
                    <Label htmlFor="x-axis">X Axis</Label>
                    <Select 
                      value={editedChart.x || ''} 
                      onValueChange={(value) => setEditedChart({...editedChart, x: value})}
                    >
                      <SelectTrigger id="x-axis" className="mt-1">
                        <SelectValue placeholder="Select X axis field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map(field => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Measures (Y Axis)</Label>
                    <ScrollArea className="h-[150px] border rounded-md p-2 mt-1">
                      {availableFields.map(field => (
                        <div key={field} className="flex items-center space-x-2 py-1">
                          <Button
                            type="button"
                            variant={editedChart.measures?.includes(field) ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleFieldToggle(field, 'measure')}
                          >
                            {editedChart.measures?.includes(field) ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : (
                              <span className="w-4 mr-2" />
                            )}
                            {field}
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </>
              )}
              
              {(editedChart.type === 'pie' || editedChart.type === 'donut') && (
                <>
                  <div>
                    <Label htmlFor="name-field">Name Field</Label>
                    <Select 
                      value={editedChart.x || ''} 
                      onValueChange={(value) => setEditedChart({...editedChart, x: value})}
                    >
                      <SelectTrigger id="name-field" className="mt-1">
                        <SelectValue placeholder="Select name field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map(field => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="value-field">Value Field</Label>
                    <Select 
                      value={editedChart.y || ''} 
                      onValueChange={(value) => setEditedChart({...editedChart, y: value})}
                    >
                      <SelectTrigger id="value-field" className="mt-1">
                        <SelectValue placeholder="Select value field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields.map(field => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="chart-title">Chart Title</Label>
                <Input
                  id="chart-title"
                  value={editedChart.title}
                  onChange={(e) => setEditedChart({...editedChart, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="chart-description">Description (optional)</Label>
                <Textarea
                  id="chart-description"
                  value={editedChart.description || ''}
                  onChange={(e) => setEditedChart({...editedChart, description: e.target.value})}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Chart Colors</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {["#4F46E5", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"].map((color) => (
                    <div 
                      key={color} 
                      className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="legend-position">Legend Position</Label>
                <Select defaultValue="bottom">
                  <SelectTrigger id="legend-position" className="mt-1">
                    <SelectValue placeholder="Select legend position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="show-grid"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
                <div className="text-sm leading-6">
                  <Label htmlFor="show-grid">Show Grid Lines</Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="show-labels"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
                <div className="text-sm leading-6">
                  <Label htmlFor="show-labels">Show Data Labels</Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="animate"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
                <div className="text-sm leading-6">
                  <Label htmlFor="animate">Enable Animations</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="chart-width">Width (px)</Label>
                <Input
                  id="chart-width"
                  type="number"
                  defaultValue="600"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="chart-height">Height (px)</Label>
                <Input
                  id="chart-height"
                  type="number"
                  defaultValue="400"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Data Refresh</Label>
                <Select defaultValue="manual">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select refresh mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="hourly">Every Hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="export-enabled"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked
                  />
                </div>
                <div className="text-sm leading-6">
                  <Label htmlFor="export-enabled">Enable Export</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button variant="outline" className="mr-2" onClick={() => onUpdateChart(chart)}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ChartConfigPanel;
