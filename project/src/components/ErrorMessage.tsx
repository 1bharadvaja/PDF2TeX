import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { ErrorMessageProps } from '../types';

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
}