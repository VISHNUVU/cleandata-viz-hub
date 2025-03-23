
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadedFile } from "@/types/file";
import { getRecentUploads } from "@/services/fileDataService";
import { Dashboard } from "@/types/dashboard";
import { v4 as uuidv4 } from "uuid";
import { Plus, Save, Download, Share2, LayoutTemplate } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Report types
interface ReportSection {
  id: string;
  title: string;
  content: string;
  type: "text" | "chart" | "table" | "image";
  chartId?: string;
  tableData?: any[];
  imageUrl?: string;
  order: number;
}

interface Report {
  id: string;
  title: string;
  description: string;
  sections: ReportSection[];
  createdAt: Date;
  updatedAt: Date;
  dashboardId?: string;
}

export default function ReportBuilder() {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [reportTitle, setReportTitle] = useState("New Report");
  const [reportDescription, setReportDescription] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [availableDashboards, setAvailableDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
  const [availableDataSources, setAvailableDataSources] = useState<UploadedFile[]>([]);

  // Initialize with empty report
  useEffect(() => {
    if (reports.length === 0) {
      const newReport: Report = {
        id: uuidv4(),
        title: "New Report",
        description: "",
        sections: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setReports([newReport]);
      setActiveReport(newReport);
      setReportTitle(newReport.title);
    }
  }, []);

  // Fetch data sources
  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const files = await getRecentUploads(10);
        setAvailableDataSources(files);
      } catch (error) {
        console.error("Error fetching data sources:", error);
        toast({
          title: "Error",
          description: "Failed to load data sources. Please try again.",
          variant: "destructive"
        });
      }
    };

    fetchDataSources();
  }, [toast]);

  const handleAddSection = (type: "text" | "chart" | "table" | "image") => {
    if (!activeReport) return;
    
    const newSection: ReportSection = {
      id: uuidv4(),
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: type === "text" ? "Enter your content here..." : "",
      type,
      order: activeReport.sections.length
    };
    
    const updatedReport = {
      ...activeReport,
      sections: [...activeReport.sections, newSection],
      updatedAt: new Date()
    };
    
    setReports(reports.map(r => r.id === activeReport.id ? updatedReport : r));
    setActiveReport(updatedReport);
    
    toast({
      title: "Section Added",
      description: `New ${type} section has been added to your report.`
    });
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<ReportSection>) => {
    if (!activeReport) return;
    
    const updatedSections = activeReport.sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    );
    
    const updatedReport = {
      ...activeReport,
      sections: updatedSections,
      updatedAt: new Date()
    };
    
    setReports(reports.map(r => r.id === activeReport.id ? updatedReport : r));
    setActiveReport(updatedReport);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (!activeReport) return;
    
    const updatedSections = activeReport.sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index }));
    
    const updatedReport = {
      ...activeReport,
      sections: updatedSections,
      updatedAt: new Date()
    };
    
    setReports(reports.map(r => r.id === activeReport.id ? updatedReport : r));
    setActiveReport(updatedReport);
    
    toast({
      title: "Section Removed",
      description: "The section has been removed from your report."
    });
  };

  const handleSaveReport = () => {
    if (!activeReport) return;
    
    const updatedReport = {
      ...activeReport,
      title: reportTitle,
      description: reportDescription,
      updatedAt: new Date()
    };
    
    setReports(reports.map(r => r.id === activeReport.id ? updatedReport : r));
    setActiveReport(updatedReport);
    setIsEditingTitle(false);
    
    toast({
      title: "Report Saved",
      description: "Your report has been saved successfully."
    });
  };

  const handleCreateReport = () => {
    const newReport: Report = {
      id: uuidv4(),
      title: "New Report",
      description: "",
      sections: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setReports([...reports, newReport]);
    setActiveReport(newReport);
    setReportTitle(newReport.title);
    setReportDescription("");
    
    toast({
      title: "New Report Created",
      description: "You can now add sections to your new report."
    });
  };

  const handleExportReport = () => {
    if (!activeReport) return;
    
    try {
      const reportData = JSON.stringify(activeReport, null, 2);
      const blob = new Blob([reportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeReport.title.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Exported",
        description: "Your report has been exported as JSON."
      });
    } catch (error) {
      console.error("Error exporting report:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your report.",
        variant: "destructive"
      });
    }
  };

  const handleShareReport = () => {
    const mockShareableLink = `https://example.com/reports/${activeReport?.id}`;
    
    navigator.clipboard.writeText(mockShareableLink)
      .then(() => {
        toast({
          title: "Report Link Copied",
          description: "Shareable link copied to clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Sharing Failed",
          description: "Could not copy the sharing link to clipboard.",
          variant: "destructive"
        });
      });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    className="text-2xl font-bold h-10 w-[300px]"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingTitle(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveReport}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeReport?.title || "New Report"}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </>
              )}
            </div>
            {isEditingTitle ? (
              <Textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Add a description for your report"
                className="mt-2 w-full max-w-[600px]"
                rows={2}
              />
            ) : (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {activeReport?.description || "Add a description to your report"}
              </p>
            )}
          </div>
          <div className="flex mt-4 sm:mt-0 gap-2">
            <Button variant="outline" onClick={handleCreateReport}>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
            <Button variant="outline" onClick={handleSaveReport}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleShareReport}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <h2 className="text-lg font-medium mb-4">Add Section</h2>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => handleAddSection("text")}>
                  <Plus className="h-4 w-4 mr-2" /> Text
                </Button>
                <Button variant="outline" onClick={() => handleAddSection("chart")}>
                  <Plus className="h-4 w-4 mr-2" /> Chart
                </Button>
                <Button variant="outline" onClick={() => handleAddSection("table")}>
                  <Plus className="h-4 w-4 mr-2" /> Table
                </Button>
                <Button variant="outline" onClick={() => handleAddSection("image")}>
                  <Plus className="h-4 w-4 mr-2" /> Image
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-md font-medium mb-2">Report Sections</h3>
                <div className="space-y-2">
                  {activeReport?.sections.map((section, index) => (
                    <div key={section.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <span className="text-sm truncate">{section.title}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(section.id)}>
                        <span className="sr-only">Remove</span>
                        ×
                      </Button>
                    </div>
                  ))}
                  {activeReport?.sections.length === 0 && (
                    <p className="text-sm text-gray-500">No sections added yet.</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <Card className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  <div className="space-y-4">
                    {activeReport?.sections.length === 0 && (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Content Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Add sections to your report using the sidebar.</p>
                        <Button onClick={() => handleAddSection("text")}>
                          <Plus className="h-4 w-4 mr-2" /> Add Text Section
                        </Button>
                      </div>
                    )}
                    
                    {activeReport?.sections.map((section) => (
                      <div key={section.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Input 
                            value={section.title} 
                            onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                            className="font-medium text-lg border-none"
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(section.id)}>
                            <span className="sr-only">Remove</span>
                            ×
                          </Button>
                        </div>
                        
                        {section.type === "text" && (
                          <Textarea
                            value={section.content}
                            onChange={(e) => handleUpdateSection(section.id, { content: e.target.value })}
                            placeholder="Enter your content here..."
                            className="min-h-[150px] w-full mt-2"
                          />
                        )}
                        
                        {section.type === "chart" && (
                          <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded">
                            <p className="text-gray-500 dark:text-gray-400">Chart Placeholder</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                              Chart selection functionality coming soon
                            </p>
                          </div>
                        )}
                        
                        {section.type === "table" && (
                          <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded">
                            <p className="text-gray-500 dark:text-gray-400">Table Placeholder</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                              Table creation functionality coming soon
                            </p>
                          </div>
                        )}
                        
                        {section.type === "image" && (
                          <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded">
                            <p className="text-gray-500 dark:text-gray-400">Image Placeholder</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                              Image upload functionality coming soon
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="border rounded-lg p-6 min-h-[500px] bg-white dark:bg-gray-800">
                    <h1 className="text-2xl font-bold mb-4">{activeReport?.title}</h1>
                    {activeReport?.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{activeReport.description}</p>
                    )}
                    
                    {activeReport?.sections.map((section) => (
                      <div key={section.id} className="mb-6">
                        <h2 className="text-xl font-medium mb-3">{section.title}</h2>
                        
                        {section.type === "text" && (
                          <div className="prose dark:prose-invert max-w-none">
                            {section.content.split('\n').map((paragraph, i) => (
                              <p key={i}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                        
                        {section.type === "chart" && (
                          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Chart Preview</p>
                          </div>
                        )}
                        
                        {section.type === "table" && (
                          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Table Preview</p>
                          </div>
                        )}
                        
                        {section.type === "image" && (
                          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">Image Preview</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {activeReport?.sections.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No content to preview</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-medium mb-2">Report Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Export Format
                          </label>
                          <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                            <option>PDF</option>
                            <option>Word Document</option>
                            <option>HTML</option>
                            <option>JSON</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Paper Size
                          </label>
                          <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                            <option>Letter</option>
                            <option>A4</option>
                            <option>Legal</option>
                            <option>Tabloid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Template</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400">
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded mb-2"></div>
                          <span className="text-sm">Basic</span>
                        </div>
                        <div className="border rounded-md p-4 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400">
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded mb-2"></div>
                          <span className="text-sm">Professional</span>
                        </div>
                        <div className="border rounded-md p-4 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400">
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded mb-2"></div>
                          <span className="text-sm">Modern</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Include</h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Cover Page</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Table of Contents</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Page Numbers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Header & Footer</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
