
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const category: string | null = data.get('category') as string;

    if (!file || !category) {
      return NextResponse.json({ success: false, error: 'File and category are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Make filename safe
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${category}-${Date.now()}-${safeName}`;
    
    // Save to public dir
    const path = join(process.cwd(), 'public', 'documents', filename);
    await writeFile(path, buffer);

    // Update DB
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (!dbData.cbseDocuments) dbData.cbseDocuments = {};
    dbData.cbseDocuments[category] = `/documents/${filename}`;
    
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json({ success: true, path: `/documents/${filename}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
