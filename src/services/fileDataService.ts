
import { supabase } from '@/lib/supabase';
import { FileData, UploadedFile } from '@/types/file';
import { getMockRecentUploads, getMockFileData } from './mockDataService';

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
    return getMockFileData(fileId);
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
    return getMockFileData(fileId);
  } catch (error) {
    console.error('Error getting file analysis:', error);
    return null;
  }
};
