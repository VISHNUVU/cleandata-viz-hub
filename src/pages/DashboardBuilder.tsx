
import { ChartConfig, ChartType, Dashboard, DashboardTemplate } from "@/types/dashboard";
import { useDashboard } from "@/hooks/useDashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardWorkspace from "@/components/dashboard/DashboardWorkspace";

export type { ChartType, Dashboard, ChartConfig };

export default function DashboardBuilder() {
  const { 
    dashboards,
    activeDashboard,
    selectedChart,
    isCreatingChart,
    availableDataSources,
    dashboardTitle,
    dashboardDescription,
    isEditingDashboard,
    setActiveDashboard,
    setSelectedChart,
    setIsCreatingChart,
    setDashboardTitle,
    setDashboardDescription,
    setIsEditingDashboard,
    handleCreateChart,
    handleDeleteChart,
    handleUpdateChart,
    handleUpdateDashboard,
    handleSaveDashboard,
    handleExportDashboard,
    handleShareDashboard,
    handleCreateDashboard,
    handleApplyTemplate,
    handleLayoutChange,
    handleDuplicateChart
  } = useDashboard();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          activeDashboard={activeDashboard}
          dashboards={dashboards}
          dashboardTitle={dashboardTitle}
          dashboardDescription={dashboardDescription}
          isEditingDashboard={isEditingDashboard}
          onUpdateDashboard={handleUpdateDashboard}
          onSaveDashboard={handleSaveDashboard}
          onExportDashboard={handleExportDashboard}
          onShareDashboard={handleShareDashboard}
          onCreateDashboard={handleCreateDashboard}
          onSetActiveDashboard={(dashboard) => {
            setActiveDashboard(dashboard);
            setDashboardTitle(dashboard.title);
            setDashboardDescription(dashboard.description || "");
          }}
          onSetDashboardTitle={setDashboardTitle}
          onSetDashboardDescription={setDashboardDescription}
          onSetIsEditingDashboard={setIsEditingDashboard}
        />

        <DashboardWorkspace
          activeDashboard={activeDashboard}
          selectedChart={selectedChart}
          isCreatingChart={isCreatingChart}
          availableDataSources={availableDataSources}
          onSetIsCreatingChart={setIsCreatingChart}
          onCreateChart={handleCreateChart}
          onLayoutChange={handleLayoutChange}
          onSelectChart={setSelectedChart}
          onDeleteChart={handleDeleteChart}
          onDuplicateChart={handleDuplicateChart}
          onUpdateChart={handleUpdateChart}
          onApplyTemplate={handleApplyTemplate}
        />
      </div>
    </div>
  );
}
