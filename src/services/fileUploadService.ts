import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  id: string;
  filename: string;
  type: string;
  size: number;
  url: string;
  created_at: string;
  updated_at: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  metadata?: Record<string, any>;
}

export interface Column {
  name: string;
  type: string;
  issues?: DataIssue[];
}

export interface FileData {
  columns: Column[];
  rows: Record<string, any>[];
  totalIssues: number;
  qualityScore: number;
}

export interface DataIssue {
  type: string;
  description: string;
  affectedColumn: string;
  suggestedFix: string;
}

export interface ColumnStats {
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  nullCount: number;
  uniqueCount: number;
}

// Simulate processed data for development
const mockData: Record<string, FileData> = {
  'mock-data': {
    columns: [
      { 
        name: 'Date', 
        type: 'date',
        issues: [
          {
            type: 'format_inconsistency',
            description: 'Date Format Inconsistency',
            affectedColumn: 'Date',
            suggestedFix: 'Standardize dates to YYYY-MM-DD format'
          }
        ]
      },
      { 
        name: 'Product ID', 
        type: 'string',
        issues: [
          {
            type: 'case_inconsistency',
            description: 'Capitalization Issues',
            affectedColumn: 'Product ID',
            suggestedFix: 'Standardize product IDs with proper formatting (PRD-XXX)'
          }
        ]
      },
      { 
        name: 'Region', 
        type: 'string',
        issues: [
          {
            type: 'case_inconsistency',
            description: 'Capitalization Issues',
            affectedColumn: 'Region',
            suggestedFix: 'Capitalize all region names consistently'
          }
        ]
      },
      { 
        name: 'Sales Amount', 
        type: 'currency',
        issues: [
          {
            type: 'format_inconsistency',
            description: 'Missing Currency Symbol',
            affectedColumn: 'Sales Amount',
            suggestedFix: 'Add $ symbol to all currency values'
          }
        ]
      },
      { 
        name: 'Quantity', 
        type: 'number',
        issues: [
          {
            type: 'missing_value',
            description: 'Missing Numeric Value',
            affectedColumn: 'Quantity',
            suggestedFix: 'Replace N/A values with zeros or average value'
          }
        ]
      }
    ],
    rows: [
      { 'Date': '2023-01-15', 'Product ID': 'PRD-001', 'Region': 'North America', 'Sales Amount': '$1,250.00', 'Quantity': '5' },
      { 'Date': '2023/01/16', 'Product ID': 'PRD-002', 'Region': 'Europe', 'Sales Amount': '1,450.50', 'Quantity': '3' },
      { 'Date': '2023-01-17', 'Product ID': 'prd003', 'Region': 'asia', 'Sales Amount': '$2,100.75', 'Quantity': '8' },
      { 'Date': '2023-01-18', 'Product ID': 'PRD-004', 'Region': 'South America', 'Sales Amount': '$950.25', 'Quantity': 'N/A' }
    ],
    totalIssues: 5,
    qualityScore: 72
  }
};

// Upload file to Supabase Storage
export const uploadFile = async (file: File, fileFormat: string): Promise<UploadedFile | null> => {
  try {
    const fileId = uuidv4();
    const filePath = `uploads/${fileId}-${file.name}`;
    
    // Try to upload to Supabase storage if available
    const { data, error } = await supabase.storage
      .from('files')
      .upload(filePath, file);
      
    if (error && !data) {
      console.error('Error uploading file:', error);
      // Use mock data for development
      return createMockUploadedFile(file, fileFormat);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(data?.path || filePath);
      
    // Create file record in database
    const fileRecord: Omit<UploadedFile, 'id'> = {
      filename: file.name,
      type: file.type,
      size: file.size,
      url: urlData.publicUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'processing',
      metadata: {
        format: fileFormat,
        originalName: file.name
      }
    };
    
    // Store file record in database
    const { data: insertedData, error: insertError } = await supabase
      .from('uploaded_files')
      .insert(fileRecord);
      
    if (insertError) {
      console.error('Error inserting file record:', insertError);
      // Use mock data for development
      return createMockUploadedFile(file, fileFormat);
    }
    
    // Simulate processing - in a real app, this would be a server function
    // Fix: Handle the update operation differently based on the Supabase client type
    setTimeout(() => {
      const updateOperation = supabase
        .from('uploaded_files')
        .update({ status: 'processed' });
        
      if (insertedData && insertedData.id) {
        // Check if eq method exists (real Supabase client) by safely testing for its existence
        if (updateOperation && typeof (updateOperation as any).eq === 'function') {
          // Use type assertion to handle the eq method
          ((updateOperation as any).eq('id', insertedData.id))
            .then(() => console.log('File status updated to processed'))
            .catch((err: Error) => console.error('Error updating file status:', err));
        } else {
          // For mock client that returns a Promise directly
          (updateOperation as Promise<any>)
            .then(() => console.log('File status updated to processed (mock)'))
            .catch((err: Error) => console.error('Error updating file status:', err));
        }
      }
    }, 3000);
    
    return insertedData as UploadedFile;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    // Fallback to mock data for development
    return createMockUploadedFile(file, fileFormat);
  }
};

// Get recent uploads from Supabase
export const getRecentUploads = async (limit: number = 10): Promise<UploadedFile[]> => {
  try {
    const fetchOperation = supabase
      .from('uploaded_files')
      .select('*')
      .order('created_at', { ascending: false });
      
    // Handle different Supabase client implementations (real vs mock)
    if (fetchOperation && typeof (fetchOperation as any).limit === 'function') {
      const { data, error } = await (fetchOperation as any).limit(limit);
      
      if (error) {
        console.error('Error fetching recent uploads:', error);
        // Return mock data for development
        return getMockRecentUploads();
      }
      
      return data as UploadedFile[];
    } else {
      // For mock client where fetchOperation is already a Promise
      return getMockRecentUploads();
    }
  } catch (error) {
    console.error('Error in getRecentUploads:', error);
    // Fallback to mock data for development
    return getMockRecentUploads();
  }
};

// Get file data for data cleansing
export const getFileData = async (fileId: string): Promise<FileData | null> => {
  try {
    // In a real app, this would fetch the processed data from Supabase
    // For now, we'll return mock data
    return mockData['mock-data'] || null;
  } catch (error) {
    console.error('Error getting file data:', error);
    return null;
  }
};

// Get file analysis for data cleansing
export const getFileAnalysis = async (fileId: string): Promise<FileData | null> => {
  try {
    // In a real app, this would fetch the file analysis from Supabase or an AI service
    // For now, we'll return mock data
    return mockData['mock-data'] || null;
  } catch (error) {
    console.error('Error getting file analysis:', error);
    return null;
  }
};

// Mock functions for development
function createMockUploadedFile(file: File, fileFormat: string): UploadedFile {
  return {
    id: uuidv4(),
    filename: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'processed',
    metadata: {
      format: fileFormat
    }
  };
}

function getMockRecentUploads(): UploadedFile[] {
  return [
    {
      id: '1',
      filename: 'sales_data_2023.csv',
      type: 'text/csv',
      size: 4200000,
      url: 'https://example.com/sales_data_2023.csv',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'processed'
    },
    {
      id: '2',
      filename: 'customer_feedback.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 2800000,
      url: 'https://example.com/customer_feedback.xlsx',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      status: 'processed'
    },
    {
      id: '3',
      filename: 'product_inventory.json',
      type: 'application/json',
      size: 1500000,
      url: 'https://example.com/product_inventory.json',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 172800000).toISOString(),
      status: 'processing'
    }
  ];
}
