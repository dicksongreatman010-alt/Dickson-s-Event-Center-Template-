import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-burgundy";
  const strokeColor = light ? "#FFFFFF" : "#3E060F";

  const logoUrl = "https://res.cloudinary.com/dojayb3ro/image/upload/f_auto,q_auto/v1/pentonrise/logo";

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Logo Mark */}
      <div className="flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <img 
          src={logoUrl} 
          alt="PentonRise Logo" 
          className="h-[44px] w-auto object-contain"
          referrerPolicy="no-referrer"
        />
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
