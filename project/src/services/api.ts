import type { APIResponse } from '../types';

const API_BASE_URL = '/api';

export async function convertPDFToLatex(pdfContent: string, filename: string): Promise<APIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdf_content: pdfContent,
        filename,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data: APIResponse = await response.json();

    if (!data.latex) {
      throw new Error('No LaTeX content received from server');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
    throw new Error('Unexpected conversion error occurred');
  }
}