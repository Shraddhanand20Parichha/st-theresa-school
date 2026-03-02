const fs = require('fs');

// Update NewsTicker
fs.writeFileSync('src/components/NewsTicker.tsx', `
'use client';
import { useState, useEffect } from 'react';

export default function NewsTicker() {
  const [tickerText, setTickerText] = useState('Important Update: Admissions open for the current academic year.');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.newsTicker) {
          setTickerText(data.newsTicker);
        }
      })
      .catch(err => console.error("Failed to fetch ticker text:", err));
  }, []);

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

// Update HeroSlider
fs.writeFileSync('src/components/HeroSlider.tsx', `
'use client';
import { useState, useEffect } from 'react';

export default function HeroSlider() {
  const [banners, setBanners] = useState([
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600' }
  ]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.posters && data.posters.length > 0) {
          setBanners(data.posters);
        }
      })
      .catch(err => console.error("Failed to fetch banners:", err));
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
      {banners.map((banner) => (
        <div key={banner.id} className="absolute inset-0 transition-opacity duration-1000 opacity-100">
          <img src={banner.url} alt="School Banner" className="w-full h-full object-cover" onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600';
          }} />
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
console.log('Updated ticker and slider');
