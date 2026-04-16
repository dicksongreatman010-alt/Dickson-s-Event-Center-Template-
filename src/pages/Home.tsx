import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { halls } from '../data/content';

export default function Home() {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8">
        <div className="relative bg-navy rounded-2xl p-8 md:p-12 text-white overflow-hidden flex flex-col justify-center min-h-[400px]">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
              alt="Eko Grandeur Event Center" 
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
                className="btn btn-outline"
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
                <div className="h-[180px] w-full bg-[#CBD5E0] relative overflow-hidden">
                  <img 
                    src={hall.image} 
                    alt={hall.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-[16px] mb-1 text-navy">{hall.name}</div>
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
                <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-text-gray text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Client Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { name: 'Sarah & James', event: 'Wedding Reception', text: 'Eko Grandeur made our dream wedding a reality. The Grand Ballroom was breathtaking, and the staff was incredibly attentive.' },
              { name: 'Michael T.', event: 'Corporate Gala', text: 'Professionalism at its peak. The facilities are top-notch, and the catering exceeded our expectations. Highly recommended.' },
              { name: 'Elena R.', event: 'Birthday Celebration', text: 'We hosted my 50th birthday at the Emerald Lounge. It was intimate, beautiful, and perfectly organized.' }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-navy p-6 rounded-xl border border-navy-light text-white"
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
