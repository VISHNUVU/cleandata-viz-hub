
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  ArrowUpFromLine, 
  BarChart, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Download, 
  Eye, 
  FileIcon, 
  FileText, 
  HelpCircle, 
  Info, 
  RotateCcw 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DataUpload() {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
            <ArrowUpFromLine className="w-3.5 h-3.5 mr-1.5" />
            Upload Files
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Upload</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Upload your data files for analysis and visualization.</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Card */}
          <div className="col-span-1 lg:col-span-2 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload Files</h2>
              
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-all duration-200 ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4">
                  <FileIcon className="h-full w-full" />
                </div>
                <div className="mt-4 flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
                  <Button variant="outline" className="relative mb-4">
                    <span>Upload a file</span>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple />
                  </Button>
                  <p>or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    CSV, Excel, JSON or TXT up to 50MB
                  </p>
                </div>
              </div>
              
              {/* File Format Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">File Format Options</h3>
                <RadioGroup defaultValue="csv" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv" id="csv-format" />
                    <Label htmlFor="csv-format">CSV (Comma Separated Values)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excel" id="excel-format" />
                    <Label htmlFor="excel-format">Excel (XLSX, XLS)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="json" id="json-format" />
                    <Label htmlFor="json-format">JSON</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text-format" />
                    <Label htmlFor="text-format">Text (TXT)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Parsing Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Parsing Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="header-row" defaultChecked />
                    <Label htmlFor="header-row">First row contains column headers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trim-spaces" defaultChecked />
                    <Label htmlFor="trim-spaces">Trim leading/trailing spaces</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-detect" defaultChecked />
                    <Label htmlFor="auto-detect">Auto-detect data types</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" className="flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button className="flex items-center gap-1.5">
                  <ArrowUpFromLine className="h-4 w-4" />
                  Upload Data
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Help Panel */}
          <div className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="glass-card p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Guidelines</h2>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center">
                    <FileText className="h-4 w-4 mr-1.5 text-primary" />
                    Supported File Types
                  </h3>
                  <p>We support CSV, Excel (XLSX, XLS), JSON, and plain text (TXT) files. Data should be structured in rows and columns.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center">
                    <Info className="h-4 w-4 mr-1.5 text-primary" />
                    File Size Limit
                  </h3>
                  <p>Maximum file size is 50MB. For larger files, consider splitting them into smaller chunks.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center">
                    <BarChart className="h-4 w-4 mr-1.5 text-primary" />
                    Data Structure
                  </h3>
                  <p>For best results, ensure your data is clean and consistent. Each column should contain the same type of data.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-primary" />
                    Processing Time
                  </h3>
                  <p>Larger files may take longer to process. Complex data may require additional processing time.</p>
                </div>
              </div>
              <Separator className="my-6" />
              <Button variant="link" className="px-0 flex items-center text-primary hover:text-primary/80">
                <HelpCircle className="h-4 w-4 mr-1.5" />
                View detailed documentation
              </Button>
            </Card>
          </div>
        </div>
        
        {/* Recent Uploads Section */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Uploads</h2>
          <Card className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Upload Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">sales_data_2023.csv</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">CSV</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">4.2 MB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Today, 10:23 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 hover:text-green-800">
                        Processed
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">customer_feedback.xlsx</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Excel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2.8 MB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Yesterday, 3:45 PM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100 hover:text-green-800">
                        Processed
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">product_inventory.json</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">JSON</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1.5 MB</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Nov 15, 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-100 hover:text-yellow-800">
                        Processing
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">3</span> of <span className="font-medium">10</span> uploads
                </div>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2">
                    View All Uploads
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
