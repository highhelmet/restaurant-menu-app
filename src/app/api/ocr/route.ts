import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';
import { PDFExtract } from 'pdf.js-extract';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileType = file.type;
    const buffer = await file.arrayBuffer();
    let text = '';

    // Process based on file type
    if (fileType === 'application/pdf') {
      // Handle PDF files
      const pdfExtract = new PDFExtract();
      const arrayBuffer = new Uint8Array(buffer);
      
      const data = await pdfExtract.extractBuffer(arrayBuffer, {});
      text = data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');
    } else if (fileType.startsWith('image/')) {
      // Handle image files with OCR
      const worker = await createWorker('eng+spa');
      const imageBuffer = new Uint8Array(buffer);
      
      const { data } = await worker.recognize(imageBuffer);
      text = data.text;
      
      await worker.terminate();
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
