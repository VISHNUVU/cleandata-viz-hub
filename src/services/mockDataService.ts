
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile, FileData } from '@/types/file';

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

// Mock helper functions
export function createMockUploadedFile(file: File, fileFormat: string): UploadedFile {
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

export function getMockRecentUploads(): UploadedFile[] {
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

export function getMockFileData(fileId: string): FileData | null {
  return mockData['mock-data'] || null;
}
