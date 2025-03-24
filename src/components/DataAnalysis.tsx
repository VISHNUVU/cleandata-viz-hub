import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Info
} from "lucide-react";
import { dataAnalysisService, DataAnalysis, DataIssue } from '@/services/dataAnalysis';
import { useToast } from '@/hooks/use-toast';

interface DataAnalysisProps {
  fileId: string;
  onAnalysisComplete?: (analysis: DataAnalysis) => void;
}

export default function DataAnalysis({ fileId, onAnalysisComplete }: DataAnalysisProps) {
  const [analysis, setAnalysis] = useState<DataAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFixing, setIsFixing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalysis();
  }, [fileId]);

  const loadAnalysis = async () => {
    try {
      setIsLoading(true);
      const result = await dataAnalysisService.getAnalysis(fileId);
      setAnalysis(result);
      onAnalysisComplete?.(result);
    } catch (error) {
      toast({
        title: "Error loading analysis",
        description: "Failed to load data analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFixIssue = async (issue: DataIssue) => {
    try {
      setIsFixing(true);
      await dataAnalysisService.fixIssue(fileId, issue);
      await loadAnalysis();
      toast({
        title: "Issue fixed",
        description: `Successfully fixed the issue: ${issue.description}`,
      });
    } catch (error) {
      toast({
        title: "Error fixing issue",
        description: "Failed to fix the issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFixing(false);
    }
  };

  const handleApplyAllFixes = async () => {
    if (!analysis?.issues) return;

    try {
      setIsFixing(true);
      await dataAnalysisService.applyAllFixes(fileId);
      await loadAnalysis();
      toast({
        title: "All issues fixed",
        description: "Successfully applied all fixes to the data.",
      });
    } catch (error) {
      toast({
        title: "Error applying fixes",
        description: "Failed to apply fixes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFixing(false);
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No analysis available</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The data analysis could not be loaded. Please try again.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Overview</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Summary of your dataset and data quality
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadAnalysis}
            disabled={isFixing}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rows</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {analysis.totalRows.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Columns</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
              {analysis.totalColumns}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Data Quality Score</div>
            <div className="mt-1 flex items-center">
              <Progress value={analysis.qualityScore} className="w-full" />
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                {analysis.qualityScore}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Issues Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Issues</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {analysis.issues.length} issues found in your data
            </p>
          </div>
          {analysis.issues.length > 0 && (
            <Button
              onClick={handleApplyAllFixes}
              disabled={isFixing}
            >
              {isFixing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              Fix All Issues
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {analysis.issues.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No issues found</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your data is clean and ready for visualization
              </p>
            </div>
          ) : (
            analysis.issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {issue.description}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Affected column: {issue.affectedColumn}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {issue.affectedRows} rows affected
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFixIssue(issue)}
                    disabled={isFixing}
                  >
                    {isFixing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Column Analysis Card */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Column Analysis</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Detailed analysis of each column in your dataset
          </p>
        </div>

        <div className="space-y-6">
          {analysis.columns.map((column, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {column.name}
                </h3>
                <Badge variant="outline">
                  {column.type}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unique Values</div>
                  <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {column.uniqueValues}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Missing Values</div>
                  <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {column.missingValues}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Min Value</div>
                  <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {column.minValue || 'N/A'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Value</div>
                  <div className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {column.maxValue || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 