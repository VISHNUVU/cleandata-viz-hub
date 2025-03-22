
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Dashboard } from "@/pages/DashboardBuilder";
import { Save, Download, Share2, Plus, Edit3 } from "lucide-react";

interface DashboardHeaderProps {
  activeDashboard: Dashboard | null;
  dashboards: Dashboard[];
  dashboardTitle: string;
  dashboardDescription: string;
  isEditingDashboard: boolean;
  onUpdateDashboard: () => void;
  onSaveDashboard: () => void;
  onExportDashboard: () => void;
  onShareDashboard: () => void;
  onCreateDashboard: () => void;
  onSetActiveDashboard: (dashboard: Dashboard) => void;
  onSetDashboardTitle: (title: string) => void;
  onSetDashboardDescription: (description: string) => void;
  onSetIsEditingDashboard: (isEditing: boolean) => void;
}

const DashboardHeader = ({
  activeDashboard,
  dashboards,
  dashboardTitle,
  dashboardDescription,
  isEditingDashboard,
  onUpdateDashboard,
  onSaveDashboard,
  onExportDashboard,
  onShareDashboard,
  onCreateDashboard,
  onSetActiveDashboard,
  onSetDashboardTitle,
  onSetDashboardDescription,
  onSetIsEditingDashboard
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          {isEditingDashboard ? (
            <div className="flex items-center gap-2">
              <Input
                value={dashboardTitle}
                onChange={(e) => onSetDashboardTitle(e.target.value)}
                className="text-2xl font-bold h-10 w-[300px]"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetIsEditingDashboard(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onUpdateDashboard}
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeDashboard?.title || "My Dashboard"}
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSetDashboardTitle(activeDashboard?.title || "My Dashboard");
                  onSetDashboardDescription(activeDashboard?.description || "");
                  onSetIsEditingDashboard(true);
                }}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {isEditingDashboard ? (
          <Textarea
            value={dashboardDescription}
            onChange={(e) => onSetDashboardDescription(e.target.value)}
            placeholder="Add a description for your dashboard"
            className="mt-2 w-full max-w-[600px]"
            rows={2}
          />
        ) : (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {activeDashboard?.description || "Add a description to your dashboard"}
          </p>
        )}
      </div>
      <div className="flex mt-4 sm:mt-0 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Dashboards</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dashboards.map(dashboard => (
              <DropdownMenuItem 
                key={dashboard.id}
                onClick={() => {
                  onSetActiveDashboard(dashboard);
                }}
              >
                {dashboard.title}
              </DropdownMenuItem>
            ))}
            <Separator className="my-2" />
            <DropdownMenuItem onClick={onCreateDashboard}>
              <Plus className="h-4 w-4 mr-2" />
              New Dashboard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" onClick={onSaveDashboard}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onExportDashboard}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" onClick={onShareDashboard}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
