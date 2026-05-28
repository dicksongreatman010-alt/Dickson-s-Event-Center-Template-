import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-burgundy text-white pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs font-medium">
              Oyo's most prestigious event center
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-[13px]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/70 hover:text-gold transition-colors text-sm">Home</Link></li>
              <li><Link to="/halls" className="text-white/70 hover:text-gold transition-colors text-sm">Our Halls</Link></li>
              <li><Link to="/services" className="text-white/70 hover:text-gold transition-colors text-sm">Food & Decor</Link></li>
              <li><Link to="/gaming" className="text-white/70 hover:text-gold transition-colors text-sm">Gaming Lounge</Link></li>
              <li><Link to="/hoverboard" className="text-white/70 hover:text-gold transition-colors text-sm">Hover Arena</Link></li>
              <li><Link to="/food-lounge" className="text-white/70 hover:text-gold transition-colors text-sm">Food Lounge</Link></li>
              <li><Link to="/go-kart" className="text-white/70 hover:text-gold transition-colors text-sm">Go Kart Arena</Link></li>
              <li><Link to="/gallery" className="text-white/70 hover:text-gold transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-gold transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/booking" className="text-white/70 hover:text-gold transition-colors text-sm">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider text-[13px]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://maps.app.goo.gl/x1R41NU9F1YqTKk66" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-gold transition-colors block"
                  >
                    Awolowo Way, near Oshuntokun Avenue,<br />Old Bodija, Ibadan, Oyo State
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/x1R41NU9F1YqTKk66" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gold font-medium text-xs hover:underline mt-1 inline-block"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:info@pentonrise.com" className="hover:text-white transition-colors">info@pentonrise.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} PentonRise Event Center. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <Link to="/admin" className="hover:text-gold transition-colors text-white/40">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
