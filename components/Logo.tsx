import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  return (
    <svg viewBox="0 0 280 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b6542" />
          <stop offset="50%" stopColor="#b4875e" />
          <stop offset="100%" stopColor="#c9a87c" />
        </linearGradient>
      </defs>

      {/* K Mark */}
      <path d="M0,0 L20,0 L20,22 L40,0 L58,0 L32,28 L32,28 L20,28 L20,28 Z" fill="url(#kGradient)" />
      <path d="M0,60 L20,60 L20,32 L32,32 L58,60 L40,60 L20,38 L20,60 Z" fill="url(#kGradient)" />

      {/* Dot */}
      <circle cx="30" cy="30" r="5" fill="#1c1917" />

      {/* khoshà text */}
      <text x="68" y="38" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="32" letterSpacing="-0.5" fill="#1c1917">
        khoshà
      </text>

      {/* SYSTEMS text */}
      <text x="70" y="55" fontFamily="'Inter', sans-serif" fontWeight="400" fontSize="14" letterSpacing="4" fill="#1c1917">
        SYSTEMS
      </text>
    </svg>
  );
};
