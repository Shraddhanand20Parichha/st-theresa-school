const fs = require('fs');

// Initialize quickLinks in db.json if not present
const dbPath = 'data/db.json';
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  if (!dbData.quickLinks) {
    dbData.quickLinks = [
      { id: Date.now(), title: 'Admission Forms', description: 'Download forms for the new academic session.', url: '#' },
      { id: Date.now() + 1, title: 'Fee Structure', description: 'View the detailed fee breakdown for all classes.', url: '/cbse-disclosure' },
      { id: Date.now() + 2, title: 'Academic Calendar', description: 'Get important dates and events for the year.', url: '#' },
      { id: Date.now() + 3, title: 'Contact Us', description: 'Reach out to the administration for queries.', url: '/about' }
    ];
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  }
}

// 1. Create Link Manager Page
fs.mkdirSync('src/app/admin/dashboard/links', { recursive: true });
fs.writeFileSync('src/app/admin/dashboard/links/page.tsx', `
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
`);

// 2. Update Dashboard Sidebar Layout to include Menu Manager
fs.writeFileSync('src/app/admin/dashboard/layout.tsx', `
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuth = window.localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      router.push('/admin');
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogout = () => {
    window.localStorage.removeItem('isAuthenticated');
    router.push('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-primary text-white shadow-lg flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-primary-light px-4">
          <h1 className="text-xl font-bold text-accent-light text-center">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin/dashboard" className={\`block px-4 py-3 rounded-md transition-colors \${pathname === '/admin/dashboard' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}\`}>
            Overview
          </Link>
          <Link href="/admin/dashboard/cbse-vault" className={\`block px-4 py-3 rounded-md transition-colors \${pathname === '/admin/dashboard/cbse-vault' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}\`}>
            CBSE Vault
          </Link>
          <Link href="/admin/dashboard/media" className={\`block px-4 py-3 rounded-md transition-colors \${pathname === '/admin/dashboard/media' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}\`}>
            Media Manager
          </Link>
          <Link href="/admin/dashboard/links" className={\`block px-4 py-3 rounded-md transition-colors \${pathname === '/admin/dashboard/links' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}\`}>
            Menu Manager
          </Link>
        </nav>
        <div className="p-4 border-t border-primary-light">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-primary-light rounded transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
            <Link href="/" target="_blank" className="text-sm font-medium text-primary hover:text-primary-light flex items-center">
              View Website 
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
`);

// 3. Update Homepage to render links dynamically
fs.writeFileSync('src/app/page.tsx', `
import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let quickLinks = [];
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    
    const res = await fetch(\`\${protocol}://\${host}/api/settings\`, { cache: 'no-store' });
    if (res.ok) {
        const data = await res.json();
        quickLinks = data.quickLinks || [];
    }
  } catch (e) {
    console.error("Failed to fetch quick links", e);
  }

  return (
    <div>
      <HeroSlider />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8 relative inline-block">
            Quick Links
            <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-accent rounded-full -mb-2"></span>
          </h2>
          
          {quickLinks.length === 0 ? (
             <p className="text-gray-500">No quick links available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link: any) => (
                <div key={link.id} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left flex flex-col h-full group">
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-primary-light transition-colors">{link.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{link.description}</p>
                  <Link href={link.url} className="text-accent font-semibold hover:text-accent-light inline-flex items-center group/btn">
                    Access Link 
                    <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
`);
console.log('Menu Manager deployed');
