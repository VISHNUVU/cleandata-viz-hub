
// Re-export all service functions to maintain the same API
export * from './fileUploadService';
export * from './fileDataService';
export { getMockRecentUploads, getMockFileData } from './mockDataService';
export type { UploadedFile, FileData, Column, DataIssue, ColumnStats } from '@/types/file';
