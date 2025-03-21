
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

export interface FileData {
  columns: string[];
  rows: any[][];
  issues?: Issue[];
}

export interface Issue {
  type: string;
  description: string;
  rowIndex?: number;
  columnIndex?: number;
  value?: string;
  suggestion?: string;
}

// Simulate processed data for development
const mockData: Record<string, FileData> = {
  'mock-data': {
    columns: ['Date', 'Product ID', 'Region', 'Sales Amount', 'Quantity'],
    rows: [
      ['2023-01-15', 'PRD-001', 'North America', '$1,250.00', '5'],
      ['2023/01/16', 'PRD-002', 'Europe', '1,450.50', '3'],
      ['2023-01-17', 'prd003', 'asia', '$2,100.75', '8'],
      ['2023-01-18', 'PRD-004', 'South America', '$950.25', 'N/A']
    ],
    issues: [
      {
        type: 'format',
        description: 'Date Format Inconsistency',
        rowIndex: 1,
        columnIndex: 0,
        value: '2023/01/16',
        suggestion: '2023-01-16'
      },
      {
        type: 'format',
        description: 'Missing Currency Symbol',
        rowIndex: 1,
        columnIndex: 3,
        value: '1,450.50',
        suggestion: '$1,450.50'
      },
      {
        type: 'case',
        description: 'Capitalization Issues',
        rowIndex: 2,
        columnIndex: 1,
        value: 'prd003',
        suggestion: 'PRD-003'
      },
      {
        type: 'case',
        description: 'Capitalization Issues',
        rowIndex: 2,
        columnIndex: 2,
        value: 'asia',
        suggestion: 'Asia'
      },
      {
        type: 'value',
        description: 'Missing Numeric Value',
        rowIndex: 3,
        columnIndex: 4,
        value: 'N/A',
        suggestion: '0'
      }
    ]
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
      .insert(fileRecord)
      .select()
      .single();
      
    if (insertError) {
      console.error('Error inserting file record:', insertError);
      // Use mock data for development
      return createMockUploadedFile(file, fileFormat);
    }
    
    // Simulate processing - in a real app, this would be a server function
    setTimeout(async () => {
      const { error: updateError } = await supabase
        .from('uploaded_files')
        .update({ status: 'processed' })
        .eq('id', insertedData.id);
        
      if (updateError) {
        console.error('Error updating file status:', updateError);
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
    const { data, error } = await supabase
      .from('uploaded_files')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching recent uploads:', error);
      // Return mock data for development
      return getMockRecentUploads();
    }
    
    return data as UploadedFile[];
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
