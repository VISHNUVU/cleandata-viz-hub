
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
