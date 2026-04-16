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
            className="text-4xl md:text-5xl font-bold text-navy mb-6"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_rgba(0,0,0,0.02)] h-full"
          >
            <h2 className="text-2xl font-bold text-navy mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1">Our Location</h3>
                  <p className="text-text-gray leading-relaxed">
                    123 Event Center Blvd,<br />
                    Metropolis, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1">Phone Number</h3>
                  <p className="text-text-gray mb-1">Main: <a href="tel:+1234567890" className="hover:text-gold transition-colors">+1 (234) 567-890</a></p>
                  <p className="text-text-gray">Events: <a href="tel:+1987654321" className="hover:text-gold transition-colors">+1 (987) 654-321</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1">Email Address</h3>
                  <p className="text-text-gray mb-1"><a href="mailto:info@ekograndeur.com" className="hover:text-gold transition-colors">info@ekograndeur.com</a></p>
                  <p className="text-text-gray"><a href="mailto:bookings@ekograndeur.com" className="hover:text-gold transition-colors">bookings@ekograndeur.com</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold-light/30 p-3 rounded-full text-gold-dark shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-1">Office Hours</h3>
                  <p className="text-text-gray mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-text-gray">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_rgba(0,0,0,0.02)] h-[400px] lg:h-auto overflow-hidden"
          >
            {/* Using a dummy map embed (Google Maps iframe) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1rem' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Eko Grandeur Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
