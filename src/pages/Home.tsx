import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, CheckCircle2, X, Users, Settings } from 'lucide-react';
import { halls } from '../data/content';
import EventCalendar from '../components/EventCalendar';

export default function Home() {
  const [quickViewHall, setQuickViewHall] = useState<typeof halls[0] | null>(null);

  return (
    <div className="w-full pb-20">
      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewHall && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setQuickViewHall(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setQuickViewHall(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="w-full md:w-1/2 h-48 md:h-auto relative">
                <img src={quickViewHall.image} alt={quickViewHall.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{quickViewHall.name}</h3>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {quickViewHall.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center shrink-0">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Capacity</p>
                        <p className="font-semibold text-gray-900">{quickViewHall.capacity}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center shrink-0">
                        <Settings size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amenities</p>
                        <ul className="text-sm font-medium text-gray-900 space-y-1 mt-1">
                          {quickViewHall.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-1.5 before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold">{feat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link 
                    to={`/booking?hall=${quickViewHall.id}`}
                    className="btn btn-burgundy flex-1"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8">
        <div className="relative bg-burgundy rounded-2xl p-8 md:p-12 text-white overflow-hidden flex flex-col justify-center min-h-[400px]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
              alt="PentonRise Event Center" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[42px] md:text-5xl font-bold leading-[1.1] mb-4"
            >
              Elegance and Class<br/>In Every Event.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[16px] font-light mb-6 opacity-90 max-w-[400px]"
            >
              Lagos' most prestigious venue for weddings, corporate galas, and bespoke private parties.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link 
                to="/booking" 
                className="btn btn-gold"
              >
                Book Your Date
              </Link>
              <Link 
                to="/halls" 
                className="btn bg-transparent border border-white text-white hover:bg-white hover:text-burgundy"
              >
                Take a Tour
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview of Halls */}
      <section className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Signature Spaces</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {halls.map((hall, idx) => (
              <motion.div 
                key={hall.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="hall-card group"
              >
                <div className="h-[180px] w-full bg-[#CBD5E0] relative overflow-hidden group/image">
                  <img 
                    src={hall.image} 
                    alt={hall.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button onClick={(e) => { e.preventDefault(); setQuickViewHall(hall); }} className="btn bg-white/95 text-burgundy hover:bg-white text-xs py-2 px-4 shadow-xl">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-bold text-[16px] mb-1 text-burgundy">{hall.name}</div>
                  <div className="text-[12px] text-text-gray flex justify-between mb-4 font-medium">
                    <span>{hall.capacity}</span>
                    <span>{hall.priceRange}</span>
                  </div>
                  <Link 
                    to={`/booking?hall=${hall.id}`}
                    className="btn btn-outline w-full !text-[11px] !py-2.5"
                  >
                    Select Space
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/halls" className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors text-sm uppercase tracking-wide">
              View All Halls <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { title: 'Prime Location', desc: 'Easily accessible with ample secure parking for all your guests.' },
              { title: 'Premium Catering', desc: 'World-class culinary team to craft the perfect menu for your event.' },
              { title: 'Expert Planning', desc: 'Dedicated event coordinators to ensure everything runs flawlessly.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-[0_4px_6px_rgba(0,0,0,0.02)]"
              >
                <div className="w-12 h-12 bg-gold-light/30 rounded-full flex items-center justify-center mb-4 text-gold-dark">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-burgundy mb-2">{feature.title}</h3>
                <p className="text-text-gray text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food and Decor Teaser */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-burgundy mb-4">Exquisite Food & Bespoke Decor</h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                Elevate your event with our world-class catering services and custom venue styling. From authentic local delicacies to sophisticated international cuisines, and elegant floral setups to atmospheric lighting, we ensure every detail is perfect.
              </p>
              <Link to="/services" className="btn btn-burgundy inline-flex items-center gap-2">
                Explore Our Services <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60" 
                alt="Fine Dining" 
                className="w-full h-48 object-cover rounded-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=60" 
                alt="Event Decor" 
                className="w-full h-48 object-cover rounded-xl mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gaming Lounge Teaser */}
      <section className="py-16 bg-gray-900 border-t-4 border-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative h-64 md:h-80 rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80" 
                alt="Gaming Lounge" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                 <div className="text-yellow-400 font-mono font-bold animate-pulse text-sm">
                   LIVE: FIFA 24 Tournament Ongoing
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 space-y-6"
            >
              <span className="text-purple-400 font-bold tracking-[0.2em] uppercase text-sm block">The Nexus Lounge</span>
              <h2 className="text-4xl font-bold text-white mb-4 font-mono">Next-Level Esports & Gaming</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Not just for traditional events. Explore our state-of-the-art gaming lounge featuring PS5s, Xbox Series X, Pro PC Rigs, and VIP Multiplayer rooms. Book by the hour, join tournaments, and grab a membership!
              </p>
              <Link to="/gaming" className="btn bg-purple-600 hover:bg-purple-700 text-white inline-flex items-center gap-2 border-none font-mono">
                Enter The Lounge <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hoverboard Arena Teaser */}
      <section className="py-16 bg-slate-950 border-t-2 border-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm block">Zero Gravity Zone</span>
              <h2 className="text-4xl font-bold text-white mb-4 italic">HOVER ARENA</h2>
              <p className="text-slate-300 leading-relaxed text-lg font-light">
                Defy gravity on our cutting-edge indoor hoverboard tracks. From beginner paths to pro gravity drops, gear up and record your best lap times!
              </p>
              <Link to="/hoverboard" className="btn bg-cyan-600 hover:bg-cyan-500 text-slate-950 inline-flex items-center gap-2 border-none font-bold uppercase tracking-wide">
                Book a Ride <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800&auto=format&fit=crop&q=80" 
                alt="Hoverboard Arena" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent flex items-end p-6">
                 <div className="text-cyan-400 font-mono font-bold animate-pulse text-sm flex items-center gap-2">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                   Track Status: OPEN
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food Lounge Teaser */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm block">Gourmet Dining</span>
              <h2 className="text-4xl font-serif font-bold text-burgundy mb-4">The Culinary Lounge</h2>
              <p className="text-text-gray leading-relaxed text-lg">
                Savor world-class dishes in our exclusive Food Lounge. From pre-event bites to extensive catering packages, browse our menu and reserve your table online.
              </p>
              <Link to="/food-lounge" className="btn btn-burgundy inline-flex items-center gap-2 font-bold uppercase tracking-wide">
                View Menu <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80" 
                alt="Food Lounge" 
                className="w-full h-48 md:h-64 object-cover rounded-xl mt-8 shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80" 
                alt="Gourmet Food" 
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Go Kart Arena Teaser */}
      <section className="py-16 bg-[#111111] border-t border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.15)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1596700589139-4ddc6da155de?w=800&auto=format&fit=crop&q=80" 
                alt="Apex Karting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                 <div className="text-white bg-red-600 px-3 py-1 font-mono font-black animate-pulse text-sm">
                   LIVE HEAT: IN PROGRESS
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 space-y-6"
            >
              <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-sm block">Thrill Seekers</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-4">Apex Karting <span className="text-red-600">Arena</span></h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Push the limits on our multi-track circuit. Book individual and team endurance heats, monitor live telemetry, and prove you have what it takes to top the leaderboard.
              </p>
              <Link to="/go-kart" className="btn bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2 border-none font-black uppercase tracking-widest shadow-lg">
                Book a Race <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm block mb-2">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-burgundy mb-4">Upcoming Events & Availabilities</h2>
            <p className="text-text-gray max-w-2xl mx-auto">
              Browse our monthly schedule. Select any available date to book your grand event, gaming tournament, or track session.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <EventCalendar />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Client Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { name: 'Sarah & James', event: 'Wedding Reception', text: 'PentonRise made our dream wedding a reality. The Comfort Arinola Hall was breathtaking, and the staff was incredibly attentive.' },
              { name: 'Michael T.', event: 'Corporate Gala', text: 'Professionalism at its peak. The facilities are top-notch, and the catering exceeded our expectations. Highly recommended.' },
              { name: 'Elena R.', event: 'Birthday Celebration', text: 'We hosted my 50th birthday at the Atinuke Hall. It was intimate, beautiful, and perfectly organized.' }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-burgundy p-6 rounded-xl border border-burgundy-light text-white"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-white/80 italic mb-6 text-sm leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-white/60 uppercase tracking-wide mt-1">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
