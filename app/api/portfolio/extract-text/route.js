import { NextResponse } from 'next/server';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
    useWorkerFetch: false,
    isEvalSupported: false,
  }).promise;

  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (text) {
      pages.push(text);
    }
  }

  return pages.join('\n\n').trim();
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    const isPdf = file.type === 'application/pdf' || extension === 'pdf';

    if (!isPdf) {
      return NextResponse.json({ error: 'Only PDF files are supported in this upload route.' }, { status: 400 });
    }

    const text = await extractPdfText(file);

    if (!text) {
      return NextResponse.json({ error: 'No readable text was found in the uploaded PDF.' }, { status: 422 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('PDF text extraction failed', error);
    return NextResponse.json({ error: 'Failed to extract text from the uploaded PDF.' }, { status: 500 });
  }
}
