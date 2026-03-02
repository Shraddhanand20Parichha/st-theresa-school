
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

  const renderBanner = (banner: any) => {
    const isEmbed = banner.url.includes('<iframe') || banner.url.includes('<div');
    
    if (isEmbed) {
      return (
        <div 
          className="w-full h-full flex items-center justify-center [&>div]:w-full [&>div]:h-full [&>iframe]:w-full [&>iframe]:h-full"
          dangerouslySetInnerHTML={{ __html: banner.url }} 
        />
      );
    }

    return (
      <>
        <img 
          src={banner.url} 
          alt="School Banner" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600&h=600';
          }} 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md text-center">Welcome to St. Theresa School</h1>
          <p className="text-xl md:text-2xl drop-shadow-md text-center max-w-2xl">Empowering students through knowledge, values, and discipline.</p>
        </div>
      </>
    );
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
      {banners.map((banner) => (
        <div key={banner.id} className="absolute inset-0 transition-opacity duration-1000 opacity-100">
          {renderBanner(banner)}
        </div>
      ))}
    </div>
  );
}
