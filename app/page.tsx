'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import { supabase } from '@/lib/supabase';

interface Star {
  id: number;
  xDir: number;
  yDir: number;
  delay: number;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [urduSummary, setUrduSummary] = useState('');
  const [stars, setStars] = useState<Star[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const numStars = 1 + Math.floor(Math.random() * 2);
      const newStars = Array.from({ length: numStars }).map(() => ({
        id: counter + Math.random(),
        xDir: (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 70),
        yDir: (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 50),
        delay: Math.random() * 2,
      }));
      setStars(prev => [...prev, ...newStars]);
      setCounter(c => c + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [counter]);

  const handleSummarize = () => {
    const fakeSummary = 'Stay productive remotely: manage time, use tools, take breaks.';

    setSummary(fakeSummary);

    const dictionary: { [key: string]: string } = {
      'Stay': 'رہیں',
      'productive': 'پیداواری',
      'remotely:': 'دور سے:',
      'manage': 'انتظام',
      'time,': 'وقت،',
      'use': 'استعمال',
      'tools,': 'اوزار،',
      'take': 'لیں',
      'breaks.': 'وقفے۔'
    };

    const translated = fakeSummary
      .split(' ')
      .map(word => dictionary[word] || word)
      .join(' ');

    setUrduSummary(translated);

    saveToSupabase(url, fakeSummary, translated);
  };

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {stars.map((star) => (
          <div
            key={star.id}
            className="shooting-star"
            style={{
              animationDelay: `${star.delay}s`,
              transform: 'translate(0, 0)',
              '--x': `${star.xDir}vw`,
              '--y': `${star.yDir}vh`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center h-screen p-4 max-w-2xl mx-auto space-y-6">

        {/* Solid Black Title */}
        <h1 className="text-4xl font-bold text-center text-black drop-shadow-lg">
          Blog Summariser
        </h1>

        <Input
          type="url"
          placeholder="Paste blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full max-w-lg border-gray-300 shadow-lg"
        />

        {/* Black Button */}
        <Button
          onClick={handleSummarize}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg shadow-xl transition-all duration-300"
        >
          Summarize Blog
        </Button>

        {summary && (
          <div className="bg-white text-black rounded-lg p-4 space-y-4 shadow-lg w-full max-w-lg">
            <div>
              <h2 className="font-semibold text-lg">AI Summary:</h2>
              <p>{summary}</p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">Urdu Translation:</h2>
              <p>{urduSummary}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const saveToSupabase = async (url: string, summary: string, urdu: string) => {
  const { data, error } = await supabase
    .from('summaries')
    .insert([{ url, summary, urdu_summary: urdu }]);

  if (error) {
    console.error('Error saving to Supabase:', error);
  } else {
    console.log('Saved successfully:', data);
  }
};
