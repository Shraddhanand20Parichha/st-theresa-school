
'use client';
import { useState, useEffect } from 'react';

export default function NewsTicker() {
  const [tickerText, setTickerText] = useState('Important Update: Admissions open for the current academic year. Contact the front desk for details.');

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
      <div className="bg-primary px-4 py-1 z-10 whitespace-nowrap hidden md:block uppercase tracking-wider text-accent-light border-r border-accent flex-shrink-0">
        Urgent Updates
      </div>
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div
          className="whitespace-nowrap pl-4 inline-block"
          style={{
            animation: 'ticker-scroll 30s linear infinite',
          }}
        >
          <span>{tickerText}</span>
          <span className="mx-12 text-accent-light">•</span>
          <span>{tickerText}</span>
          <span className="mx-12 text-accent-light">•</span>
          <span>{tickerText}</span>
        </div>
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
