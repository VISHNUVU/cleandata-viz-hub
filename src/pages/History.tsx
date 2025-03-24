import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  History as HistoryIcon,
  FileText,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Mock data for demonstration
const historyItems = [
  {
    id: 1,
    fileName: 'sales_data_2024.csv',
    date: '2024-03-15T10:30:00',
    status: 'success',
    changes: [
      'Fixed 15 missing values',
      'Corrected date format in 3 columns',
      'Removed 2 duplicate rows'
    ]
  },
  {
    id: 2,
    fileName: 'customer_data.xlsx',
    date: '2024-03-14T15:45:00',
    status: 'error',
    changes: [
      'Failed to process file due to invalid format',
      'Missing required columns'
    ]
  },
  {
    id: 3,
    fileName: 'inventory_2024.json',
    date: '2024-03-13T09:15:00',
    status: 'success',
    changes: [
      'Standardized product categories',
      'Updated price formats',
      'Added missing SKUs'
    ]
  }
];

export default function History() {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">History</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View and manage your data processing history
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {historyItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>{item.fileName}</span>
                  </CardTitle>
                  <Badge
                    variant={item.status === 'success' ? 'default' : 'destructive'}
                    className="flex items-center"
                  >
                    {item.status === 'success' ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {item.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {formatDate(item.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Changes Made
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {item.changes.map((change, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {item.status === 'success' && (
                      <Button>
                        Restore Version
                        <HistoryIcon className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 