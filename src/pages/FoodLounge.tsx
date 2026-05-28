import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Leaf, Flame, ShoppingBag, Clock, Users, ArrowRight, Star, SplitSquareHorizontal, CheckCircle2, Navigation } from 'lucide-react';
import { DatePicker } from '../components/DatePicker';

const menuItems = [
  { 
    id: '1', 
    name: 'PentonRise Signature Jollof & Fried Rice Platter', 
    category: 'Signature Dishes', 
    price: 8500, 
    desc: 'Rich, authentic smokey event Jollof rice & classic fried rice served with roasted chicken, sweet gold plantains, side salad, and gourmet moin moin.', 
    tags: ['s'], 
    img: 'https://150699480.cdn6.editmysite.com/uploads/1/5/0/6/150699480/7JRLQMYFDENG7FLRSQ5RYO3U.jpeg?width=1280&dpr=1' 
  },
  { 
    id: '2', 
    name: 'Luxury Ceremonial Banquet Special', 
    category: 'Signature Dishes', 
    price: 12500, 
    desc: 'A sublime selection of custom local delicacies, tender seasoned premium protein, fried plantains, steamed savory puddings, and specialty fresh garden vegetables.', 
    tags: [], 
    img: 'https://150699480.cdn6.editmysite.com/uploads/1/5/0/6/150699480/5G6LHUKIXQLZD5OS5RPU2R5Z.jpeg?width=1280&dpr=1' 
  },
  { 
    id: '3', 
    name: 'Premium Spicy Grilled Beef Suya', 
    category: 'Signature Dishes', 
    price: 6000, 
    desc: 'Authentic thin-sliced flame-grilled beef rubbed in hot, spicy traditional Yaji peanut-spice blend, topped with fresh sliced red onions and raw white cabbage.', 
    tags: ['s'], 
    img: 'https://thewheatbakerlagos.com/oatchace/2025/07/Suya-1024x653.webp' 
  },
  { 
    id: '4', 
    name: 'Traditional Steamed Moi Moi', 
    category: 'Signature Dishes', 
    price: 3500, 
    desc: 'Hearty steamed savory bean pudding, beautifully aerated and seasoned with fresh sweet bell peppers, onions, and local aromatic oils.', 
    tags: ['v'], 
    img: 'https://thewheatbakerlagos.com/oatchace/2025/07/Moi-moi-by-Sisi-Jemimah-1024x602.webp' 
  },
  { 
    id: '5', 
    name: 'Chef\'s Special Assorted Delicacy Selection', 
    category: 'Signature Dishes', 
    price: 15000, 
    desc: 'An exquisite curation of select roasted proteins, tender slow-cooked pieces, and sweet fried plantain bites ideal for festive corporate or wedding banquets.', 
    tags: ['s'], 
    img: 'https://lh3.googleusercontent.com/proxy/XH0JHIrgr1IWOtYfr3CJQ3cVAoxrsai7xxosrm4Y9aCSulbZRCpki1guKQjxTXQNDRQVnJFwwIILezHSYPjGH7bMSRmhRqF63BTAxtWaM9bQoM4yRqGUbNyiuvRivar-KKxDOMEyGRflLCY' 
  },
  { 
    id: '6', 
    name: 'Gourmet Ofada Rice & Ayamase Sauce Platter', 
    category: 'Signature Dishes', 
    price: 9500, 
    desc: 'Aromatic native brown Ofada rice wrapped in green leaf, served with rich, spicy Ayamase bell pepper sauce cooked with palm oil, locust beans (iru), boil eggs, and mixed dynamic premium proteins.', 
    tags: ['s'], 
    img: 'https://thewheatbakerlagos.com/oatchace/2025/07/Ofada-Rice-1024x653.webp' 
  }
];

