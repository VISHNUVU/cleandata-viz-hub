
import { Button } from "@/components/ui/button";
import { BarChart2, Plus } from "lucide-react";

interface EmptyDashboardProps {
  onAddChart: () => void;
}

const EmptyDashboard = ({ onAddChart }: EmptyDashboardProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-700">
        <BarChart2 className="h-10 w-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No charts yet</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
        Get started by adding a chart to your dashboard. Click the "Add Chart" button above to create your first visualization.
      </p>
      <Button
        className="mt-6"
        onClick={onAddChart}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Chart
      </Button>
    </div>
  );
};

export default EmptyDashboard;
