import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-navy";
  const accentColor = "text-gold";

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Logo Mark */}
      <div className={`relative flex items-center justify-center w-10 h-10 ${accentColor} transition-transform duration-500 group-hover:scale-110`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Hexagon */}
          <path d="M20 2L36 12V28L20 38L4 28V12L20 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Inner Hexagon */}
          <path d="M20 8L30 14V26L20 32L10 26V14L20 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
          {/* Center Diamond/Dot */}
          <path d="M20 17L23 20L20 23L17 20L20 17Z" fill="currentColor" />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col justify-center">
        <span className={`font-bold text-xl tracking-[2px] uppercase leading-none ${textColor}`}>
          Eko
        </span>
        <span className={`font-semibold text-[9px] tracking-[4px] uppercase leading-none mt-1.5 ${accentColor}`}>
          Grandeur
        </span>
      </div>
    </Link>
  );
}
