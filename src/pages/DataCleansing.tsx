
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Filter, CheckCircle2, AlertCircle } from "lucide-react";

export default function DataCleansing() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Data Quality
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Cleansing</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Clean and transform your data for better analysis and visualization.</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cleansing Area */}
          <div className="col-span-1 lg:col-span-2 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-card rounded-lg overflow-hidden">
              {/* Data Preview */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Preview</h2>
                  <Badge className="text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-100">
                    sales_data_2023.csv
                  </Badge>
                </div>
                
                {/* Data Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Checkbox id="select-all" className="mr-2" />
                            <label htmlFor="select-all">Row</label>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Date
                          <span className="text-primary ml-1">↓</span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Region
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Sales Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <Checkbox id="row-1" className="mr-2" />
                            <label htmlFor="row-1">1</label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          2023-01-15
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          PRD-001
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          North America
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          $1,250.00
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          5
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 text-gray-700 dark:text-gray-300">Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <Checkbox id="row-2" className="mr-2" />
                            <label htmlFor="row-2">2</label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                          2023/01/16
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          PRD-002
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          Europe
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                          1,450.50
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          3
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 text-gray-700 dark:text-gray-300">Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <Checkbox id="row-3" className="mr-2" />
                            <label htmlFor="row-3">3</label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          2023-01-17
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                          prd003
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                          asia
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          $2,100.75
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          8
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 text-gray-700 dark:text-gray-300">Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <Checkbox id="row-4" className="mr-2" />
                            <label htmlFor="row-4">4</label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          2023-01-18
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          PRD-004
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          South America
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          $950.25
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                          N/A
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button variant="ghost" size="sm" className="h-8 text-gray-700 dark:text-gray-300">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">4</span> of <span className="font-medium mx-1">50</span> results
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Cleansing Tools */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Cleansing Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Format Dates
                  </Button>
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Standardize Product IDs
                  </Button>
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Capitalize Region Names
                  </Button>
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Format Currency Values
                  </Button>
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Handle Missing Values
                  </Button>
                  <Button className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm">
                    Remove Duplicates
                  </Button>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline" className="h-9">
                    Reset Changes
                  </Button>
                  <Button className="h-9">
                    Apply All Fixes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Data Quality Panel */}
          <div className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="glass-card p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Quality Report</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Quality</h3>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-500">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Issues Detected</h3>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                          5
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Format Inconsistencies</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Date formats and currency formatting issues</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                          3
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Case Inconsistencies</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Region names and product IDs have case issues</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                          1
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Missing Values</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Quantity field has missing values</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mr-2 flex-shrink-0">1</span>
                      <span>Standardize date format to YYYY-MM-DD</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mr-2 flex-shrink-0">2</span>
                      <span>Format currency values consistently with "$" prefix</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mr-2 flex-shrink-0">3</span>
                      <span>Capitalize first letter of region names</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mr-2 flex-shrink-0">4</span>
                      <span>Use consistent format for product IDs (PRD-XXX)</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full">
                  Apply All Recommendations
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
