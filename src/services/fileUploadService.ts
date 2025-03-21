
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  created_at: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
}

export interface ColumnStats {
  name: string;
  dataType: string;
  missingValues: number;
  uniqueValues: number;
  min?: number | string;
  max?: number | string;
  issues?: DataIssue[];
}

export interface DataIssue {
  type: 'format_inconsistency' | 'missing_value' | 'case_inconsistency' | 'invalid_data' | 'outlier';
  description: string;
  affectedRows: number;
  affectedColumn: string;
  suggestedFix: string;
}

export interface FileData {
  columns: ColumnStats[];
  rows: Record<string, any>[];
  totalIssues: number;
  qualityScore: number;
}

// Upload a file to Supabase storage
export const uploadFile = async (file: File, fileFormat: string): Promise<UploadedFile | null> => {
  try {
    // Create a unique file path
    const fileId = uuidv4();
    const filePath = `uploads/${fileId}/${file.name}`;
    
    // Upload the file to Supabase storage
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('data-files')
      .upload(filePath, file);
    
    if (storageError) {
      console.error('Error uploading file:', storageError);
      return null;
    }
    
    // Get the public URL for the file
    const { data: { publicUrl } } = supabase
      .storage
      .from('data-files')
      .getPublicUrl(filePath);
    
    // Create a record in the database for this file
    const { data: fileRecord, error: dbError } = await supabase
      .from('uploaded_files')
      .insert({
        id: fileId,
        filename: file.name,
        size: file.size,
        type: file.type,
        format: fileFormat,
        url: publicUrl,
        status: 'uploaded',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Error creating file record:', dbError);
      return null;
    }
    
    // Trigger file processing in the background
    processFile(fileId, publicUrl, fileFormat);
    
    return fileRecord as UploadedFile;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

// Get a list of recently uploaded files
export const getRecentUploads = async (limit = 10): Promise<UploadedFile[]> => {
  try {
    const { data, error } = await supabase
      .from('uploaded_files')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching recent uploads:', error);
      return [];
    }
    
    return data as UploadedFile[];
  } catch (error) {
    console.error('Failed to fetch recent uploads:', error);
    return [];
  }
};

// Process the uploaded file (this would trigger a Supabase Edge Function in production)
const processFile = async (fileId: string, fileUrl: string, fileFormat: string) => {
  try {
    // Update status to processing
    await supabase
      .from('uploaded_files')
      .update({ status: 'processing' })
      .match({ id: fileId });
    
    // In a real implementation, this would call a Supabase Edge Function
    // with the Gemini API integration. For now, we'll simulate the process.
    
    // Simulate processing delay
    setTimeout(async () => {
      try {
        // Update the status to processed
        await supabase
          .from('uploaded_files')
          .update({ 
            status: 'processed',
            processed_at: new Date().toISOString()
          })
          .match({ id: fileId });
        
        // Generate sample analysis results
        const sampleFileData = generateSampleFileData();
        
        // Store the analysis results
        await supabase
          .from('file_analyses')
          .insert({
            file_id: fileId,
            analysis_data: sampleFileData,
            created_at: new Date().toISOString()
          });
        
      } catch (error) {
        console.error('Error updating file status:', error);
        await supabase
          .from('uploaded_files')
          .update({ status: 'error' })
          .match({ id: fileId });
      }
    }, 3000); // 3 second delay to simulate processing
    
  } catch (error) {
    console.error('Error processing file:', error);
    await supabase
      .from('uploaded_files')
      .update({ status: 'error' })
      .match({ id: fileId });
  }
};

// Get file analysis data
export const getFileAnalysis = async (fileId: string): Promise<FileData | null> => {
  try {
    const { data, error } = await supabase
      .from('file_analyses')
      .select('analysis_data')
      .match({ file_id: fileId })
      .single();
    
    if (error) {
      console.error('Error fetching file analysis:', error);
      return null;
    }
    
    return data.analysis_data as FileData;
  } catch (error) {
    console.error('Failed to fetch file analysis:', error);
    return null;
  }
};

// Generate sample file data for development purposes
// In production, this would be replaced with actual analysis from Gemini API
const generateSampleFileData = (): FileData => {
  return {
    columns: [
      {
        name: 'Date',
        dataType: 'date',
        missingValues: 0,
        uniqueValues: 4,
        issues: [
          {
            type: 'format_inconsistency',
            description: 'Date format inconsistency',
            affectedRows: 1,
            affectedColumn: 'Date',
            suggestedFix: 'Standardize date format to YYYY-MM-DD'
          }
        ]
      },
      {
        name: 'Product ID',
        dataType: 'string',
        missingValues: 0,
        uniqueValues: 4,
        issues: [
          {
            type: 'case_inconsistency',
            description: 'Case inconsistency in product IDs',
            affectedRows: 1,
            affectedColumn: 'Product ID',
            suggestedFix: 'Standardize product ID format to PRD-XXX'
          }
        ]
      },
      {
        name: 'Region',
        dataType: 'string',
        missingValues: 0,
        uniqueValues: 4,
        issues: [
          {
            type: 'case_inconsistency',
            description: 'Case inconsistency in region names',
            affectedRows: 1,
            affectedColumn: 'Region',
            suggestedFix: 'Capitalize first letter of region names'
          }
        ]
      },
      {
        name: 'Sales Amount',
        dataType: 'currency',
        missingValues: 0,
        uniqueValues: 4,
        min: 950.25,
        max: 2100.75,
        issues: [
          {
            type: 'format_inconsistency',
            description: 'Missing currency symbol in some rows',
            affectedRows: 1,
            affectedColumn: 'Sales Amount',
            suggestedFix: 'Format all currency values with $ prefix'
          }
        ]
      },
      {
        name: 'Quantity',
        dataType: 'number',
        missingValues: 1,
        uniqueValues: 3,
        min: 3,
        max: 8,
        issues: [
          {
            type: 'missing_value',
            description: 'Missing numeric value (N/A)',
            affectedRows: 1,
            affectedColumn: 'Quantity',
            suggestedFix: 'Replace N/A with 0 or average value'
          }
        ]
      }
    ],
    rows: [
      {
        "Date": "2023-01-15",
        "Product ID": "PRD-001",
        "Region": "North America",
        "Sales Amount": "$1,250.00",
        "Quantity": 5
      },
      {
        "Date": "2023/01/16",
        "Product ID": "PRD-002",
        "Region": "Europe",
        "Sales Amount": "1,450.50",
        "Quantity": 3
      },
      {
        "Date": "2023-01-17",
        "Product ID": "prd003",
        "Region": "asia",
        "Sales Amount": "$2,100.75",
        "Quantity": 8
      },
      {
        "Date": "2023-01-18",
        "Product ID": "PRD-004",
        "Region": "South America",
        "Sales Amount": "$950.25",
        "Quantity": "N/A"
      }
    ],
    totalIssues: 5,
    qualityScore: 85
  };
};
