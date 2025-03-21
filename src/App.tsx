
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import DataUpload from "@/pages/DataUpload"
import DataCleansing from "@/pages/DataCleansing"
import Visualization from "@/pages/Visualization"
import Reports from "@/pages/Reports"
import Settings from "@/pages/Settings"
import NotFound from "@/pages/NotFound"
import MainLayout from "@/components/MainLayout"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import { DataProvider } from './contexts/DataContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout><Dashboard /></MainLayout>,
    },
    {
      path: "/data-upload",
      element: <MainLayout><DataUpload /></MainLayout>,
    },
    {
      path: "/data-cleansing",
      element: <MainLayout><DataCleansing /></MainLayout>,
    },
    {
      path: "/visualization",
      element: <MainLayout><Visualization /></MainLayout>,
    },
    {
      path: "/reports",
      element: <MainLayout><Reports /></MainLayout>,
    },
    {
      path: "/settings",
      element: <MainLayout><Settings /></MainLayout>,
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  return (
    <DataProvider>
      <ThemeProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </DataProvider>
  );
}

export default App
