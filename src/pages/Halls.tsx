import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, DollarSign, Check } from 'lucide-react';
import { halls } from '../data/content';

export default function Halls() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-navy mb-6"
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
              <div className="lg:w-1/2 h-80 lg:h-auto relative">
                <img 
                  src={hall.image} 
                  alt={hall.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-navy mb-4">{hall.name}</h2>
                <p className="text-text-gray mb-8 text-lg leading-relaxed">{hall.shortDescription}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-light/30 p-2 rounded-lg text-gold-dark shrink-0">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-gray font-bold uppercase tracking-wide">Capacity</p>
                      <p className="font-semibold text-navy">{hall.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gold-light/30 p-2 rounded-lg text-gold-dark shrink-0">
                      <DollarSign size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-gray font-bold uppercase tracking-wide">Price Range</p>
                      <p className="font-semibold text-navy">{hall.priceRange}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[11px] font-bold text-navy uppercase tracking-wider mb-4">Key Features</h3>
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

      </div>
    </div>
  );
}
