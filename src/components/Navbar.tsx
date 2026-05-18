import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Halls', path: '/halls' },
    { name: 'Services', path: '/services' },
    { name: 'Availability', path: '/availability' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-navy border-b-[4px] border-gold h-[72px] flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Logo light={true} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[14px] font-medium transition-opacity hover:opacity-100 ${
                  location.pathname === link.path ? 'text-white opacity-100' : 'text-white opacity-90'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center ml-4">
              <Link
                to="/booking"
                className="btn btn-gold !py-2 !px-4 !text-[12px]"
              >
                Call: +234 800 200 100
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy shadow-lg border-t border-navy-light py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[14px] font-medium py-2 border-b border-navy-light ${
                location.pathname === link.path ? 'text-gold' : 'text-white opacity-90'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/booking"
              className="btn btn-gold w-full"
            >
              Call: +234 800 200 100
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
