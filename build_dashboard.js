const fs = require('fs');
const path = require('path');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir('src/app/admin/dashboard');
ensureDir('data');
ensureDir('src/app/api/settings');

// Initialize dummy db
if (!fs.existsSync('data/db.json')) {
  fs.writeFileSync('data/db.json', JSON.stringify({
    newsTicker: 'Important Update: Admissions open for the current academic year. Contact the front desk for details.',
    posters: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600' }
    ],
    cbseDocuments: {
      affiliation: '',
      trust: '',
      noc: '',
      recognition: '',
      buildingSafety: '',
      fireSafety: '',
      healthSanitation: '',
      feeStructure: ''
    }
  }, null, 2));
}

// API Route for Settings
fs.writeFileSync('src/app/api/settings/route.ts', `
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    const newData = { ...currentData, ...body };
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
    
    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
  }
}
`);

// Admin Dashboard Layout (Sidebar)
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

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('isAuthenticated');
    router.push('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
            Media & Ticker
          </Link>
        </nav>
        <div className="p-4 border-t border-primary-light">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-primary-light rounded transition-colors text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h2>
            <Link href="/" target="_blank" className="text-sm font-medium text-primary hover:text-primary-light">
              View Website &nearr;
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

// Overview Page
fs.writeFileSync('src/app/admin/dashboard/page.tsx', `
export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">CBSE Vault</h3>
        <p className="text-sm text-gray-500 mb-4">Manage mandatory disclosure documents according to CBSE guidelines.</p>
        <a href="/admin/dashboard/cbse-vault" className="text-primary font-medium hover:underline text-sm">Manage Documents &rarr;</a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Media Manager</h3>
        <p className="text-sm text-gray-500 mb-4">Update homepage slider posters from Canva and edit the scrolling news ticker.</p>
        <a href="/admin/dashboard/media" className="text-primary font-medium hover:underline text-sm">Manage Ext &rarr;</a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Links</h3>
        <p className="text-sm text-gray-500 mb-4">Update important links like Admission Forms and Fee Structures.</p>
        <a href="#" className="text-primary font-medium hover:underline text-sm">Manage Links &rarr;</a>
      </div>
    </div>
  );
}
`);

console.log('API and Dashboard Layout built.');
