import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, DollarSign, Check, ChevronLeft, ChevronRight, Shield, AlertCircle, Clock, Landmark } from 'lucide-react';
import { halls, Hall } from '../data/content';

interface HallImageGalleryProps {
  image: string;
  images?: string[];
  name: string;
}

function HallImageGallery({ image, images, name }: HallImageGalleryProps) {
  const allImages = images && images.length > 0 ? images : [image];
  const [currentIdx, setCurrentIdx] = useState(0);

  if (allImages.length <= 1) {
    return (
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIdx((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIdx((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="w-full h-full relative group min-h-[320px] lg:min-h-[450px]">
      <img 
        src={allImages[currentIdx]} 
        alt={`${name} view ${currentIdx + 1}`} 
        className="w-full h-full object-cover transition-all duration-500 ease-in-out absolute inset-0"
        referrerPolicy="no-referrer"
      />
      
      {/* Navigation Chevrons */}
      <button 
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Thumbnails indicator bar */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10 bg-gradient-to-t from-black/50 to-transparent py-2">
        {allImages.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.preventDefault(); setCurrentIdx(idx); }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIdx ? 'bg-gold w-6' : 'bg-white/60 hover:bg-white'}`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Halls() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-burgundy mb-6"
          >
            Our Event Spaces
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-gray"
          >
            Explore our meticulously designed halls, each offering a unique atmosphere for your special occasion.
          </motion.p>
        </div>

        <div className="space-y-16">
          {halls.map((hall, idx) => (
            <motion.div 
              key={hall.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-[0_10px_25px_rgba(0,0,0,0.05)]`}
            >
              {/* Image Side */}
              <div className="lg:w-1/2 relative min-h-[320px] lg:min-h-auto">
                <HallImageGallery 
                  image={hall.image} 
                  images={hall.images} 
                  name={hall.name} 
                />
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-burgundy mb-4">{hall.name}</h2>
                <p className="text-text-gray mb-8 text-lg leading-relaxed">{hall.shortDescription}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-light/30 p-2 rounded-lg text-gold-dark shrink-0">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-gray font-bold uppercase tracking-wide">Capacity</p>
                      <p className="font-semibold text-burgundy">{hall.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-light/30 p-2 rounded-lg text-gold-dark shrink-0">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-gray font-bold uppercase tracking-wide">Price Range</p>
                      <p className="font-semibold text-burgundy">{hall.priceRange}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[11px] font-bold text-burgundy uppercase tracking-wider mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hall.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-gray">
                        <Check size={16} className="text-gold" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to={`/booking?hall=${hall.id}`}
                  className="btn btn-gold w-fit"
                >
                  Book {hall.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing & Guidelines Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 pt-20 border-t border-gray-200"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-burgundy mb-4">Complete Pricing & Venue Rules</h2>
            <p className="text-text-gray">
              Please review our official charges, supplementary bouncer plans, event logs, and facilities regulations.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md mb-12">
            <div className="bg-burgundy px-6 py-4 text-white">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Landmark size={20} className="text-gold" />
                Price List (VAT Inclusive)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200 text-burgundy font-bold text-sm">
                    <th className="py-4 px-6 w-16 text-center">SN</th>
                    <th className="py-4 px-6">Facility</th>
                    <th className="py-4 px-6">Capacity Options</th>
                    <th className="py-4 px-6 text-right">Rates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-text-gray">
                  {[
                    { sn: '01', name: 'ATINUKE HALL A (Fully Air Conditioned) with extension & Video Link', cap: '200 Seats (tables) or 250 Seats (without tables)', rate: '₦500,000.00' },
                    { sn: '02', name: 'VICTORIA HALL B (Fully Air Conditioned)', cap: '60 Seats (with tables) or 80 Seats (without tables)', rate: '₦400,000.00' },
                    { sn: '03', name: 'MEETING ROOM (Fully Air Conditioned)', cap: '40 Seats (with tables) or 50 Seats (without tables)', rate: '₦150,000.00' },
                    { sn: '04', name: 'COMFORT ARINOLA HALL (Fully Air Conditioned)', cap: '800 Seats (with tables) or 1000 Seats (without tables)', rate: '₦1,500,000.00' },
                    { sn: '05', name: 'GREEN CARPET CANOPY ONE', cap: '80 Seats (with tables) or 100 Seats (without tables)', rate: '₦200,000.00' },
                    { sn: '06', name: 'GREEN CARPET CANOPY TWO', cap: '50 Seats (with tables) or 80 Seats (without tables)', rate: '₦150,000.00' },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-center font-mono font-bold text-burgundy">{row.sn}</td>
                      <td className="py-4 px-6 font-semibold text-burgundy">{row.name}</td>
                      <td className="py-4 px-6">{row.cap}</td>
                      <td className="py-4 px-6 text-right font-mono font-bold text-burgundy text-base">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column: Essential Rules */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
                <h3 className="text-lg font-bold text-burgundy mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-gold" />
                  Important Rules & Additional Information
                </h3>
                <ul className="space-y-4 text-sm text-text-gray">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Deposit Conditions:</strong>
                      <p className="mt-0.5">Please note that all deposit payments are <span className="font-bold text-red-600">NOT REFUNDABLE</span>.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Event Booking Duration:</strong>
                      <p className="mt-0.5">Maximum of <b>6 hours</b> is allocated per booking (Standard slot windows are between <b>8:00 AM to 6:00 PM</b>).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Payment Policy:</strong>
                      <p className="mt-0.5">The full booking balance must be settled at least <span className="font-bold text-burgundy">14 days before</span> the event.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Damage & Incident Fines:</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-2 text-xs">
                        <li>Damage to structure, fixtures, or removing any effects attracts a <span className="font-bold text-red-600">₦10,000 fine</span>.</li>
                        <li>Loss of a vehicle parking tally attracts a <span className="font-bold text-red-600">₦5,000 fine</span>.</li>
                        <li>Climbing on chairs for decoration is prohibited and attracts a non-refundable caution fee.</li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Surcharges, Extension, Service Providers & Extra Security */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-burgundy mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-gold" />
                  Time Extensions & Logistics
                </h3>
                <ul className="space-y-4 text-sm text-text-gray">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Extension Overtime Fee:</strong>
                      <p className="mt-0.5 text-red-600 font-bold">₦200,000.00 per hour (strictly non-negotiable).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Security & General Protection:</strong>
                      <p className="mt-0.5">Cars are parked at owner&apos;s risk in our spacious lot. Guests (Musicians/DJs) are required to bring their own generator of sufficient power capacity. No loitering is allowed surrounding the premises.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                    <div>
                      <strong className="text-burgundy">Caterers & Decorators:</strong>
                      <p className="mt-0.5">External service teams are required to pay a refundable caution fee:</p>
                      <ul className="list-disc pl-4 mt-1 space-y-1 text-xs">
                        <li>Caterers logistics: <span className="font-semibold text-burgundy">₦5,000 refundable fee</span></li>
                        <li>Decorators logistics: <span className="font-semibold text-burgundy">₦10,000 refundable fee</span></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Extra Security Options */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
                <h3 className="text-lg font-bold text-gold mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-gold" />
                  Extra Security (Optional - Not included)
                </h3>
                <p className="text-slate-400 text-xs mb-4">
                  Require premium dedicated staff for your VIP event or high crowd level? Add expert support:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-705">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Expert Bouncers</p>
                    <p className="text-xl font-bold text-gold mt-1">₦20,000</p>
                    <p className="text-slate-450 text-[11px] mt-0.5">per head</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-705">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Traffic Marshalls</p>
                    <p className="text-xl font-bold text-gold mt-1">₦1,000</p>
                    <p className="text-slate-450 text-[11px] mt-0.5">per head (as needed)</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="bg-gold-light/20 border border-gold/30 rounded-2xl p-6 text-center">
            <h4 className="font-bold text-burgundy mb-2">Ready to secure your event space?</h4>
            <p className="text-sm text-text-gray mb-4 max-w-xl mx-auto">
              Fill out the convenient booking details, choose your preferred hall, and check calendar date availability instantly.
            </p>
            <Link to="/booking" className="btn btn-gold px-8 py-3 font-semibold uppercase tracking-wide text-xs">
              Go to Booking Inquiry
            </Link>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
