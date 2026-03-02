
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
