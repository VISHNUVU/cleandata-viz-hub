import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Loader2,
  AlertCircle,
  FileText,
  History,
  Settings,
  Download,
  Share2
} from "lucide-react";
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';
import DataAnalysis from '@/components/DataAnalysis';
import { DataAnalysis as DataAnalysisType } from '@/services/dataAnalysis';

export default function DataCleansing() {
  const { selectedFile, fileData, setFileData, isLoading, setIsLoading, error, setError } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to upload page if no file is selected
  useEffect(() => {
    if (!selectedFile && !isLoading) {
      navigate('/data-upload');
    }
  }, [selectedFile, isLoading, navigate]);
  
  if (isLoading || !fileData) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading data analysis...</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please wait while we analyze your data.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Error loading data</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error}</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/data-upload')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
        </div>
      </div>
    );
  }

  const handleAnalysisComplete = (analysis: DataAnalysisType) => {
    // Update the file data with the analysis results
    setFileData({
      ...fileData,
      analysis
    });
  };
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Data Cleansing
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedFile?.name}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Analyze and clean your data for better visualization
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/history')}
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(selectedFile?.url, '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/visualization')}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Visualize
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          <DataAnalysis
            fileId={selectedFile?.id || ''}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      </div>
    </div>
  );
}
