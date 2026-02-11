
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`logo-animate flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer Hexagon Frame */}
        <path d="M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 L50 5Z" stroke="url(#logoGrad)" strokeWidth="3" strokeLinejoin="round" />
        
        {/* Neural Connections */}
        <circle cx="50" cy="50" r="18" fill="url(#logoGrad)" fillOpacity="0.15" />
        <path d="M50 32 V50 L65 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 50 L35 58" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Market Graph Peaks inside Logo */}
        <path d="M30 65 L42 55 L55 68 L70 48" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        
        {/* Neural Nodes */}
        <circle cx="50" cy="32" r="2.5" fill="white" />
        <circle cx="65" cy="58" r="2.5" fill="#f472b6" />
        <circle cx="35" cy="58" r="2.5" fill="#22d3ee" />
        <circle cx="50" cy="50" r="4" fill="white" />
        
        {/* Subtle Internal Pulse Path */}
        <path d="M20 50 Q35 30 50 50 T80 50" stroke="url(#logoGrad)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
      </svg>
    </div>
  );
};

export default Logo;
