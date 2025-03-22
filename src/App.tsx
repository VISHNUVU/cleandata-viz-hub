
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from '@/components/ThemeProvider'
import MainLayout from '@/components/MainLayout'
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import DataUpload from '@/pages/DataUpload'
import DataCleansing from '@/pages/DataCleansing'
import Visualization from '@/pages/Visualization'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'
import DashboardBuilder from '@/pages/DashboardBuilder'
import { DataProvider } from '@/contexts/DataContext'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="data-upload" element={<DataUpload />} />
              <Route path="data-cleansing" element={<DataCleansing />} />
              <Route path="visualization" element={<Visualization />} />
              <Route path="dashboard-builder" element={<DashboardBuilder />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
