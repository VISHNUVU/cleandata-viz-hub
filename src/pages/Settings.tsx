import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft,
  User,
  Bell,
  Lock,
  Database,
  Palette,
  Globe,
  CreditCard,
  HelpCircle
} from 'lucide-react';

// Mock data for demonstration
const settingsSections = [
  {
    id: 'profile',
    name: 'Profile Settings',
    icon: User,
    description: 'Manage your account information and preferences'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    description: 'Configure notification preferences and alerts'
  },
  {
    id: 'security',
    name: 'Security',
    icon: Lock,
    description: 'Manage password and security settings'
  },
  {
    id: 'data',
    name: 'Data Management',
    icon: Database,
    description: 'Control data storage and retention settings'
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of the application'
  },
  {
    id: 'language',
    name: 'Language & Region',
    icon: Globe,
    description: 'Set your preferred language and regional settings'
  },
  {
    id: 'billing',
    name: 'Billing & Subscription',
    icon: CreditCard,
    description: 'Manage your subscription and payment methods'
  },
  {
    id: 'help',
    name: 'Help & Support',
    icon: HelpCircle,
    description: 'Access documentation and support resources'
  }
];

export default function Settings() {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>
          <Button>
            Save Changes
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{section.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>
              View your current account status and subscription details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Subscription Plan
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Professional
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Billing Cycle
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monthly
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Next Billing Date
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  March 1, 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
