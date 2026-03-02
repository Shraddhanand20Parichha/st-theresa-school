const fs = require('fs');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir('src/app/admin/dashboard/cbse-vault');
ensureDir('src/app/admin/dashboard/media');
ensureDir('src/app/api/upload'); // Missing dir
ensureDir('src/app/cbse-disclosure');
ensureDir('public/documents');

// Media Manager
fs.writeFileSync('src/app/admin/dashboard/media/page.tsx', `
'use client';
import { useState, useEffect } from 'react';

export default function MediaManager() {
  const [newsTicker, setNewsTicker] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setNewsTicker(data.newsTicker || '');
        if (data.posters && data.posters.length > 0) {
          setPosterUrl(data.posters[0].url);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Saving...', type: 'info' });
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsTicker,
          posters: [{ id: 1, type: 'image', url: posterUrl }]
        })
      });
      if (res.ok) {
        setStatus({ message: 'Saved successfully!', type: 'success' });
      } else {
        setStatus({ message: 'Failed to save.', type: 'error' });
      }
    } catch {
      setStatus({ message: 'An error occurred.', type: 'error' });
    }
    setTimeout(() => setStatus({ message: '', type: '' }), 3000);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl">
      <h2 className="text-xl font-semibold mb-6 text-primary">Media & News Manager</h2>
      
      {status.message && (
        <div className={\`p-3 rounded mb-4 text-sm \${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}\`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            News Ticker Text
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
            value={newsTicker}
            onChange={(e) => setNewsTicker(e.target.value)}
            placeholder="Important Update: ..."
          />
          <p className="mt-1 text-xs text-gray-500">This text scrolls at the very top of the public website.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Homepage Hero Poster URL (Canva Embed or Image URL)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="https://..."
          />
          <p className="mt-1 text-xs text-gray-500">Paste your design URL from Canva here to update the homepage slider.</p>
          
          {posterUrl && (
            <div className="mt-3 p-2 border border-gray-200 rounded">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img src={posterUrl} alt="Preview" className="h-32 object-cover rounded" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')} />
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-light text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
`);

// API Upload
fs.writeFileSync('src/app/api/upload/route.ts', `
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
    const filename = \`\${category}-\${Date.now()}-\${safeName}\`;
    
    // Save to public dir
    const path = join(process.cwd(), 'public', 'documents', filename);
    await writeFile(path, buffer);

    // Update DB
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (!dbData.cbseDocuments) dbData.cbseDocuments = {};
    dbData.cbseDocuments[category] = \`/documents/\${filename}\`;
    
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));

    return NextResponse.json({ success: true, path: \`/documents/\${filename}\` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
`);

// CBSE Vault Page
fs.writeFileSync('src/app/admin/dashboard/cbse-vault/page.tsx', `
'use client';
import { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: 'affiliation', label: 'Affiliation Certificate' },
  { id: 'trust', label: 'Trust/Society Registration' },
  { id: 'noc', label: 'No Objection Certificate (NOC)' },
  { id: 'recognition', label: 'Recognition Certificate' },
  { id: 'buildingSafety', label: 'Building Safety Certificate' },
  { id: 'fireSafety', label: 'Fire Safety Certificate' },
  { id: 'healthSanitation', label: 'Health & Sanitation Certificate' },
  { id: 'feeStructure', label: 'Fee Structure' },
];

export default function CBSEVault() {
  const [documents, setDocuments] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  const fetchDocs = () => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data.cbseDocuments) setDocuments(data.cbseDocuments);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, categoryId: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', categoryId);

    setUploading(categoryId);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchDocs(); // Refresh
      } else {
        alert('Failed to upload file');
      }
    } catch (err) {
      alert('Upload error');
    }
    setUploading(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-primary">CBSE Mandatory Disclosure Vault</h2>
        <p className="text-sm text-gray-500 mt-1">Upload the 8 mandatory certificates here to display them on the public disclosure page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="border border-gray-200 rounded p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{cat.label}</h3>
              {documents[cat.id] ? (
                <a href={documents[cat.id]} target="_blank" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                  View Current Document &rarr;
                </a>
              ) : (
                <span className="text-sm text-red-500">Not uploaded</span>
              )}
            </div>
            <div className="mt-4">
              <label className="cursor-pointer bg-primary hover:bg-primary-light text-white text-sm font-medium py-2 px-4 rounded inline-flex items-center transition-colors">
                {uploading === cat.id ? 'Uploading...' : 'Upload PDF'}
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleUpload(e, cat.id)}
                  disabled={uploading === cat.id}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// Public CBSE Disclosure page
fs.writeFileSync('src/app/cbse-disclosure/page.tsx', `
import Link from 'next/link';
import { headers } from 'next/headers';

const CATEGORIES = [
  { id: 'affiliation', label: 'Affiliation Certificate' },
  { id: 'trust', label: 'Trust/Society Registration' },
  { id: 'noc', label: 'No Objection Certificate (NOC)' },
  { id: 'recognition', label: 'Recognition Certificate' },
  { id: 'buildingSafety', label: 'Building Safety Certificate' },
  { id: 'fireSafety', label: 'Fire Safety Certificate' },
  { id: 'healthSanitation', label: 'Health & Sanitation Certificate' },
  { id: 'feeStructure', label: 'Fee Structure' },
];

export const dynamic = 'force-dynamic';

export default async function CBSEDisclosurePublic() {
  let documents: Record<string, string> = {};
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    const res = await fetch(\`\${protocol}://\${host}/api/settings\`, { cache: 'no-store' });
    if (res.ok) {
        const data = await res.json();
        documents = data.cbseDocuments || {};
    }
  } catch (e) {
    console.error("Failed to fetch documents", e);
  }

  return (
    <div className="py-16 bg-gray-50 min-h-[calc(100vh-80px-32px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-primary p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">CBSE Mandatory Disclosure</h1>
              <p className="text-primary-foreground">Documents published in accordance with CBSE guidelines.</p>
            </div>
          
          <div className="p-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr. No.</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Information</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {CATEGORIES.map((cat, idx) => (
                    <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{idx + 1}</td>
                        <td className="px-6 py-5 text-sm font-semibold text-gray-900">{cat.label}</td>
                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                        {documents[cat.id] ? (
                            <a href={documents[cat.id]} target="_blank" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-light transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                                View PDF
                            </a>
                        ) : (
                            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 italic">
                                Pending Release
                            </span>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

console.log('Admin Vault and Media generated.');
