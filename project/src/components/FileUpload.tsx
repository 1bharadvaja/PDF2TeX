import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, File } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out cursor-pointer
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        {isDragActive ? (
          <FileUp className="w-12 h-12 text-blue-500" />
        ) : (
          <File className="w-12 h-12 text-gray-400" />
        )}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to browse files
          </p>
        </div>
      </div>
    </div>
  );
}