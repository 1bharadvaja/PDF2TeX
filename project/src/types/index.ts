export interface FileDetails {
  name: string;
  size: number;
}

export interface ConversionState {
  isConverting: boolean;
  error: string | null;
  latex: string;
}

export interface APIResponse {
  latex?: string;
  error?: string;
}

export interface ErrorMessageProps {
  message: string;
}

export interface FileDetailsProps {
  file: FileDetails;
  latex: string;
  onDownload: () => void;
}