import { motion } from 'motion/react';
import { Utensils, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="w-full pb-20">
      <div className="bg-navy py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Food & Decor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto"
          >
            Elevate your event with our world-class catering services and bespoke venue decor, designed to create unforgettable experiences.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catering Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Utensils className="text-gold w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Exquisite Gourmet Catering</h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                Our culinary experts create bespoke menus that cater to your specific taste and event requirements. From authentic local delicacies to intercontinental cuisines, every dish is prepared with the finest ingredients and impeccable presentation.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Customizable menus for weddings and corporate events',
                  'Dietary accommodation (Vegan, Halal, Gluten-free)',
                  'Live cooking stations and buffet setups',
                  'Premium bar and mixology services',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-navy font-medium">
                    <Check className="w-5 h-5 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn btn-navy inline-flex items-center gap-2">
                Enquire About Catering
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
                alt="Gourmet Food" 
                className="w-full h-48 object-cover rounded-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60" 
                alt="Fine Dining Setup" 
                className="w-full h-48 object-cover rounded-xl mt-8"
              />
            </motion.div>
          </div>
        </section>

        {/* Decor Section */}
        <section>
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="text-navy w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Bespoke Venue Decor</h2>
              <p className="text-text-gray mb-6 leading-relaxed">
                Transform any space into your dream setting. Our talented venue stylists work closely with you to understand your vision, blending innovative designs with elegant floral arrangements and atmospheric lighting.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Thematic design and styling consultations',
                  'Exquisite floral arrangements and centerpieces',
                  'Custom lighting and atmospheric effects',
                  'Premium furniture and stage setups',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-navy font-medium">
                    <Check className="w-5 h-5 text-gold shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn btn-navy inline-flex items-center gap-2">
                Discuss Decor Plans
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80" 
                alt="Elegant Event Decor" 
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold rounded-xl -z-10 hidden md:block"></div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
