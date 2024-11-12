import { VercelRequest, VercelResponse } from '@vercel/node';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pdf_content, filename } = req.body;

    if (!pdf_content || !filename) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a PDF to LaTeX converter. Convert the provided PDF content into LaTeX code, maintaining the formatting as closely as possible."
        },
        {
          role: "user",
          content: `Convert the following PDF content into LaTeX code. Maintain the formatting as closely as possible to the original PDF:\n\n${pdf_content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const latex = completion.choices[0]?.message?.content;

    if (!latex) {
      throw new Error('No LaTeX content generated');
    }

    return res.status(200).json({ latex });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
  }
}