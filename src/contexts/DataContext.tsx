import { createContext, useContext, useState, ReactNode } from 'react';
import { UploadedFile, FileData } from '@/types/file';

interface DataContextType {
  selectedFile: UploadedFile | null;
  fileData: FileData | null;
  isLoading: boolean;
  error: string | null;
  setSelectedFile: (file: UploadedFile | null) => void;
  setFileData: (data: FileData | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{
      selectedFile,
      fileData,
      isLoading,
      error,
      setSelectedFile,
      setFileData,
      setIsLoading,
      setError
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
