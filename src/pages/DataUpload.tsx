import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpFromLine, 
  BarChart, 
  Calendar, 
  Clock, 
  Download, 
  Eye, 
  FileIcon, 
  FileText, 
  HelpCircle, 
  Info,
  RotateCcw,
  Check,
  Loader2,
  History,
  Settings
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { getRecentUploads, UploadedFile } from '@/services';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';
import FileUpload from '@/components/FileUpload';

const ALLOWED_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/json',
  'text/plain',
  'application/x-parquet',
  'application/avro',
  'application/xml',
  'application/zip',
  'application/gzip'
];

export default function DataUpload() {
  const [fileFormat, setFileFormat] = useState('csv');
  const [headerRow, setHeaderRow] = useState(true);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [recentUploads, setRecentUploads] = useState<UploadedFile[]>([]);
  const [isLoadingUploads, setIsLoadingUploads] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
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
  
  const handleUploadComplete = async (fileId: string) => {
    // Refresh the list of recent uploads
    const uploads = await getRecentUploads(10);
    setRecentUploads(uploads);
  };
  
  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error);
  };
  
  const handleViewFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setIsLoading(true);
    navigate('/data-cleansing');
  };
  
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
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Upload your data files for analysis and visualization.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Card */}
          <div className="col-span-1 lg:col-span-2 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <FileUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              maxFileSize={100 * 1024 * 1024} // 100MB
              allowedTypes={ALLOWED_TYPES}
            />
          </div>

          {/* Settings Card */}
          <div className="col-span-1 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Upload Settings</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showAdvancedSettings ? 'Hide Advanced' : 'Show Advanced'}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>File Format</Label>
                  <RadioGroup
                    value={fileFormat}
                    onValueChange={setFileFormat}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="csv" />
                      <Label htmlFor="csv">CSV</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excel" id="excel" />
                      <Label htmlFor="excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="json" id="json" />
                      <Label htmlFor="json">JSON</Label>
                    </div>
                  </RadioGroup>
                </div>

                {showAdvancedSettings && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="headerRow"
                        checked={headerRow}
                        onCheckedChange={(checked) => setHeaderRow(checked as boolean)}
                      />
                      <Label htmlFor="headerRow">First row contains headers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trimSpaces"
                        checked={trimSpaces}
                        onCheckedChange={(checked) => setTrimSpaces(checked as boolean)}
                      />
                      <Label htmlFor="trimSpaces">Trim whitespace</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoDetect"
                        checked={autoDetect}
                        onCheckedChange={(checked) => setAutoDetect(checked as boolean)}
                      />
                      <Label htmlFor="autoDetect">Auto-detect data types</Label>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Uploads
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/history')}
            >
              <History className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          {isLoadingUploads ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : recentUploads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentUploads.map((file) => (
                <Card key={file.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewFile(file)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(file.uploaded_at)}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No recent uploads</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
