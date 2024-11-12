import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Preview from './components/Preview';
import ErrorMessage from './components/ErrorMessage';
import FileDetails from './components/FileDetails';
import ConversionStatus from './components/ConversionStatus';
import { convertToBase64 } from './utils/fileHelpers';
import { convertPDFToLatex } from './services/api';
import type { ConversionState } from './types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionState, setConversionState] = useState<ConversionState>({
    isConverting: false,
    error: null,
    latex: '',
  });

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setConversionState({
      isConverting: true,
      error: null,
      latex: '',
    });

    try {
      const base64Content = await convertToBase64(file);
      const response = await convertPDFToLatex(base64Content, file.name);

      setConversionState({
        isConverting: false,
        error: null,
        latex: response.latex || '',
      });
    } catch (error) {
      setConversionState({
        isConverting: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        latex: '',
      });
    }
  };

  const handleDownload = () => {
    if (!selectedFile || !conversionState.latex) return;

    const blob = new Blob([conversionState.latex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFile.name.replace('.pdf', '')}.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF to LaTeX Converter
            </h1>
            <p className="text-lg text-gray-600">
              Transform your PDF documents into beautifully formatted LaTeX code
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          <ErrorMessage message={conversionState.error} />

          {selectedFile && (
            <div className="space-y-6">
              <FileDetails
                file={selectedFile}
                latex={conversionState.latex}
                onDownload={handleDownload}
              />

              <ConversionStatus isConverting={conversionState.isConverting} />

              {!conversionState.isConverting && conversionState.latex && (
                <Preview latex={conversionState.latex} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;