import React, { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    // Page scroll disable jab tak loader dikhe
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100000] bg-black flex items-center justify-center overflow-hidden gap-4">
      {'HARSH'.split('').map((char, idx) => (
        <span
          key={idx}
          className="inline-block text-6xl font-extrabold text-[#D3AF37] opacity-0 animate-fadeUp"
          style={{ animationDelay: `${idx * 0.15}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
