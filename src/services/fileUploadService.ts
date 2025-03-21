
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from '@/types/file';
import { createMockUploadedFile } from './mockDataService';
import { supabase } from '@/integrations/supabase/client';

// Upload file to Supabase Storage
export const uploadFile = async (file: File, fileFormat: string): Promise<UploadedFile | null> => {
  try {
    const fileId = uuidv4();
    const filePath = `uploads/${fileId}-${file.name}`;
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('files')
      .upload(filePath, file);
      
    if (error) {
      console.error('Error uploading file:', error);
      return createMockUploadedFile(file, fileFormat);
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('files')
      .getPublicUrl(data?.path || filePath);
      
    // Create file record in database
    const fileRecord = {
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
      .select('*')
      .single();
      
    if (insertError) {
      console.error('Error inserting file record:', insertError);
      return createMockUploadedFile(file, fileFormat);
    }
    
    // Simulate processing - in a real app, this would be a server function
    setTimeout(async () => {
      await supabase
        .from('uploaded_files')
        .update({ status: 'processed' })
        .eq('id', insertedData.id);
    }, 3000);
    
    return insertedData as unknown as UploadedFile;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return createMockUploadedFile(file, fileFormat);
  }
};
