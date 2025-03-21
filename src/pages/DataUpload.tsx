
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  RotateCcw,
  Check,
  Loader2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { uploadFile, getRecentUploads, UploadedFile } from '@/services/fileUploadService';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';

export default function DataUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [fileFormat, setFileFormat] = useState('csv');
  const [headerRow, setHeaderRow] = useState(true);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [recentUploads, setRecentUploads] = useState<UploadedFile[]>([]);
  const [isLoadingUploads, setIsLoadingUploads] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setSelectedFile, setIsLoading } = useData();
  
  // Fetch recent uploads on component mount
  useEffect(() => {
    const fetchRecentUploads = async () => {
      setIsLoadingUploads(true);
      try {
        const uploads = await getRecentUploads(10);
        setRecentUploads(uploads);
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
        toast({
          title: "Error fetching uploads",
          description: "There was a problem fetching your recent uploads.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingUploads(false);
      }
    };
    
    fetchRecentUploads();
  }, [toast]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles(e.dataTransfer.files);
    }
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  }, []);
  
  const handleReset = useCallback(() => {
    setSelectedFiles(null);
    setFileFormat('csv');
    setHeaderRow(true);
    setTrimSpaces(true);
    setAutoDetect(true);
  }, []);
  
  const handleUpload = useCallback(async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    const file = selectedFiles[0];
    
    // Check file size (50MB limit)
    if (file.size > 52428800) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50MB.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    const allowedTypes = [
      'text/csv', 
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a CSV, Excel, JSON or TXT file.",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const uploadedFile = await uploadFile(file, fileFormat);
      
      if (uploadedFile) {
        toast({
          title: "File uploaded successfully",
          description: "Your file is being processed.",
          variant: "default"
        });
        
        // Refresh the list of recent uploads
        const uploads = await getRecentUploads(10);
        setRecentUploads(uploads);
        
        // Reset the form
        setSelectedFiles(null);
      } else {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  }, [selectedFiles, fileFormat, headerRow, trimSpaces, autoDetect, toast]);
  
  const handleViewFile = useCallback((file: UploadedFile) => {
    setSelectedFile(file);
    setIsLoading(true);
    navigate('/data-cleansing');
  }, [navigate, setSelectedFile, setIsLoading]);
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
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
                  {selectedFiles && selectedFiles.length > 0 ? (
                    <Check className="h-full w-full text-green-500" />
                  ) : (
                    <FileIcon className="h-full w-full" />
                  )}
                </div>
                <div className="mt-4 flex flex-col items-center text-sm text-gray-600 dark:text-gray-400">
                  <Button variant="outline" className="relative mb-4">
                    <span>{selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : 'Upload a file'}</span>
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={handleFileChange}
                      accept=".csv,.xlsx,.xls,.json,.txt"
                    />
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
                <RadioGroup 
                  defaultValue="csv" 
                  value={fileFormat} 
                  onValueChange={setFileFormat}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
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
                    <Checkbox 
                      id="header-row" 
                      checked={headerRow}
                      onCheckedChange={(checked) => setHeaderRow(checked as boolean)}
                    />
                    <Label htmlFor="header-row">First row contains column headers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="trim-spaces" 
                      checked={trimSpaces}
                      onCheckedChange={(checked) => setTrimSpaces(checked as boolean)}
                    />
                    <Label htmlFor="trim-spaces">Trim leading/trailing spaces</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="auto-detect" 
                      checked={autoDetect}
                      onCheckedChange={(checked) => setAutoDetect(checked as boolean)}
                    />
                    <Label htmlFor="auto-detect">Auto-detect data types</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1.5"
                  onClick={handleReset}
                  disabled={isUploading}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button 
                  className="flex items-center gap-1.5"
                  onClick={handleUpload}
                  disabled={isUploading || !selectedFiles || selectedFiles.length === 0}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowUpFromLine className="h-4 w-4" />
                      Upload Data
                    </>
                  )}
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
            {isLoadingUploads ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading recent uploads...</span>
              </div>
            ) : recentUploads.length === 0 ? (
              <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                <FileIcon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p>No files have been uploaded yet.</p>
                <p className="text-sm">Upload a file to see it here.</p>
              </div>
            ) : (
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
                    {recentUploads.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{file.filename}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{file.type.split('/').pop()?.toUpperCase()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(file.created_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            className={`
                              ${file.status === 'processed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                              ${file.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                              ${file.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''}
                              ${file.status === 'uploaded' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                              hover:bg-opacity-90
                            `}
                          >
                            {file.status === 'processed' && 'Processed'}
                            {file.status === 'processing' && (
                              <div className="flex items-center">
                                <Loader2 className="animate-spin mr-1 h-3 w-3" />
                                Processing
                              </div>
                            )}
                            {file.status === 'error' && 'Error'}
                            {file.status === 'uploaded' && 'Uploaded'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleViewFile(file)}
                              disabled={file.status !== 'processed'}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              title="Download original file"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{recentUploads.length}</span> of <span className="font-medium">{recentUploads.length}</span> uploads
                </div>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2" disabled>
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
