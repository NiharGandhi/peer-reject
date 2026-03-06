import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File exceeds 10MB limit' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // pdf-parse v1 — default export, accepts a Buffer directly
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length < 100) {
      return NextResponse.json(
        { error: 'Could not extract readable text from PDF. Make sure it is not scanned/image-only.' },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: data.text });
  } catch (err) {
    console.error('[parse-pdf]', err);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}
