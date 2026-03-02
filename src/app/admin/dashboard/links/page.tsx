
'use client';
import { useState, useEffect } from 'react';

type QuickLink = { id: number; title: string; description: string; url: string };

export default function LinkManager() {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = () => {
    setLoading(true);
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setLinks(data.quickLinks || []);
        setLoading(false);
      });
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = { id: Date.now(), title, description, url };
    const updatedLinks = [...links, newLink];
    
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quickLinks: updatedLinks })
    });
    
    setLinks(updatedLinks);
    setTitle('');
    setDescription('');
    setUrl('');
    setIsAdding(false);
  };

  const handleDelete = async (id: number) => {
    const updatedLinks = links.filter(l => l.id !== id);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quickLinks: updatedLinks })
    });
    setLinks(updatedLinks);
  };

  if (loading) return <div>Loading links...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary">Menu Manager</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the Quick Links shown on the Homepage.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          {isAdding ? 'Cancel' : '+ Add New Link'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddLink} className="mb-8 bg-gray-50 p-4 border border-gray-200 rounded-lg space-y-4">
          <h3 className="font-semibold text-gray-800">Create New Homepage Link</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Button Title (e.g., 'Exam Results')</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded text-sm" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">URL / Link path</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded text-sm" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Brief Description (Optional)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors text-sm">
            Save Link
          </button>
        </form>
      )}

      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-gray-500 italic py-4">No quick links configured yet.</p>
        ) : (
          links.map(link => (
            <div key={link.id} className="flex justify-between items-center p-3 border border-gray-100 rounded hover:bg-gray-50">
              <div>
                <p className="font-semibold text-gray-900">{link.title}</p>
                <div className="flex mt-1 space-x-4 text-xs text-gray-500">
                  <span><span className="font-medium text-gray-700">URL:</span> {link.url}</span>
                  {link.description && <span><span className="font-medium text-gray-700">Desc:</span> {link.description}</span>}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(link.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
