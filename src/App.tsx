import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from "@/pages/Home"
import DataUpload from "@/pages/DataUpload"
import DataCleansing from "@/pages/DataCleansing"
import MainLayout from "@/components/MainLayout"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import { DataProvider } from './contexts/DataContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout><Home /></MainLayout>,
    },
    {
      path: "/data-upload",
      element: <MainLayout><DataUpload /></MainLayout>,
    },
    {
      path: "/data-cleansing",
      element: <MainLayout><DataCleansing /></MainLayout>,
    },
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
