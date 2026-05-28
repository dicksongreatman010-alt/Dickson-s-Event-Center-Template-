import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-burgundy mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-gray"
          >
            We're here to answer any questions you may have about our venues, pricing, or availability.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_rgba(0,0,0,0.02)]"
          >
            <h2 className="text-2xl font-bold text-burgundy mb-8 text-center">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy text-lg mb-1">Our Location</h3>
                  <p className="text-text-gray leading-relaxed mb-2">
                    Awolowo Way, near Oshuntokun Avenue,<br />
                    Old Bodija, Ibadan, Oyo State
                  </p>
                  <a 
                    href="https://maps.app.goo.gl/x1R41NU9F1YqTKk66" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gold-dark hover:underline font-semibold text-sm inline-flex items-center gap-1"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy text-lg mb-1">Phone Number</h3>
                  <p className="text-text-gray mb-1">Main: <a href="tel:+1234567890" className="hover:text-gold transition-colors">+1 (234) 567-890</a></p>
                  <p className="text-text-gray">Events: <a href="tel:+1987654321" className="hover:text-gold transition-colors">+1 (987) 654-321</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy text-lg mb-1">Email Address</h3>
                  <p className="text-text-gray mb-1"><a href="mailto:info@pentonrise.com" className="hover:text-gold transition-colors">info@pentonrise.com</a></p>
                  <p className="text-text-gray"><a href="mailto:bookings@pentonrise.com" className="hover:text-gold transition-colors">bookings@pentonrise.com</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy text-lg mb-1">Office Hours</h3>
                  <p className="text-text-gray mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-text-gray">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
