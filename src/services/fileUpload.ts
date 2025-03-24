import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
const ALLOWED_TYPES = [
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/json',
  'text/plain',
  'application/x-parquet',
  'application/avro',
  'application/xml',
  'application/zip',
  'application/gzip'
];

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  chunks: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export class FileUploadService {
  private supabase;
  private uploadQueue: Map<string, FileMetadata> = new Map();
  private activeUploads: Set<string> = new Set();

  constructor() {
    // Initialize Supabase client with your credentials
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
  }

  private async validateFile(file: File): Promise<boolean> {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      throw new Error('File size exceeds 100MB limit');
    }

    return true;
  }

  private async compressFile(file: File): Promise<Blob> {
    // Implement file compression logic here
    // For now, return the original file
    return file;
  }

  private async encryptFile(file: Blob): Promise<Blob> {
    // Implement file encryption logic here
    // For now, return the original file
    return file;
  }

  private async uploadChunk(
    fileId: string,
    chunk: Blob,
    chunkIndex: number,
    onProgress: (progress: UploadProgress) => void
  ): Promise<void> {
    const chunkPath = `${fileId}/chunk_${chunkIndex}`;
    
    try {
      const { error } = await this.supabase.storage
        .from('uploads')
        .upload(chunkPath, chunk, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      onProgress({
        loaded: (chunkIndex + 1) * CHUNK_SIZE,
        total: this.uploadQueue.get(fileId)?.size || 0,
        percentage: ((chunkIndex + 1) / (this.uploadQueue.get(fileId)?.chunks || 1)) * 100
      });
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex}:`, error);
      throw error;
    }
  }

  public async uploadFile(
    file: File,
    onProgress: (progress: UploadProgress) => void,
    onComplete: (fileId: string) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    try {
      // Validate file
      await this.validateFile(file);

      // Generate unique file ID
      const fileId = uuidv4();
      
      // Create file metadata
      const metadata: FileMetadata = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        chunks: Math.ceil(file.size / CHUNK_SIZE),
        status: 'pending'
      };

      // Add to upload queue
      this.uploadQueue.set(fileId, metadata);

      // Compress file if needed
      const compressedFile = await this.compressFile(file);

      // Encrypt file if needed
      const encryptedFile = await this.encryptFile(compressedFile);

      // Upload chunks
      const chunks = Math.ceil(encryptedFile.size / CHUNK_SIZE);
      const uploadPromises: Promise<void>[] = [];

      for (let i = 0; i < chunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, encryptedFile.size);
        const chunk = encryptedFile.slice(start, end);

        uploadPromises.push(
          this.uploadChunk(fileId, chunk, i, onProgress)
        );
      }

      // Wait for all chunks to upload
      await Promise.all(uploadPromises);

      // Update metadata in database
      await this.supabase
        .from('files')
        .insert({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          chunks: chunks,
          status: 'completed',
          uploaded_at: new Date().toISOString()
        });

      // Remove from queue
      this.uploadQueue.delete(fileId);
      this.activeUploads.delete(fileId);

      onComplete(fileId);
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error as Error);
    }
  }

  public async cancelUpload(fileId: string): Promise<void> {
    try {
      // Remove from active uploads
      this.activeUploads.delete(fileId);
      
      // Delete uploaded chunks
      const metadata = this.uploadQueue.get(fileId);
      if (metadata) {
        for (let i = 0; i < metadata.chunks; i++) {
          const chunkPath = `${fileId}/chunk_${i}`;
          await this.supabase.storage
            .from('uploads')
            .remove([chunkPath]);
        }
      }

      // Remove from queue
      this.uploadQueue.delete(fileId);
    } catch (error) {
      console.error('Error canceling upload:', error);
      throw error;
    }
  }

  public getUploadStatus(fileId: string): FileMetadata | undefined {
    return this.uploadQueue.get(fileId);
  }
}

// Export singleton instance
export const fileUploadService = new FileUploadService(); 