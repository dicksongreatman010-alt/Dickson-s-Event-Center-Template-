import { motion } from 'motion/react';
import { Utensils, Sparkles, Check, ArrowDown, Camera, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const foodPackages = [
  {
    name: 'Silver Package',
    price: 'From ₦15,000 / guest',
    description: 'Perfect for standard corporate events and intimate gatherings.',
    features: [
      '3-Course Buffet Meal',
      'Choice of 2 Local & 1 Continental Dish',
      'Standard Soft Drinks & Water',
      'Basic Dessert Station',
      'Standard Cutlery & Dinnerware',
    ],
  },
  {
    name: 'Gold Package',
    price: 'From ₦25,000 / guest',
    description: 'Our most popular choice. Ideal for weddings and major celebrations.',
    features: [
      'Assorted Small Chops & Canapés',
      '4-Course Buffet Meal or Plated Service',
      'Premium Local & Continental Selection',
      'Mocktails & Premium Soft Drinks',
      'Live Cooking Station (e.g., Suya or Pasta)',
      'Upgraded Cutlery & Glassware',
    ],
    popular: true,
  },
  {
    name: 'Platinum Package',
    price: 'Custom Pricing',
    description: 'The ultimate luxury dining experience for gala nights and VIP events.',
    features: [
      'Premium Welcome Cocktails & Canapés',
      '5-Course High-End Plated Service',
      'Bespoke Menu Design (Any Cuisine)',
      'Full Bar Service with Premium Spirits',
      'Multiple Live Cooking Stations',
      'Crystal Glassware & Silver Cutlery',
      'Dedicated Sommelier/Mixologist',
    ],
  },
];

const decorPackages = [
  {
    name: 'Classic Decor',
    description: 'Elegant and understated styling to complement our beautiful venues.',
    features: ['Basic Stage Setup', 'Standard Table Centerpieces', 'Chair Covers & Sashes', 'Ambient Room Lighting'],
  },
  {
    name: 'Grandeur Decor',
    description: 'A transformative experience with bespoke thematic elements.',
    features: ['Custom Stage & Backdrop', 'Lush Floral Centerpieces', 'Premium Chiavari Chairs', 'Intelligent Mood Lighting', 'Dancefloor Decals'],
  },
];

export default function Services() {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1530103862676-de3c9de09ba7?q=80&w=2000&auto=format&fit=crop" 
            alt="Event Ambience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-burgundy/70 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Culinary Excellence <br/> <span className="text-gold italic font-light">&</span> Bespoke Decor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10"
          >
            We don't just host events; we curate unforgettable sensory experiences. 
            From mouth-watering gastronomy to breathtaking venue transformations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex justify-center"
          >
            <ArrowDown className="text-gold animate-bounce w-8 h-8" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- CATERING SECTION --- */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-2 block">Gastronomy</span>
          <h2 className="text-4xl font-bold text-burgundy mb-4">World-Class Catering Services</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-text-gray max-w-2xl mx-auto text-lg">
            Our award-winning chefs blend authentic local flavors with international culinary techniques to create menus that delight the palate and impress every guest.
          </p>
        </div>

        {/* Food Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60" 
            alt="Gourmet Dish" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300" 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60" 
            alt="Premium Meat" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 md:translate-y-6" 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60" 
            alt="Desserts" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300" 
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60" 
            alt="Table Setup" className="w-full h-48 md:h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 md:translate-y-6" 
          />
        </div>

        {/* Food Packages */}
        <h3 className="text-2xl font-bold text-burgundy text-center mb-10">Select Your Dining Experience</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {foodPackages.map((pkg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative border ${pkg.popular ? 'border-gold top-0 md:-top-4 pb-4 md:pb-8' : 'border-gray-100'}`}
            >
              {pkg.popular && (
                <div className="bg-gold text-white text-xs font-bold uppercase py-1.5 px-3 text-center tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  {pkg.popular ? <Star className="text-gold w-6 h-6 fill-gold" /> : <Utensils className="text-burgundy/50 w-6 h-6" />}
                  <h4 className="text-xl font-bold text-burgundy">{pkg.name}</h4>
                </div>
                <div className="text-gold font-bold mb-4">{pkg.price}</div>
                <p className="text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100 min-h-[60px]">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-burgundy">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`w-full py-3 rounded-lg text-center font-medium block transition-colors ${pkg.popular ? 'bg-gold text-white hover:bg-yellow-600' : 'bg-gray-50 text-burgundy hover:bg-gray-100'}`}>
                  Request Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>


        {/* --- DECOR SECTION --- */}
        <div className="text-center mb-16">
          <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-2 block">Atmosphere</span>
          <h2 className="text-4xl font-bold text-burgundy mb-4">Exquisite Venue Styling</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-text-gray max-w-2xl mx-auto text-lg">
            Transform any hall into your dream setting. Our talented venue stylists blend innovative designs with elegant floral arrangements and atmospheric lighting to create pure magic.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {decorPackages.map((pkg, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="text-gold w-6 h-6" />
                  <h4 className="text-xl font-bold text-burgundy">{pkg.name}</h4>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.features.map((feat, i) => (
                    <span key={i} className="bg-white text-burgundy text-xs px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-4">
              <Link to="/contact" className="btn btn-burgundy inline-flex items-center gap-2">
                Discuss Decor Plans
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 relative h-[500px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80" 
              alt="Elegant Decor" 
              className="w-full h-[400px] object-cover rounded-xl"
            />
            <div className="flex flex-col gap-4 pt-12">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&auto=format&fit=crop&q=60" 
                alt="Table Details" 
                className="w-full h-48 object-cover rounded-xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60" 
                alt="Mood Lighting" 
                className="w-full h-[256px] object-cover rounded-xl"
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <Camera className="text-gold w-6 h-6" />
              <span className="font-bold text-burgundy whitespace-nowrap">Picture Perfect</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
