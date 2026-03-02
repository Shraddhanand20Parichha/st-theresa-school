const fs = require('fs');
const path = require('path');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir('src/components');
ensureDir('src/app/admin');
ensureDir('src/app/cbse-disclosure');

fs.writeFileSync('src/components/NewsTicker.tsx', `
'use client';
import { useState, useEffect } from 'react';

export default function NewsTicker() {
  const [tickerText, setTickerText] = useState('Important Update: Admissions open for the current academic year.');
  return (
    <div className="bg-primary-light text-white text-sm py-1 font-semibold flex overflow-hidden">
      <div className="bg-primary px-4 py-1 z-10 whitespace-nowrap hidden md:block uppercase tracking-wider text-accent-light border-r border-accent">
        Urgent Updates
      </div>
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div className="animate-pulse whitespace-nowrap pl-4">
          <span>{tickerText}</span>
        </div>
      </div>
    </div>
  );
}
`);

fs.writeFileSync('src/components/Navbar.tsx', `
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl text-primary tracking-tight">St. Theresa School</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</Link>
            <Link href="/academics" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Academics</Link>
            <Link href="/admissions" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Admissions</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</Link>
            <Link href="/cbse-disclosure" className="bg-primary text-white hover:bg-primary-light px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">CBSE Mandatory Disclosure</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
`);

fs.writeFileSync('src/components/HeroSlider.tsx', `
'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider() {
  const [banners, setBanners] = useState([
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600' }
  ]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
      {banners.map((banner, index) => (
        <div key={banner.id} className="absolute inset-0 transition-opacity duration-1000 opacity-100">
          <img src={banner.url} alt="School Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md text-center">Welcome to St. Theresa School</h1>
            <p className="text-xl md:text-2xl drop-shadow-md text-center max-w-2xl">Empowering students through knowledge, values, and discipline.</p>
          </div>
        </div>
      ))}
    </div>
  );
}
`);

fs.writeFileSync('src/app/layout.tsx', `
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NewsTicker from '@/components/NewsTicker';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'St. Theresa School, Betul',
  description: 'Official Website of St. Theresa School, Betul',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${geistSans.variable} \${geistMono.variable} antialiased\`}>
        <NewsTicker />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
`);

fs.writeFileSync('src/app/page.tsx', `
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-light">Admission Forms</h3>
              <p className="text-gray-600 mb-4">Download forms for the new academic session.</p>
              <button className="text-accent font-medium hover:text-accent-light">Download &rarr;</button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-light">Fee Structure</h3>
              <p className="text-gray-600 mb-4">View the detailed fee breakdown for all classes.</p>
              <button className="text-accent font-medium hover:text-accent-light">View Details &rarr;</button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-light">Academic Calendar</h3>
              <p className="text-gray-600 mb-4">Get important dates and events for the year.</p>
              <button className="text-accent font-medium hover:text-accent-light">View Calendar &rarr;</button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-primary-light">Contact Us</h3>
              <p className="text-gray-600 mb-4">Reach out to the administration for queries.</p>
              <button className="text-accent font-medium hover:text-accent-light">Contact &rarr;</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`);

console.log('UI Components built successfully.');
