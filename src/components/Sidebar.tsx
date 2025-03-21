
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ArrowUpFromLine, 
  Search, 
  BarChart2, 
  FileText,
  Settings
} from "lucide-react";
import UserProfile from "./UserProfile";
import { ThemeToggle } from "./ThemeToggle";
import { Separator } from "./ui/separator";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    name: "Data Upload",
    path: "/data-upload",
    icon: <ArrowUpFromLine className="h-5 w-5" />
  },
  {
    name: "Data Cleansing",
    path: "/data-cleansing",
    icon: <Search className="h-5 w-5" />
  },
  {
    name: "Visualization",
    path: "/visualization",
    icon: <BarChart2 className="h-5 w-5" />
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FileText className="h-5 w-5" />
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />
  }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" fill="currentColor"></path>
              <path d="M4 11C4 10.4477 4.44772 10 5 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H5C4.44772 14 4 13.5523 4 13V11Z" fill="currentColor"></path>
              <path d="M5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H5Z" fill="currentColor"></path>
            </svg>
            <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">DataViz Pro</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="px-4 py-6 space-y-1 flex-1 overflow-auto">
        {navigationItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => 
              isActive 
                ? "flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 transition-colors duration-200" 
                : "flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            }
            end
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <UserProfile />
      </div>
    </div>
  );
}
