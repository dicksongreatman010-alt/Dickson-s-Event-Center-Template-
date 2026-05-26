import { motion } from 'motion/react';
import { galleryImages } from '../data/content';

export default function Gallery() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-burgundy mb-6"
          >
            Event Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-gray"
          >
            Take a look at some of the spectacular events we've hosted at PentonRise Event Center.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="relative group overflow-hidden rounded-xl aspect-square bg-[#CBD5E0] shadow-[0_4px_6px_rgba(0,0,0,0.02)]"
            >
              <img 
                src={img} 
                alt={`Gallery image ${idx + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-burgundy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider uppercase text-xs border border-white/50 px-4 py-2 rounded-md backdrop-blur-sm">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
