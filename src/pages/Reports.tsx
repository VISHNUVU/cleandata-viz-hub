
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertCircle, 
  BarChart2, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Download, 
  Eye, 
  File, 
  FileText, 
  MoreHorizontal, 
  Plus, 
  RefreshCw, 
  Share2 
} from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Analytics Reports
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Generate, save, and share data analysis reports.</p>
            </div>
            <Button className="sm:self-start flex items-center gap-1.5">
              <Plus className="h-4 w-4" />
              Create New Report
            </Button>
          </div>
        </div>
        
        {/* Reports List */}
        <div className="space-y-6">
          {/* Filters and Actions */}
          <div className="flex flex-wrap gap-4 items-center justify-between animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Search reports..."
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Calendar className="h-4 w-4" />
                <span>Date Range</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <span>Status: All</span>
                <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Reports Cards */}
          <Card className="glass-card overflow-hidden animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Report Item 1 */}
              <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Q4 Sales Performance Analysis</h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100">
                          Complete
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comprehensive analysis of Q4 sales performance by region and product category.</p>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          December 15, 2023
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Last updated 3 days ago
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <File className="h-3.5 w-3.5 mr-1" />
                          PDF, Excel
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Report Item 2 */}
              <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Satisfaction Survey Results</h3>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-100">
                          In Progress
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analysis of customer feedback survey responses for Q3 2023.</p>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          November 28, 2023
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Last updated yesterday
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <File className="h-3.5 w-3.5 mr-1" />
                          PDF
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5" disabled>
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5" disabled>
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Report Item 3 */}
              <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Inventory Analysis</h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100">
                          Complete
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Annual inventory trends and stock level optimization recommendations.</p>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          November 15, 2023
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Last updated 2 weeks ago
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <File className="h-3.5 w-3.5 mr-1" />
                          PDF, Excel, CSV
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Report Item 4 */}
              <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Trend Analysis</h3>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-100">
                          Error
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Failed to generate report due to incomplete data sources.</p>
                      <div className="flex items-center gap-6 mt-2">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          December 5, 2023
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Last updated 6 days ago
                        </div>
                        <div className="flex items-center text-xs text-red-500 dark:text-red-400">
                          <AlertCircle className="h-3.5 w-3.5 mr-1" />
                          Processing failed
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="h-9 gap-1.5">
                      <RefreshCw className="h-4 w-4" />
                      Retry
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">4</span> of <span className="font-medium">12</span> reports
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2.5 bg-primary/10 text-primary border-primary/20">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2.5">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2.5">
                  3
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <Card className="glass-card p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Report <span className="font-semibold">Q4 Sales Performance Analysis</span> was created
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Today, 10:23 AM</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Share2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    You shared <span className="font-semibold">Product Inventory Analysis</span> with the Management team
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Yesterday, 2:45 PM</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Download className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    You downloaded <span className="font-semibold">Q3 Marketing Campaign Report</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Dec 1, 2023</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
