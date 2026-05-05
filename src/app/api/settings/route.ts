
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch {
    // Return safe defaults if file is unreadable
    return {
      newsTicker: 'Important Update: Admissions open for the current academic year. Contact the front desk for details.',
      posters: [{ id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600' }],
      cbseDocuments: {},
      quickLinks: [],
    };
  }
}

export async function GET() {
  const data = readDb();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = readDb();
    const newData = { ...currentData, ...body };

    // On Vercel / production, the filesystem is read-only.
    // We attempt the write and return success/failure accordingly.
    try {
      fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
      return NextResponse.json({ success: true, data: newData });
    } catch (fsError) {
      console.warn('Filesystem write failed (expected on Vercel):', fsError);
      return NextResponse.json(
        {
          success: false,
          error: 'Settings saved temporarily but cannot be persisted on this deployment. To enable persistent settings, configure a database (e.g., Vercel KV or Postgres).',
          data: newData,
        },
        { status: 200 } // Return 200 so the admin UI doesn't show a hard error
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
  }
}
