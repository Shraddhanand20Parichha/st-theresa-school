
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
          <Link href="/admin/dashboard" className={`block px-4 py-3 rounded-md transition-colors ${pathname === '/admin/dashboard' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}`}>
            Overview
          </Link>
          <Link href="/admin/dashboard/cbse-vault" className={`block px-4 py-3 rounded-md transition-colors ${pathname === '/admin/dashboard/cbse-vault' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}`}>
            CBSE Vault
          </Link>
          <Link href="/admin/dashboard/media" className={`block px-4 py-3 rounded-md transition-colors ${pathname === '/admin/dashboard/media' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}`}>
            Media Manager
          </Link>
          <Link href="/admin/dashboard/links" className={`block px-4 py-3 rounded-md transition-colors ${pathname === '/admin/dashboard/links' ? 'bg-primary-light text-white' : 'text-primary-foreground hover:bg-primary-light/50'}`}>
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
