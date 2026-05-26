import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-burgundy";
  const strokeColor = light ? "#FFFFFF" : "#3E060F";

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Logo Mark */}
      <div className="flex flex-col items-center justify-center w-[36px] h-[40px] transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background / Border */}
          <rect x="2" y="10" width="36" height="36" stroke={strokeColor} strokeWidth="3" fill="transparent" />
          
          {/* Top Horizontal Bars */}
          <rect x="4" y="2" width="14" height="5" fill={strokeColor} />
          <rect x="22" y="2" width="14" height="5" fill={strokeColor} />
          
          {/* Central Architectural shapes (The Y / building structure) */}
          <path d="M6 14L18 28V44H22V28L34 14V19L22 33V44H18V33L6 19V14Z" fill={strokeColor} />
          
          {/* Inner vertical lines (windows) */}
          <rect x="15" y="32" width="3" height="12" fill={className.includes("text-white") && light ? "black" : "#3E060F"} opacity="0.5" />
          <rect x="22" y="32" width="3" height="12" fill={className.includes("text-white") && light ? "black" : "#3E060F"} opacity="0.5" />
          
          <rect x="12" y="38" width="16" height="2" fill={strokeColor} />
          <rect x="14" y="34" width="12" height="2" fill={strokeColor} />
        </svg>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col justify-center">
        <span className={`font-serif font-extrabold text-[28px] tracking-tight leading-none ${textColor}`}>
          PentonRise
        </span>
      </div>
    </Link>
  );
}
