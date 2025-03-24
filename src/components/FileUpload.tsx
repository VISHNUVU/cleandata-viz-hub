import { useState, useCallback, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileIcon, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Shield,
  Compress
} from 'lucide-react';
import { fileUploadService, UploadProgress, FileMetadata } from '@/services/fileUpload';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onUploadComplete: (fileId: string) => void;
  onUploadError: (error: Error) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
}

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  maxFileSize = 100 * 1024 * 1024, // 100MB default
  allowedTypes
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (file.size > maxFileSize) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxFileSize / (1024 * 1024)}MB.`,
        variant: "destructive"
      });
      return;
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a supported file type.",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setUploadProgress(null);
  }, [maxFileSize, allowedTypes, toast]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setCurrentFileId(null);

    try {
      await fileUploadService.uploadFile(
        selectedFile,
        (progress) => setUploadProgress(progress),
        (fileId) => {
          setCurrentFileId(fileId);
          onUploadComplete(fileId);
          toast({
            title: "Upload complete",
            description: "Your file has been uploaded successfully.",
            variant: "default"
          });
        },
        (error) => {
          onUploadError(error);
          toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive"
          });
        }
      );
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, onUploadComplete, onUploadError, toast]);

  const handleCancel = useCallback(async () => {
    if (currentFileId) {
      try {
        await fileUploadService.cancelUpload(currentFileId);
        setCurrentFileId(null);
        setSelectedFile(null);
        setUploadProgress(null);
        toast({
          title: "Upload cancelled",
          description: "The file upload has been cancelled.",
          variant: "default"
        });
      } catch (error) {
        toast({
          title: "Error cancelling upload",
          description: "There was an error cancelling the upload.",
          variant: "destructive"
        });
      }
    }
  }, [currentFileId, toast]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload File</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
            <Badge variant="outline" className="flex items-center">
              <Compress className="w-3 h-3 mr-1" />
              Compressed
            </Badge>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4">
            {selectedFile ? (
              isUploading ? (
                <Loader2 className="h-full w-full animate-spin text-primary" />
              ) : (
                <CheckCircle2 className="h-full w-full text-green-500" />
              )
            ) : (
              <FileIcon className="h-full w-full" />
            )}
          </div>

          <div className="mt-4">
            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
                {uploadProgress && (
                  <div className="w-full">
                    <Progress value={uploadProgress.percentage} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(uploadProgress.loaded)} / {formatFileSize(uploadProgress.total)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="outline" className="relative">
                  <span>Select a file</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileInputChange}
                    accept={allowedTypes?.join(',')}
                  />
                </Button>
                <p className="text-sm text-gray-500">
                  or drag and drop
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {selectedFile && !isUploading && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFile(null);
                setUploadProgress(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
          {isUploading && (
            <Button
              variant="destructive"
              onClick={handleCancel}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          {selectedFile && !isUploading && (
            <Button
              onClick={handleUpload}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
} 