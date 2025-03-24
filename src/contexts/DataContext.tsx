import { createContext, useContext, useState, ReactNode } from 'react';
import { DataAnalysis } from '@/services/dataAnalysis';

interface FileData {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  analysis?: DataAnalysis;
}

interface DataContextType {
  selectedFile: FileData | null;
  fileData: FileData | null;
  setFileData: (data: FileData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  setSelectedFile: (file: FileData | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <DataContext.Provider
      value={{
        selectedFile,
        fileData,
        setFileData,
        isLoading,
        setIsLoading,
        error,
        setError,
        setSelectedFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
