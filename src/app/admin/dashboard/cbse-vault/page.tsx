
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
