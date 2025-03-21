
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  ArrowLeft
} from "lucide-react";
import { useData } from '@/contexts/DataContext';
import { getFileAnalysis, DataIssue, ColumnStats } from '@/services/fileUploadService';
import { useToast } from '@/hooks/use-toast';

export default function DataCleansing() {
  const { selectedFile, fileData, setFileData, isLoading, setIsLoading, error, setError } = useData();
  const [fixingIssues, setFixingIssues] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load file data if a file is selected
  useEffect(() => {
    const loadFileData = async () => {
      if (selectedFile && !fileData) {
        setIsLoading(true);
        setError(null);
        
        try {
          const data = await getFileAnalysis(selectedFile.id);
          
          if (data) {
            setFileData(data);
          } else {
            setError("Failed to load file analysis data");
            toast({
              title: "Error loading data",
              description: "Could not load the file analysis data.",
              variant: "destructive"
            });
          }
        } catch (err) {
          console.error("Error loading file data:", err);
          setError("An error occurred while loading file data");
          toast({
            title: "Error loading data",
            description: "An error occurred while loading the file analysis data.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadFileData();
  }, [selectedFile, fileData, setFileData, setIsLoading, setError, toast]);

  // Redirect to upload page if no file is selected
  useEffect(() => {
    if (!selectedFile && !isLoading) {
      navigate('/data-upload');
    }
  }, [selectedFile, isLoading, navigate]);
  
  const handleSelectAllRows = (checked: boolean) => {
    if (checked && fileData) {
      setSelectedRows(Array.from({ length: fileData.rows.length }, (_, i) => i));
    } else {
      setSelectedRows([]);
    }
  };
  
  const handleSelectRow = (rowIndex: number, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, rowIndex]);
    } else {
      setSelectedRows(prev => prev.filter(i => i !== rowIndex));
    }
  };
  
  const handleFixIssue = (issue: DataIssue) => {
    setFixingIssues(prev => [...prev, `${issue.affectedColumn}_${issue.type}`]);
    
    // Simulate fixing the issue
    setTimeout(() => {
      toast({
        title: "Issue fixed",
        description: `${issue.description} has been fixed.`,
        variant: "default"
      });
      
      // Update the file data to remove the fixed issue
      if (fileData) {
        const updatedColumns = fileData.columns.map(column => {
          if (column.name === issue.affectedColumn) {
            return {
              ...column,
              issues: (column.issues || []).filter(i => i.type !== issue.type)
            };
          }
          return column;
        });
        
        setFileData({
          ...fileData,
          columns: updatedColumns,
          totalIssues: fileData.totalIssues - 1,
          qualityScore: Math.min(100, fileData.qualityScore + 3) // Improve quality score
        });
      }
      
      setFixingIssues(prev => prev.filter(id => id !== `${issue.affectedColumn}_${issue.type}`));
    }, 1500);
  };
  
  const handleApplyAllFixes = () => {
    if (!fileData) return;
    
    // Collect all issues from all columns
    const allIssues: DataIssue[] = [];
    fileData.columns.forEach(column => {
      if (column.issues && column.issues.length > 0) {
        allIssues.push(...column.issues);
      }
    });
    
    if (allIssues.length === 0) {
      toast({
        title: "No issues to fix",
        description: "Your data is already clean!",
        variant: "default"
      });
      return;
    }
    
    // Mark all issues as being fixed
    setFixingIssues(allIssues.map(issue => `${issue.affectedColumn}_${issue.type}`));
    
    // Simulate fixing all issues
    setTimeout(() => {
      toast({
        title: "All issues fixed",
        description: `${allIssues.length} issues have been fixed.`,
        variant: "default"
      });
      
      // Update the file data to remove all issues
      if (fileData) {
        const updatedColumns = fileData.columns.map(column => ({
          ...column,
          issues: []
        }));
        
        setFileData({
          ...fileData,
          columns: updatedColumns,
          totalIssues: 0,
          qualityScore: 100 // Perfect score after fixing all issues
        });
      }
      
      setFixingIssues([]);
    }, 2000);
  };
  
  const handleApplyRecommendations = () => {
    handleApplyAllFixes();
  };
  
  const getCellClass = (columnName: string, rowIndex: number, value: any) => {
    if (!fileData) return "text-gray-500 dark:text-gray-400";
    
    // Find issues for this column
    const column = fileData.columns.find(col => col.name === columnName);
    if (!column || !column.issues || column.issues.length === 0) {
      return "text-gray-500 dark:text-gray-400";
    }
    
    // Check if there's an issue affecting this cell
    const hasIssue = column.issues.some(issue => {
      // For simplicity, we'll just check if there's an issue in this column
      // In a real app, you would check if this specific row is affected
      return true;
    });
    
    return hasIssue ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400";
  };
  
  const getCellIcon = (columnName: string, rowIndex: number, value: any) => {
    if (!fileData) return null;
    
    // Find issues for this column
    const column = fileData.columns.find(col => col.name === columnName);
    if (!column || !column.issues || column.issues.length === 0) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    
    // Check if there's an issue affecting this cell
    const hasIssue = column.issues.some(issue => {
      // For simplicity, we'll just check if there's an issue in this column
      // In a real app, you would check if this specific row is affected
      return true;
    });
    
    return hasIssue ? 
      <AlertCircle className="h-4 w-4 text-red-500" /> : 
      <CheckCircle2 className="h-4 w-4 text-green-500" />;
  };
  
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
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-2">
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Data Quality
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Cleansing</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Clean and transform your data for better analysis and visualization.</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/data-upload')}
              className="flex items-center gap-1.5"
            >
              <Upload className="h-4 w-4" />
              Upload New File
            </Button>
          </div>
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
                    {selectedFile?.filename}
                  </Badge>
                </div>
                
                {/* Data Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center">
                            <Checkbox 
                              id="select-all" 
                              className="mr-2"
                              checked={selectedRows.length === fileData.rows.length}
                              onCheckedChange={handleSelectAllRows}
                            />
                            <label htmlFor="select-all">Row</label>
                          </div>
                        </th>
                        {fileData.columns.map((column) => (
                          <th 
                            key={column.name} 
                            scope="col" 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                          >
                            {column.name}
                            {column.name === 'Date' && <span className="text-primary ml-1">↓</span>}
                          </th>
                        ))}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {fileData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              <Checkbox 
                                id={`row-${rowIndex}`} 
                                className="mr-2"
                                checked={selectedRows.includes(rowIndex)}
                                onCheckedChange={(checked) => handleSelectRow(rowIndex, checked as boolean)}
                              />
                              <label htmlFor={`row-${rowIndex}`}>{rowIndex + 1}</label>
                            </div>
                          </td>
                          {fileData.columns.map((column) => (
                            <td 
                              key={`${rowIndex}-${column.name}`} 
                              className={`px-6 py-4 whitespace-nowrap text-sm flex items-center gap-1 ${
                                getCellClass(column.name, rowIndex, row[column.name])
                              }`}
                            >
                              {row[column.name]}
                              {getCellIcon(column.name, rowIndex, row[column.name])}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="h-8 text-gray-700 dark:text-gray-300">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">{fileData.rows.length}</span> of <span className="font-medium mx-1">{fileData.rows.length}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-8" disabled>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" disabled>
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
                  {/* Generate the cleansing tool buttons based on the issues detected */}
                  {/* Format Dates */}
                  {fileData.columns.some(col => col.name === 'Date' && col.issues && col.issues.length > 0) && (
                    <Button 
                      className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      onClick={() => {
                        const issue = fileData.columns.find(col => col.name === 'Date')?.issues?.[0];
                        if (issue) handleFixIssue(issue);
                      }}
                      disabled={fixingIssues.includes('Date_format_inconsistency')}
                    >
                      {fixingIssues.includes('Date_format_inconsistency') ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Format Dates
                    </Button>
                  )}
                  
                  {/* Standardize Product IDs */}
                  {fileData.columns.some(col => col.name === 'Product ID' && col.issues && col.issues.length > 0) && (
                    <Button 
                      className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      onClick={() => {
                        const issue = fileData.columns.find(col => col.name === 'Product ID')?.issues?.[0];
                        if (issue) handleFixIssue(issue);
                      }}
                      disabled={fixingIssues.includes('Product ID_case_inconsistency')}
                    >
                      {fixingIssues.includes('Product ID_case_inconsistency') ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Standardize Product IDs
                    </Button>
                  )}
                  
                  {/* Capitalize Region Names */}
                  {fileData.columns.some(col => col.name === 'Region' && col.issues && col.issues.length > 0) && (
                    <Button 
                      className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      onClick={() => {
                        const issue = fileData.columns.find(col => col.name === 'Region')?.issues?.[0];
                        if (issue) handleFixIssue(issue);
                      }}
                      disabled={fixingIssues.includes('Region_case_inconsistency')}
                    >
                      {fixingIssues.includes('Region_case_inconsistency') ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Capitalize Region Names
                    </Button>
                  )}
                  
                  {/* Format Currency Values */}
                  {fileData.columns.some(col => col.name === 'Sales Amount' && col.issues && col.issues.length > 0) && (
                    <Button 
                      className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      onClick={() => {
                        const issue = fileData.columns.find(col => col.name === 'Sales Amount')?.issues?.[0];
                        if (issue) handleFixIssue(issue);
                      }}
                      disabled={fixingIssues.includes('Sales Amount_format_inconsistency')}
                    >
                      {fixingIssues.includes('Sales Amount_format_inconsistency') ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Format Currency Values
                    </Button>
                  )}
                  
                  {/* Handle Missing Values */}
                  {fileData.columns.some(col => col.name === 'Quantity' && col.issues && col.issues.length > 0) && (
                    <Button 
                      className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                      onClick={() => {
                        const issue = fileData.columns.find(col => col.name === 'Quantity')?.issues?.[0];
                        if (issue) handleFixIssue(issue);
                      }}
                      disabled={fixingIssues.includes('Quantity_missing_value')}
                    >
                      {fixingIssues.includes('Quantity_missing_value') ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : null}
                      Handle Missing Values
                    </Button>
                  )}
                  
                  {/* Remove Duplicates - general option */}
                  <Button 
                    className="justify-start bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                    onClick={() => {
                      toast({
                        title: "No duplicates found",
                        description: "No duplicate rows were found in your data.",
                        variant: "default"
                      });
                    }}
                  >
                    Remove Duplicates
                  </Button>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    className="h-9"
                    onClick={() => navigate('/data-upload')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="h-9"
                    onClick={handleApplyAllFixes}
                    disabled={fixingIssues.length > 0 || fileData.totalIssues === 0}
                  >
                    {fixingIssues.length > 0 ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Fixing...
                      </>
                    ) : (
                      'Apply All Fixes'
                    )}
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
                    <span className={`text-sm font-semibold ${
                      fileData.qualityScore >= 90 ? 'text-green-600 dark:text-green-500' :
                      fileData.qualityScore >= 70 ? 'text-amber-600 dark:text-amber-500' :
                      'text-red-600 dark:text-red-500'
                    }`}>
                      {fileData.qualityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        fileData.qualityScore >= 90 ? 'bg-green-500' :
                        fileData.qualityScore >= 70 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${fileData.qualityScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Issues Detected</h3>
                  
                  {fileData.totalIssues === 0 ? (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">No issues detected</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your data is clean and ready for analysis!</p>
                    </div>
                  ) : (
                    <>
                      {/* Group issues by type */}
                      {(() => {
                        const issueGroups: {[key: string]: DataIssue[]} = {};
                        
                        // Collect all issues from columns
                        fileData.columns.forEach(column => {
                          if (column.issues) {
                            column.issues.forEach(issue => {
                              if (!issueGroups[issue.type]) {
                                issueGroups[issue.type] = [];
                              }
                              issueGroups[issue.type].push(issue);
                            });
                          }
                        });
                        
                        return Object.entries(issueGroups).map(([type, issues]) => (
                          <div key={type} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                                  {issues.length}
                                </span>
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {type === 'format_inconsistency' && 'Format Inconsistencies'}
                                  {type === 'case_inconsistency' && 'Case Inconsistencies'}
                                  {type === 'missing_value' && 'Missing Values'}
                                  {type === 'invalid_data' && 'Invalid Data'}
                                  {type === 'outlier' && 'Outliers'}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {type === 'format_inconsistency' && 'Date formats and currency formatting issues'}
                                  {type === 'case_inconsistency' && 'Region names and product IDs have case issues'}
                                  {type === 'missing_value' && 'Some fields have missing values'}
                                  {type === 'invalid_data' && 'Data contains invalid values'}
                                  {type === 'outlier' && 'Data contains potential outliers'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {fileData.columns.flatMap((column) => 
                      (column.issues || []).map((issue, index) => (
                        <li key={`${column.name}-${issue.type}`} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mr-2 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{issue.suggestedFix}</span>
                        </li>
                      ))
                    )}
                    
                    {fileData.totalIssues === 0 && (
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 mr-2 flex-shrink-0">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                        <span>No recommendations needed - data is clean!</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleApplyRecommendations}
                  disabled={fixingIssues.length > 0 || fileData.totalIssues === 0}
                >
                  {fixingIssues.length > 0 ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Applying...
                    </>
                  ) : (
                    'Apply All Recommendations'
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
