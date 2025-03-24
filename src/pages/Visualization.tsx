import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft,
  BarChart3,
  LineChart,
  PieChart,
  ScatterChart,
  Download,
  Share2,
  Settings
} from 'lucide-react';

// Mock data for demonstration
const chartTypes = [
  {
    id: 'bar',
    name: 'Bar Chart',
    icon: BarChart3,
    description: 'Compare values across categories'
  },
  {
    id: 'line',
    name: 'Line Chart',
    icon: LineChart,
    description: 'Show trends over time'
  },
  {
    id: 'pie',
    name: 'Pie Chart',
    icon: PieChart,
    description: 'Display proportions of a whole'
  },
  {
    id: 'scatter',
    name: 'Scatter Plot',
    icon: ScatterChart,
    description: 'Visualize relationships between variables'
  }
];

export default function Visualization() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Visualization</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create and customize visualizations of your data
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Chart Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {chartTypes.map((chart) => {
            const Icon = chart.icon;
            return (
              <Card
                key={chart.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{chart.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {chart.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Create Chart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Visualization Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Chart Preview</CardTitle>
            <CardDescription>
              Select a chart type to preview your data visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Select a chart type to begin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chart Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Configuration</CardTitle>
            <CardDescription>
              Customize your chart appearance and data mapping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Data Mapping
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select which columns to use for your visualization
                </p>
                <Button variant="outline" className="mt-4">
                  Configure Data
                </Button>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Appearance
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Customize colors, labels, and other visual properties
                </p>
                <Button variant="outline" className="mt-4">
                  Customize Style
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
