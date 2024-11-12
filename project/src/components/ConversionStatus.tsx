import React from 'react';

interface ConversionStatusProps {
  isConverting: boolean;
}

export default function ConversionStatus({ isConverting }: ConversionStatusProps) {
  if (!isConverting) return null;

  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600 mt-4">Converting your PDF to LaTeX...</p>
    </div>
  );
}