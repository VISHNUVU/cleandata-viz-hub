
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AreaChart, BarChart, LineChart, PieChart } from "recharts";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Download, 
  FileUp, 
  Filter, 
  LineChart as LineChartIcon, 
  MoreHorizontal, 
  PieChart as PieChartIcon, 
  RefreshCw, 
  ShoppingBag, 
  Users 
} from "lucide-react";

const sampleData = [
  { name: "Jan", sales: 4000, revenue: 2400, amt: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398, amt: 2210 },
  { name: "Mar", sales: 2000, revenue: 9800, amt: 2290 },
  { name: "Apr", sales: 2780, revenue: 3908, amt: 2000 },
  { name: "May", sales: 1890, revenue: 4800, amt: 2181 },
  { name: "Jun", sales: 2390, revenue: 3800, amt: 2500 },
  { name: "Jul", sales: 3490, revenue: 4300, amt: 2100 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Last updated 3 minutes ago
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Welcome back, Alex</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here's an overview of your data analytics for today.
          </p>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <Card className="p-6 glass-card hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold">$24,532</h3>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <ArrowUp className="w-3.5 h-3.5 mr-1" />
                  <span>12.5%</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                <h3 className="text-2xl font-bold">8,945</h3>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <ArrowUp className="w-3.5 h-3.5 mr-1" />
                  <span>4.6%</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
                <h3 className="text-2xl font-bold">1,257</h3>
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                  <ArrowDown className="w-3.5 h-3.5 mr-1" />
                  <span>2.3%</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card hover-lift">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Files Processed</p>
                <h3 className="text-2xl font-bold">452</h3>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <ArrowUp className="w-3.5 h-3.5 mr-1" />
                  <span>8.1%</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FileUp className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <Card className="overflow-hidden glass-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Analytics</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <Tabs defaultValue="line">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="line" className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <LineChartIcon className="h-4 w-4" />
                      <span>Line</span>
                    </TabsTrigger>
                    <TabsTrigger value="bar" className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <BarChart3 className="h-4 w-4" />
                      <span>Bar</span>
                    </TabsTrigger>
                    <TabsTrigger value="area" className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <BarChart3 className="h-4 w-4" />
                      <span>Area</span>
                    </TabsTrigger>
                    <TabsTrigger value="pie" className="flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                      <PieChartIcon className="h-4 w-4" />
                      <span>Pie</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Sales</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
                    </div>
                  </div>
                </div>
                
                <TabsContent value="line" className="pt-2">
                  <div className="h-80 w-full">
                    <LineChart 
                      width={800} 
                      height={300} 
                      data={sampleData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </div>
                </TabsContent>
                
                <TabsContent value="bar" className="pt-2">
                  <div className="h-80 w-full">
                    <BarChart
                      width={800}
                      height={300}
                      data={sampleData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </div>
                </TabsContent>
                
                <TabsContent value="area" className="pt-2">
                  <div className="h-80 w-full">
                    <AreaChart
                      width={800}
                      height={300}
                      data={sampleData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <cartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <xAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <yAxis tick={{ fill: '#6b7280' }} />
                      <tooltip />
                      <area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" />
                      <area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </div>
                </TabsContent>
                
                <TabsContent value="pie" className="pt-2">
                  <div className="h-80 w-full flex justify-center items-center">
                    <PieChart width={400} height={300}>
                      <pie
                        data={pieData}
                        cx={200}
                        cy={150}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : ['#3b82f6', '#10b981', '#f59e0b'][index % 3]} />
                        ))}
                      </pie>
                      <tooltip />
                    </PieChart>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>
        
        {/* Recent Activities */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="glass-card">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <FileUp className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">New file uploaded</p>
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">Completed</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">sales_data_2023.csv • 4.2 MB</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Today, 10:23 AM</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Filter className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Data cleansing completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">customer_feedback.xlsx • 2.8 MB</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Yesterday, 3:45 PM</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">New visualization created</p>
                      <span className="text-xs px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 rounded-full">Processing</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">product_inventory.json</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Nov 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
