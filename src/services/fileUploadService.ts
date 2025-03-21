
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile, FileData } from '@/types/file';
import { createMockUploadedFile, getMockRecentUploads, getMockFileData } from './mockDataService';

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
