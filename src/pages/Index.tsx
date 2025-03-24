// Update this page (the content is just a fallback if you fail to update the page)

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, FileUp, LineChart, Settings, History } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-6xl">
            CleanData Viz Hub
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Clean, analyze, and visualize your data with ease
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => navigate('/data-upload')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Upload Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileUp className="h-6 w-6 text-primary" />
                <span>Data Upload</span>
              </CardTitle>
              <CardDescription>
                Upload and manage your data files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Support for various file formats including CSV, Excel, and JSON.
                Automatic data type detection and validation.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/data-upload')}
              >
                Upload Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Visualization Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-6 w-6 text-primary" />
                <span>Visualization</span>
              </CardTitle>
              <CardDescription>
                Create beautiful data visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Interactive charts and graphs. Customizable layouts and styles.
                Export options for presentations.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/visualization')}
              >
                Visualize Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* History Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-6 w-6 text-primary" />
                <span>History</span>
              </CardTitle>
              <CardDescription>
                View and manage your data history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Track changes and versions. Restore previous states.
                Audit trail for data modifications.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/history')}
              >
                View History
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="mt-16 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/settings')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Settings className="h-5 w-5 mr-2" />
            Configure Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
