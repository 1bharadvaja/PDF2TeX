import React from 'react';
import { Download, FileText } from 'lucide-react';
import type { FileDetailsProps } from '../types';

export default function FileDetails({ file, latex, onDownload }: FileDetailsProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <FileText className="h-6 w-6 text-blue-500" />
        <div>
          <h2 className="text-lg font-medium text-gray-800">{file.name}</h2>
          <p className="text-sm text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      {latex && (
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={20} />
          <span>Download .tex</span>
        </button>
      )}
    </div>
  );
}