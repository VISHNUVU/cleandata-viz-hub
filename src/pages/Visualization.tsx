
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  BarChart3, 
  ChevronDown, 
  Download, 
  Filter, 
  LineChart, 
  PieChart as PieChartIcon, 
  RefreshCw, 
  Save, 
  Share2 
} from "lucide-react";
import { BarChart, AreaChart as RechartArea, LineChart as RechartLine, PieChart, Radar } from "recharts";

const sampleData = [
  { name: "Jan", value: 400, category: "A" },
  { name: "Feb", value: 300, category: "B" },
  { name: "Mar", value: 600, category: "C" },
  { name: "Apr", value: 200, category: "D" },
  { name: "May", value: 500, category: "E" },
  { name: "Jun", value: 350, category: "F" },
  { name: "Jul", value: 450, category: "G" },
];

const pieData = [
  { name: "North America", value: 400 },
  { name: "Europe", value: 300 },
  { name: "Asia", value: 500 },
  { name: "South America", value: 200 },
  { name: "Africa", value: 100 },
];

export default function Visualization() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
            <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
            Interactive Charts
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Visualization</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Create and customize interactive visualizations from your data.</p>
        </div>
        
        {/* Visualization Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chart Builder Area */}
          <div className="col-span-1 lg:col-span-3 space-y-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Toolbar */}
            <Card className="glass-card p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Filter Data
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <span>Sales Data</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Save className="h-3.5 w-3.5" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Chart Visualization Area */}
            <Card className="glass-card overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Monthly Sales Analysis</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Visualization of monthly sales performance by category</p>
              </div>
              
              <Tabs defaultValue="bar" className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="bar" className="flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4" />
                      <span>Bar</span>
                    </TabsTrigger>
                    <TabsTrigger value="line" className="flex items-center gap-1.5">
                      <LineChart className="h-4 w-4" />
                      <span>Line</span>
                    </TabsTrigger>
                    <TabsTrigger value="area" className="flex items-center gap-1.5">
                      <AreaChart className="h-4 w-4" />
                      <span>Area</span>
                    </TabsTrigger>
                    <TabsTrigger value="pie" className="flex items-center gap-1.5">
                      <PieChartIcon className="h-4 w-4" />
                      <span>Pie</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full bg-primary mr-1.5"></div>
                      <span className="text-gray-600 dark:text-gray-400">Value</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-1.5"></div>
                      <span className="text-gray-600 dark:text-gray-400">Category</span>
                    </div>
                  </div>
                </div>
                
                <TabsContent value="bar" className="mt-0">
                  <div className="h-[400px] w-full flex justify-center items-center">
                    <BarChart
                      width={800}
                      height={400}
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <legend />
                      <bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </div>
                </TabsContent>
                
                <TabsContent value="line" className="mt-0">
                  <div className="h-[400px] w-full flex justify-center items-center">
                    <RechartLine
                      width={800}
                      height={400}
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <legend />
                      <line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </RechartLine>
                  </div>
                </TabsContent>
                
                <TabsContent value="area" className="mt-0">
                  <div className="h-[400px] w-full flex justify-center items-center">
                    <RechartArea
                      width={800}
                      height={400}
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
                    </RechartArea>
                  </div>
                </TabsContent>
                
                <TabsContent value="pie" className="mt-0">
                  <div className="h-[400px] w-full flex justify-center items-center">
                    <PieChart
                      width={400}
                      height={400}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <pie
                        data={pieData}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={140}
                        paddingAngle={1}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'][index % 4]} />
                        ))}
                      </pie>
                      <tooltip />
                      <legend />
                    </PieChart>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Chart Customization */}
            <Card className="glass-card p-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Chart Customization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chart Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter chart title"
                    defaultValue="Monthly Sales Analysis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">X-Axis Label</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="X-Axis label"
                    defaultValue="Month"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Y-Axis Label</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Y-Axis label"
                    defaultValue="Sales Value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Scheme</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Default</option>
                    <option>Blues</option>
                    <option>Greens</option>
                    <option>Purples</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legend Position</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Top</option>
                    <option>Bottom</option>
                    <option>Left</option>
                    <option>Right</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grid Lines</label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Show Both</option>
                    <option>X-Axis Only</option>
                    <option>Y-Axis Only</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>
                  Apply Changes
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="glass-card p-6 sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Chart Templates</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors hover:border-primary/50">
                  <BarChart3 className="h-5 w-5 text-primary mr-3" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Basic Bar Chart</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Compare values across categories</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors hover:border-primary/50">
                  <LineChart className="h-5 w-5 text-blue-500 mr-3" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Trend Line Chart</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Show data changes over time</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors hover:border-primary/50">
                  <PieChartIcon className="h-5 w-5 text-emerald-500 mr-3" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Distribution Pie Chart</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Show proportional distribution</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors hover:border-primary/50">
                  <AreaChart className="h-5 w-5 text-indigo-500 mr-3" />
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Area Chart</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Highlight total volume changes</p>
                  </div>
                </button>
              </div>
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Data Sources</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="sales-data" name="data-source" className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" defaultChecked />
                    <label htmlFor="sales-data" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Sales Data (2023)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="customer-feedback" name="data-source" className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" />
                    <label htmlFor="customer-feedback" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Customer Feedback
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="product-inventory" name="data-source" className="h-4 w-4 text-primary border-gray-300 focus:ring-primary" />
                    <label htmlFor="product-inventory" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Product Inventory
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Browse All Templates
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
