import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { galleryImages, GalleryItem } from '../data/content';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories (plus 'All')
  const categories = ['All', 'Comfort Arinola Hall', 'Atinuke Hall', 'Victoria Hall B', 'Green Carpet Area'];

  // Filter images based on selected tab
  const filteredImages = selectedFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedFilter);

  const openLightbox = (src: string) => {
    const idx = galleryImages.findIndex(img => img.src === src);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
    }
  };

  return (
    <div className="w-full py-12 bg-background-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            Take a look at real setups and spectacular moments hosted across Oyo's most prestigious event spaces.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedFilter === cat 
                  ? 'bg-gold text-burgundy shadow-md scale-105' 
                  : 'bg-white text-burgundy hover:bg-gold-light/20 border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div 
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(img.src)}
                className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-white border border-[#E2E8F0] shadow-[0_4px_15px_rgba(0,0,0,0.03)] cursor-pointer"
              >
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Text & Interaction */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-gold text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ImageIcon size={12} /> {img.category}
                  </span>
                  <h3 className="text-white text-base font-semibold leading-tight line-clamp-2">
                    {img.caption}
                  </h3>
                  <span className="text-white/60 text-xs mt-2 underline decoration-gold/50 underline-offset-4">
                    Click to expand view &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              {/* Close Button */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-2.5 rounded-full backdrop-blur transition-all duration-300 z-50 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>

              {/* Navigation Left */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur hover:scale-105 transition-all duration-300 z-50 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Lightbox Content Container */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full flex flex-col items-center max-h-[85vh]"
              >
                <motion.div 
                  key={lightboxIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 max-h-[70vh] flex items-center justify-center"
                >
                  <img 
                    src={galleryImages[lightboxIndex].src} 
                    alt={galleryImages[lightboxIndex].caption}
                    className="max-h-[70vh] max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill inside Lightbox */}
                  <span className="absolute top-4 left-4 bg-burgundy text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                    {galleryImages[lightboxIndex].category}
                  </span>
                </motion.div>
                
                {/* Caption / Helper Text */}
                <div className="text-center mt-5 text-white max-w-xl">
                  <p className="text-lg font-medium leading-relaxed">
                    {galleryImages[lightboxIndex].caption}
                  </p>
                  <p className="text-xs text-white/50 mt-1 uppercase tracking-widest font-mono">
                    Showing Image {lightboxIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </div>

              {/* Navigation Right */}
              <button 
                onClick={handleNext}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur hover:scale-105 transition-all duration-300 z-50 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
