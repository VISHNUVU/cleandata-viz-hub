
import { FileData, UploadedFile, Column, ColumnStats } from '@/types/file';
import { getMockRecentUploads, getMockFileData } from './mockDataService';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

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
      return getMockRecentUploads();
    }
    
    return data as unknown as UploadedFile[];
  } catch (error) {
    console.error('Error in getRecentUploads:', error);
    return getMockRecentUploads();
  }
};

// Get file data for data cleansing
export const getFileData = async (fileId: string): Promise<FileData | null> => {
  try {
    const { data, error } = await supabase
      .from('file_data')
      .select('*')
      .eq('file_id', fileId)
      .single();
      
    if (error) {
      console.error('Error fetching file data:', error);
      return getMockFileData(fileId);
    }
    
    return data as unknown as FileData;
  } catch (error) {
    console.error('Error getting file data:', error);
    return getMockFileData(fileId);
  }
};

// Get file analysis for data cleansing
export const getFileAnalysis = async (fileId: string): Promise<FileData | null> => {
  try {
    // First check if we already have analysis data
    const { data, error } = await supabase
      .from('file_data')
      .select('*')
      .eq('file_id', fileId)
      .single();
      
    if (!error && data) {
      return data as unknown as FileData;
    }
    
    // For now, return mock data
    // In a real app, this would call an analysis service
    return getMockFileData(fileId);
  } catch (error) {
    console.error('Error getting file analysis:', error);
    return getMockFileData(fileId);
  }
};

// Save file analysis data
export const saveFileAnalysis = async (fileId: string, analysisData: FileData): Promise<boolean> => {
  try {
    // Convert columns and rows to JSON-compatible format
    const columnsJson = JSON.parse(JSON.stringify(analysisData.columns)) as Json;
    const rowsJson = JSON.parse(JSON.stringify(analysisData.rows)) as Json;
    
    const { error } = await supabase
      .from('file_data')
      .insert({
        file_id: fileId,
        columns: columnsJson,
        rows: rowsJson,
        total_issues: analysisData.totalIssues,
        quality_score: analysisData.qualityScore
      });
      
    if (error) {
      console.error('Error saving file analysis:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveFileAnalysis:', error);
    return false;
  }
};

// Get column statistics for a file
export const getColumnStats = async (fileId: string, columnName: string): Promise<ColumnStats | null> => {
  try {
    const { data, error } = await supabase
      .from('column_stats')
      .select('*')
      .eq('file_id', fileId)
      .eq('column_name', columnName)
      .single();
      
    if (error) {
      console.error('Error fetching column stats:', error);
      return null;
    }
    
    return {
      min: data.min || undefined,
      max: data.max || undefined,
      mean: data.mean || undefined,
      median: data.median || undefined,
      nullCount: data.null_count,
      uniqueCount: data.unique_count
    };
  } catch (error) {
    console.error('Error getting column stats:', error);
    return null;
  }
};

// Save column statistics
export const saveColumnStats = async (fileId: string, columnName: string, stats: ColumnStats): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('column_stats')
      .insert({
        file_id: fileId,
        column_name: columnName,
        min: stats.min,
        max: stats.max,
        mean: stats.mean,
        median: stats.median,
        null_count: stats.nullCount,
        unique_count: stats.uniqueCount
      });
      
    if (error) {
      console.error('Error saving column stats:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveColumnStats:', error);
    return false;
  }
};
