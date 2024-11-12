import React from 'react';

interface PreviewProps {
  latex: string;
}

export default function Preview({ latex }: PreviewProps) {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-6 overflow-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">LaTeX Output</h2>
      <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono whitespace-pre-wrap overflow-x-auto">
        {latex || 'Your LaTeX code will appear here...'}
      </pre>
    </div>
  );
}