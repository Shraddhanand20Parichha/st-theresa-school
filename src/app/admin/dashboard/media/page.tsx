
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

  const isEmbed = posterUrl.includes('<iframe') || posterUrl.includes('<div');

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl">
      <h2 className="text-xl font-semibold mb-6 text-primary">Media & News Manager</h2>
      
      {status.message && (
        <div className={`p-3 rounded mb-4 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
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
            Homepage Hero Poster (Canva Embed HTML or Image URL)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary sm:text-sm h-32 font-mono text-sm"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="Paste your Canva embed code here (<div style=...) OR a direct image link (https://...)"
          />
          <p className="mt-1 text-xs text-gray-500">
            <strong>Pro Tip:</strong> In Canva, click <em>Share &rarr; More &rarr; Embed</em>, and copy the <strong>HTML embed code</strong>. Paste it here to make your website banner update live whenever you edit it in Canva!
          </p>
          
          {posterUrl && !isEmbed && (
            <div className="mt-3 p-2 border border-gray-200 rounded">
              <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
              <img src={posterUrl} alt="Preview" className="h-32 object-cover rounded" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL')} />
            </div>
          )}
          {isEmbed && (
            <div className="mt-3 p-3 bg-blue-50 text-blue-800 rounded border border-blue-100 text-sm">
              <span className="font-semibold">HTML Embed Detected:</span> This component will render securely on the homepage.
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
