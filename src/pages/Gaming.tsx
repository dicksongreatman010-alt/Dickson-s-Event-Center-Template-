import { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Monitor, Trophy, Clock, Users, Headphones, Plus, Check, Star, AlertCircle, Calendar } from 'lucide-react';
import { DatePicker } from '../components/DatePicker';

const consoles = [
  { id: 'ps5', name: 'PlayStation 5', icon: Gamepad2, price: 2000, desc: 'Next-gen console gaming', img: 'https://images.unsplash.com/photo-1606144042871-36eb120fcc97?auto=format&fit=crop&q=80&w=500' },
  { id: 'xbox', name: 'Xbox Series X', icon: Gamepad2, price: 2000, desc: 'Ultimate power and game pass', img: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=500' },
  { id: 'pc', name: 'Pro PC Rig', icon: Monitor, price: 3000, desc: 'RTX 4090, 240Hz monitors', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=500' },
  { id: 'vip', name: 'VIP Room', icon: Users, price: 15000, desc: 'Private room up to 6 players', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=500' },
];

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

const addOnsList = [
  { id: 'controller', name: 'Extra Controller', icon: Gamepad2, price: 500 },
  { id: 'headset', name: 'Pro Headset', icon: Headphones, price: 500 },
];

const memberships = [
  { name: 'Casual Gamer', price: '₦15,000/mo', hours: '10 hrs included', perks: ['Access to PS5 & Xbox', 'Standard seating'], popular: false },
  { name: 'Pro Gamer', price: '₦35,000/mo', hours: '30 hrs included', perks: ['Access to all consoles & PCs', 'Priority booking', '1 Free tournament entry'], popular: true },
  { name: 'Elite Squad', price: '₦80,000/mo', hours: 'Unlimited', perks: ['VIP room access (2 hrs/day)', 'Free add-ons', 'Exclusive merchandise'], popular: false },
];

export default function Gaming() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedConsole, setSelectedConsole] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  };

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedConsole) {
      const consolePrice = consoles.find(c => c.id === selectedConsole)?.price || 0;
      total += consolePrice * selectedSlots.length;
    }
    selectedAddOns.forEach(addonId => {
      const addonPrice = addOnsList.find(a => a.id === addonId)?.price || 0;
      // Add-ons are charged per hour as well
      total += addonPrice * selectedSlots.length; 
    });
    return total;
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1538481199005-ee1d87e0743b?q=80&w=2000&auto=format&fit=crop" 
            alt="Gaming Lounge" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <span className="text-purple-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">The Nexus Lounge</span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-mono"
          >
            NEXT-LEVEL <br/> <span className="text-purple-500">GAMING</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Premium consoles, high-end PC rigs, and private multiplayer rooms. Experience gaming like never before.
          </motion.p>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="bg-purple-900 border-y border-purple-800 py-3 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
            <span className="font-mono font-medium">LIVE STATUS: 12/20 Stations Available</span>
          </div>
          <div className="flex gap-6 text-purple-200 text-sm font-mono">
            <span>Walk-ins: Welcome</span>
            <span>Current Queue: 0</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Reservation Dashboard Interface */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-mono">BOOK A STATION</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Reserve your preferred console or PC rig by the hour. Don't forget to grab extra accessories if you're bringing friends!</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Console & Date Selection */}
            <div className="lg:col-span-2 space-y-8">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Gamepad2 className="text-purple-600" /> 1. Select Platform
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {consoles.map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => setSelectedConsole(c.id)}
                      className={`relative overflow-hidden cursor-pointer rounded-xl border-2 transition-all ${selectedConsole === c.id ? 'border-purple-600 ring-4 ring-purple-600/20' : 'border-gray-200 hover:border-purple-300'}`}
                    >
                      <div className="h-32 w-full overflow-hidden">
                        <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900">{c.name}</h4>
                          <span className="font-mono text-purple-600 font-bold">₦{c.price}/hr</span>
                        </div>
                        <p className="text-xs text-gray-500">{c.desc}</p>
                      </div>
                      {selectedConsole === c.id && (
                        <div className="absolute top-2 right-2 bg-purple-600 text-white p-1 rounded-full">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="text-purple-600" /> 2. Schedule
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <DatePicker selected={selectedDate} onSelect={(date) => { setSelectedDate(date); setSelectedSlots([]); }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Slots (1 Hour Each)</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-2">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => handleSlotToggle(slot)}
                          className={`py-2 px-3 text-sm font-mono rounded-lg border transition-colors ${selectedSlots.includes(slot) ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-400'}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Add-ons & Checkout */}
            <div className="space-y-8">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus className="text-purple-600" /> Equipment Add-ons
                </h3>
                <div className="space-y-3">
                  {addOnsList.map(addon => (
                    <div 
                      key={addon.id} 
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${selectedAddOns.includes(addon.id) ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${selectedAddOns.includes(addon.id) ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <addon.icon size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{addon.name}</p>
                          <p className="text-xs text-gray-500 font-mono">₦{addon.price}/hr</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddOns.includes(addon.id) ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}`}>
                        {selectedAddOns.includes(addon.id) && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Booking Summary</h3>
                
                {!selectedConsole || selectedSlots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-gray-500 py-8 gap-3">
                    <AlertCircle />
                    <p className="text-sm text-center">Select a platform and at least one time slot to proceed.</p>
                  </div>
                ) : (
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform</span>
                      <span className="font-medium">{consoles.find(c => c.id === selectedConsole)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time ({selectedSlots.length} hrs)</span>
                      <span className="font-medium text-right max-w-[150px]">{selectedSlots.join(', ')}</span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="flex justify-between pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Add-ons</span>
                        <span className="font-medium text-right capitalize">
                          {selectedAddOns.map(addId => addOnsList.find(a => a.id === addId)?.name).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700 mb-6 flex justify-between items-end">
                  <span className="text-gray-400">Total Price</span>
                  <span className="text-3xl font-mono font-bold text-green-400">₦{calculateTotal().toLocaleString()}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <input type="text" id="gaming_name" placeholder="Full Name" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  <input type="email" id="gaming_email" placeholder="Email Address" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  <input type="tel" id="gaming_phone" placeholder="Phone Number" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <button 
                  onClick={async () => {
                    const name = (document.getElementById('gaming_name') as HTMLInputElement)?.value;
                    const email = (document.getElementById('gaming_email') as HTMLInputElement)?.value;
                    const phone = (document.getElementById('gaming_phone') as HTMLInputElement)?.value;
                    if (!name || !email) {
                      alert("Please provide your name and email.");
                      return;
                    }
                    try {
                      const { createBookingInquiry } = await import('../services/bookingService');
                      const totalAmount = calculateTotal();
                      const result = await createBookingInquiry({
                        hall: selectedConsole,
                        date: selectedDate?.toISOString() || new Date().toISOString(),
                        name, email, phone,
                        eventType: 'gaming',
                        guests: selectedSlots.length,
                        message: `Time slots: ${selectedSlots.join(', ')} | Add-ons: ${selectedAddOns.join(', ')} | Total: ₦${totalAmount}`
                      });
                      if (result.success && result.data && result.data.length > 0) {
                        const newBookingId = result.data[0].id;
                        window.location.href = `/payment?bookingId=${newBookingId}&amount=${totalAmount}`;
                      } else {
                        alert("Error saving booking. Please try again.");
                      }
                    } catch (e: any) { alert("Error booking: " + e.message); }
                  }}
                  disabled={!selectedConsole || selectedSlots.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-4 rounded-xl transition-colors font-mono tracking-wider"
                >
                  RESERVE NOW
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Tournaments & Scoreboard Section */}
        <div className="mb-24">
          <div className="bg-black text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-800">
              <span className="text-purple-500 font-mono font-bold text-sm tracking-wider uppercase mb-2 block">Esports</span>
              <h2 className="text-3xl font-bold mb-6 font-mono">UPCOMING TOURNAMENT</h2>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gold">FIFA 24 Masters Cup</h3>
                    <p className="text-gray-400 text-sm mt-1">Prize Pool: ₦500,000</p>
                  </div>
                  <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" /> Live Now
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Calendar size={16} className="text-purple-500" /> Oct 24 - Oct 26
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Users size={16} className="text-purple-500" /> 32 Players (Registration Closed)
                  </div>
                </div>
                <button className="w-full bg-transparent border border-purple-500 text-purple-400 font-bold py-3 rounded-lg hover:bg-purple-500/10 transition-colors">
                  View Bracket
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-950">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 font-mono">
                <Trophy className="text-gold" /> LIVE SCOREBOARD
              </h3>
              
              <div className="space-y-4">
                {[
                  { p1: 'GhostKing', p2: 'Sniper007', s1: 3, s2: 1, status: 'Final' },
                  { p1: 'Chima_XX', p2: 'ProGamer_Ng', s1: 0, s2: 0, status: '1st Half 34\'' },
                  { p1: 'ShadowNinja', p2: 'FireBoy99', s1: '-', s2: '-', status: 'Upcoming' },
                ].map((match, idx) => (
                  <div key={idx} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between border border-gray-800">
                    <div className="flex-1 text-right font-bold text-gray-300">{match.p1}</div>
                    <div className="px-6 flex flex-col items-center">
                      <div className="bg-gray-800 px-4 py-2 rounded font-mono text-xl font-bold shadow-inner">
                        <span className={match.s1 > match.s2 ? 'text-green-400' : 'text-white'}>{match.s1}</span>
                        <span className="mx-2 text-gray-600">-</span>
                        <span className={match.s2 > match.s1 ? 'text-green-400' : 'text-white'}>{match.s2}</span>
                      </div>
                      <span className={`text-[10px] uppercase font-bold mt-2 ${match.status.includes('Half') ? 'text-red-400 animate-pulse' : 'text-gray-500'}`}>{match.status}</span>
                    </div>
                    <div className="flex-1 text-left font-bold text-gray-300">{match.p2}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Memberships */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-mono">MEMBERSHIP PLANS</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Get time credits and exclusive perks with our monthly plans.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {memberships.map((plan, idx) => (
              <div key={idx} className={`relative bg-white rounded-2xl border p-8 ${plan.popular ? 'border-purple-600 shadow-xl shadow-purple-600/10 scale-105 z-10' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-mono font-bold tracking-tight text-purple-600 mb-6">{plan.price}</div>
                <div className="bg-purple-50 text-purple-800 p-3 rounded-lg font-bold text-sm mb-6 flex items-center justify-center gap-2">
                  <Clock size={16} /> {plan.hours}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.perks.map((perk, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-sm">
                      <Check size={18} className="text-green-500 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