export default function FoodLounge() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [cart, setCart] = useState<{item: any, quantity: number}[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(2);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [splitPayment, setSplitPayment] = useState(false);

  const categories = ['All', 'Signature Dishes'];

  const filteredMenu = menuItems.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (filterVegan && !item.tags.includes('v')) return false;
    if (filterSpicy && !item.tags.includes('s')) return false;
    return true;
  });

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);

  const handleCheckout = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://150699480.cdn6.editmysite.com/uploads/1/5/0/6/150699480/7JRLQMYFDENG7FLRSQ5RYO3U.jpeg?width=1280&dpr=1" 
            alt="Food Lounge" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-burgundy/85 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block text-center">Gourmet Dining & Pre-event Bites</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6">
            The Culinary Lounge
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Reserve a table, pre-order your meals, or arrange group catering packages effortlessly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Menu Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Chef Spotlight */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
               <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80" alt="Executive Chef" className="w-32 h-32 rounded-full object-cover shadow-md" />
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <ChefHat className="text-burgundy" />
                   <h3 className="text-xl font-bold text-burgundy font-serif">Executive Chef Marcus</h3>
                 </div>
                 <p className="text-text-gray text-sm leading-relaxed mb-4">
                   "Our curated menu blends local vibrance with international culinary techniques. Try our new sharing combos designed specifically for event-goers."
                 </p>
                 <div className="flex gap-2 text-xs font-bold text-gold-dark bg-gold-light/20 inline-flex px-3 py-1 rounded-full uppercase tracking-wider">
                   <Star size={14} className="fill-gold-dark" /> Top Rated Menu 2026
                 </div>
               </div>
            </div>

            {/* Menu Filters */}
            <div className="sticky top-20 bg-gray-50/90 backdrop-blur-md z-20 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-burgundy text-white' : 'bg-white text-text-gray border border-gray-200 hover:border-burgundy/50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setFilterVegan(!filterVegan)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${filterVegan ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Leaf size={16} /> Vegan
                  </button>
                  <button 
                    onClick={() => setFilterSpicy(!filterSpicy)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${filterSpicy ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Flame size={16} /> Spicy
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredMenu.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {item.tags.includes('v') && <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"><Leaf size={12} /></span>}
                      {item.tags.includes('s') && <span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"><Flame size={12} /></span>}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-burgundy text-lg leading-tight">{item.name}</h4>
                      <span className="font-bold text-gold-dark bg-gold-light/50 px-2 py-1 rounded text-sm whitespace-nowrap ml-2">₦{item.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 flex-1">{item.desc}</p>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 rounded-lg border border-burgundy text-burgundy font-bold hover:bg-burgundy hover:text-white transition-colors text-sm uppercase tracking-wide"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar / Booking & Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {!isOrderPlaced ? (
                <>
                  {/* Table Reservation & Pre-order details */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-burgundy text-lg mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                      <Clock size={20} className="text-gold-dark" /> Dine-in / Pre-order Info
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                        <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Time</label>
                          <select className="form-input mb-0 w-full font-medium">
                            <option>18:00 (6:00 PM)</option>
                            <option>19:00 (7:00 PM)</option>
                            <option>20:00 (8:00 PM)</option>
                            <option>21:00 (9:00 PM)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Guests</label>
                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                            <button onClick={() => setGuests(Math.max(1, guests-1))} className="px-3 py-2 text-gray-500 hover:bg-gray-50">-</button>
                            <div className="flex-1 text-center font-medium text-sm">{guests}</div>
                            <button onClick={() => setGuests(guests+1)} className="px-3 py-2 text-gray-500 hover:bg-gray-50">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cart Summary */}
                  <div className="bg-burgundy text-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <ShoppingBag size={20} className="text-gold" /> Order List
                      </h3>
                      <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{cart.reduce((s,c) => s+c.quantity, 0)} Items</span>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-white/50 text-sm">
                        Your plate is empty.<br/>Add items from the menu.
                      </div>
                    ) : (
                      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map((c, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex gap-2">
                              <span className="font-bold text-gold">{c.quantity}x</span>
                              <span className="text-white/90 truncate max-w-[150px]">{c.item.name}</span>
                            </div>
                            <span className="font-mono text-white/70">₦{(c.item.price * c.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {cart.length > 0 && (
                      <>
                        {/* Group Split Option */}
                        <div className="bg-white/5 rounded-lg p-3 mb-6 border border-white/10">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={splitPayment}
                              onChange={(e) => setSplitPayment(e.target.checked)}
                              className="rounded border-white/20 bg-transparent text-gold focus:ring-gold focus:ring-offset-burgundy" 
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold flex items-center gap-2"><SplitSquareHorizontal size={14}/> Split Payment?</span>
                              <span className="text-xs text-white/50">Send payment links to each guest.</span>
                            </div>
                          </label>
                          
                          {splitPayment && (
                            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                              <span className="text-xs text-white/70">Amount per guest:</span>
                              <span className="font-mono font-bold text-gold">₦{(cartTotal / guests).toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-end mb-6 pt-4 border-t border-white/10">
                          <span className="text-white/60 text-sm uppercase tracking-wider font-bold">Total</span>
                          <span className="text-2xl font-mono font-bold text-white">₦{cartTotal.toLocaleString()}</span>
                        </div>

                        <button 
                          onClick={handleCheckout}
                          className="w-full bg-gold hover:bg-gold-dark text-burgundy font-bold py-3.5 rounded-xl transition-colors uppercase tracking-wide shadow-lg flex items-center justify-center gap-2"
                        >
                          Confirm Pre-Order <ArrowRight size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                /* Live Tracker State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-2xl border-2 border-green-500 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                  
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <CheckCircle2 size={32} />
                    </div>
                  </div>
                  
                  <h3 className="text-center font-bold text-xl text-burgundy mb-2">Order Confirmed!</h3>
                  <p className="text-center text-sm text-gray-500 mb-8">Table for {guests} reserved. Your food will be fired up 20 minutes before your arrival time.</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                      <Navigation size={14} className="text-burgundy" /> Live Status
                    </h4>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:via-gray-200 before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <CheckCircle2 size={18} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-100 bg-white shadow-sm ml-4 md:ml-0 md:group-odd:mr-8 md:group-even:ml-8">
                          <h4 className="font-bold text-gray-900 text-sm">Order Received</h4>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <ChefHat size={18} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-100 bg-gray-50 shadow-sm ml-4 md:ml-0 md:group-odd:mr-8 md:group-even:ml-8 opacity-60">
                          <h4 className="font-bold text-gray-500 text-sm">Preparing</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setCart([]); setIsOrderPlaced(false); }}
                    className="w-full btn-outline py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 text-center font-bold text-sm tracking-wide"
                  >
                    Start New Order
                  </button>

                </motion.div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
