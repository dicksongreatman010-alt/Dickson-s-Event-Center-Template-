import { useState } from 'react';
import { motion } from 'motion/react';
import { Flag, ShieldAlert, Timer, Users, UserPlus, Trophy, CreditCard, ChevronRight, Check } from 'lucide-react';
import { DatePicker } from '../components/DatePicker';

const raceModes = [
  { id: 'sprint', name: 'Sprint Heat', icon: Timer, price: 5000, time: '15 Mins', desc: 'Quick qualification style race against the clock.' },
  { id: 'team', name: 'Team Endurance', icon: Users, price: 15000, time: '45 Mins', desc: 'Team relay race with pit stops and driver swaps.' },
  { id: 'gp', name: 'GP Championship', icon: Trophy, price: 25000, time: '1 Hour', desc: 'Full practice, qualifying, and grid-start race experience.' },
];

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

const equipmentList = [
  { id: 'pro-helmet', name: 'Pro-Visor Helmet', price: 1000 },
  { id: 'race-suit', name: 'Full Race Suit', price: 2000 },
];

export default function GoKart() {
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverID, setDriverID] = useState('');
  const [checklist, setChecklist] = useState({ rules: false, health: false });
  const [rentals, setRentals] = useState<string[]>([]);
  const [isBooked, setIsBooked] = useState(false);

  const handleNextStep = () => {
    if (step === 1 && selectedMode && selectedSlot) setStep(2);
    else if (step === 2 && driverName && driverID && checklist.rules && checklist.health) setStep(3);
  };

  const calculateTotal = () => {
    const base = raceModes.find(m => m.id === selectedMode)?.price || 0;
    const addOns = rentals.reduce((sum, rId) => sum + (equipmentList.find(e => e.id === rId)?.price || 0), 0);
    return base + addOns;
  };

  const handlePayment = () => {
    setIsBooked(true);
  };

  return (
    <div className="w-full pb-20 bg-[#111111] text-white font-sans">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1596700589139-4ddc6da155de?auto=format&fit=crop&q=80&w=2000" 
            alt="Go Kart Track" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
          {/* Subtle checkered overlay pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] mb-6"
          >
            <ShieldAlert size={14} /> Track Status: Dry / Optimal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
          >
            Apex Karting
            <br />
            <span className="text-red-600">Arena</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Booking Flow */}
          <div className="lg:col-span-2">
            
            {!isBooked ? (
              <div className="space-y-8">
                {/* Visual Step Indicator */}
                <div className="flex items-center justify-between relative mb-12">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 -z-10 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-red-600 -z-10 rounded-full transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }}></div>
                  
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg transition-colors border-2 ${step >= s ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_#dc2626]' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
                      {s}
                    </div>
                  ))}
                </div>

                {/* STEP 1: Mode & Schedule */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-black uppercase italic tracking-wide mb-6">Select Race Mode</h2>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {raceModes.map(mode => (
                          <div 
                            key={mode.id}
                            onClick={() => setSelectedMode(mode.id)}
                            className={`p-6 bg-gray-900 border-2 rounded-xl cursor-pointer transition-all ${selectedMode === mode.id ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'border-gray-800 hover:border-gray-600'}`}
                          >
                            <mode.icon className={`w-8 h-8 mb-4 ${selectedMode === mode.id ? 'text-red-500' : 'text-gray-400'}`} />
                            <h3 className="font-black text-lg mb-1">{mode.name}</h3>
                            <div className="text-red-500 font-bold mb-3 font-mono">{mode.time} • ₦{mode.price}</div>
                            <p className="text-sm text-gray-400">{mode.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className={!selectedMode ? 'opacity-50 pointer-events-none' : ''}>
                      <h2 className="text-2xl font-black uppercase italic tracking-wide mb-6">Schedule Heat</h2>
                      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Race Date</label>
                          <div className="custom-dark-datepicker">
                            <DatePicker selected={selectedDate} onSelect={(date) => { setSelectedDate(date); setSelectedSlot(null); }} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Starting Grid (Time)</label>
                          <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {timeSlots.map(slot => (
                              <button
                                key={slot}
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3 px-4 rounded-lg font-mono font-bold transition-all border ${selectedSlot === slot ? 'bg-red-600 border-red-500 text-white' : 'bg-black border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'}`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={handleNextStep}
                        disabled={!selectedMode || !selectedSlot}
                        className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 font-black px-8 py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center gap-2"
                      >
                        Driver Registration <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Driver Registration & Briefing */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h2 className="text-2xl font-black uppercase italic tracking-wide mb-2"><UserPlus className="inline mr-2 text-red-500" /> Driver Details</h2>
                    
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Driver Alias / Name</label>
                          <input type="text" value={driverName} onChange={e => setDriverName(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" placeholder="e.g. SpeedRacer99" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ID Number (License/Gov)</label>
                          <input type="text" value={driverID} onChange={e => setDriverID(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 focus:outline-none" placeholder="AB1234567" />
                        </div>
                      </div>
                      <div className="p-4 bg-black border border-gray-800 rounded-lg flex items-center gap-4 text-sm text-gray-400">
                        <Flag className="text-gray-600 shrink-0" size={32} />
                        <p>A valid photo ID must be presented at the check-in desk before receiving your telemetry transponder.</p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-black uppercase italic tracking-wide mt-12 mb-2"><ShieldAlert className="inline mr-2 text-red-500" /> Mandatory Briefing</h2>
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${checklist.rules ? 'bg-red-600 border-red-500' : 'bg-black border-gray-600'}`}>
                          {checklist.rules && <Check size={16} />}
                        </div>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">I agree to obey all flag signals and track marshal instructions. I understand that aggressive driving or bumping will result in immediate disqualification.</span>
                      </label>
                      
                      <div className="w-full h-[1px] bg-gray-800 my-4" />
                      
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className={`mt-1 w-6 h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${checklist.health ? 'bg-red-600 border-red-500' : 'bg-black border-gray-600'}`}>
                          {checklist.health && <Check size={16} />}
                        </div>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">I confirm that I do not have any pre-existing health conditions (e.g., heart issues, pregnancy) that could be aggregated by high-G karting forces.</span>
                      </label>
                    </div>

                    <div className="flex justify-between pt-6">
                      <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-bold uppercase tracking-widest text-sm">Back</button>
                      <button 
                        onClick={handleNextStep}
                        disabled={!driverName || !driverID || !checklist.rules || !checklist.health}
                        className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 font-black px-8 py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center gap-2"
                      >
                        Review & Pay <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Checkout */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <h2 className="text-2xl font-black uppercase italic tracking-wide mb-2">Telemetry & Checkout</h2>
                    
                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                      <h3 className="font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">Race Profile Confirmation</h3>
                      <div className="grid grid-cols-2 gap-y-6 text-sm">
                        <div>
                          <span className="block text-gray-500 mb-1">Driver</span>
                          <span className="font-bold text-lg">{driverName}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 mb-1">Race Mode</span>
                          <span className="font-bold text-lg text-red-500">{raceModes.find(m=>m.id===selectedMode)?.name}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 mb-1">Heat Scheduled</span>
                          <span className="font-mono font-medium text-white">{selectedDate?.toLocaleDateString()} @ {selectedSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
                       <h3 className="font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">Equipment Rentals</h3>
                       <div className="space-y-3">
                         {equipmentList.map(eq => (
                           <label key={eq.id} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors border ${rentals.includes(eq.id) ? 'bg-red-900/20 border-red-600' : 'bg-black border-gray-800 hover:border-gray-600'}`}>
                              <div className="flex items-center gap-3">
                                <input 
                                  type="checkbox" 
                                  checked={rentals.includes(eq.id)}
                                  onChange={(e) => setRentals(prev => e.target.checked ? [...prev, eq.id] : prev.filter(r => r !== eq.id))}
                                  className="w-5 h-5 bg-black border-gray-600 rounded text-red-600 focus:ring-0"
                                />
                                <span className="font-medium">{eq.name}</span>
                              </div>
                              <span className="font-mono text-gray-400">₦{eq.price}</span>
                           </label>
                         ))}
                       </div>
                    </div>

                    <div className="flex justify-between items-end bg-black p-6 rounded-xl border border-gray-800">
                      <div>
                        <span className="block text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Total Due</span>
                        <div className="text-3xl font-black font-mono">₦{calculateTotal().toLocaleString()}</div>
                      </div>
                      <button 
                        onClick={handlePayment}
                        className="bg-red-600 text-white hover:bg-red-700 font-black px-8 py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                      >
                        <CreditCard size={20} /> Authorize Payment
                      </button>
                    </div>

                    <div className="pt-4">
                      <button onClick={() => setStep(2)} className="text-gray-500 hover:text-white font-bold uppercase tracking-widest text-sm">Back to Details</button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Success State */
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 rounded-2xl border border-red-600 p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                  <Flag size={40} className="text-white" />
                </div>
                
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Grid Setup Confirmed</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Your telemetry transponder is registered. Please arrive 20 minutes before your scheduled heat at the pit lane check-in.</p>
                
                <div className="inline-block bg-black border border-gray-800 rounded-xl p-6 mb-8 text-left max-w-sm w-full font-mono text-sm">
                  <div className="flex justify-between mb-2"><span className="text-gray-500">Driver</span><span className="text-white font-bold">{driverName}</span></div>
                  <div className="flex justify-between mb-2"><span className="text-gray-500">Heat Time</span><span className="text-white font-bold">{selectedSlot}</span></div>
                  <div className="flex justify-between border-t border-gray-800 pt-2 mt-2"><span className="text-gray-500">Pit Box</span><span className="text-red-500 font-bold uppercase">To Be Assigned</span></div>
                </div>

                <div>
                   <button onClick={() => { setStep(1); setIsBooked(false); setDriverName(''); setRentals([]); setSelectedSlot(null); }} className="text-red-500 font-bold uppercase tracking-widest hover:text-white transition-colors">Book Another Session</button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden sticky top-24">
               <div className="bg-red-600 p-6 text-center">
                 <h3 className="text-xl font-black italic uppercase tracking-widest flex justify-center items-center gap-2">
                   <Timer /> Live Timing
                 </h3>
                 <p className="text-red-200 text-xs mt-1 uppercase font-bold tracking-widest">Global Top 5</p>
               </div>
               
               <div className="p-6 space-y-3 font-mono">
                 {[
                   { pos: 1, name: 'Vortex_X', time: '0:58.421', diff: '-' },
                   { pos: 2, name: 'Apex_Predator', time: '0:58.905', diff: '+0.484' },
                   { pos: 3, name: 'Slipstream', time: '0:59.112', diff: '+0.691' },
                   { pos: 4, name: 'Redline_Dan', time: '0:59.455', diff: '+1.034' },
                   { pos: 5, name: 'GhostRider', time: '1:00.002', diff: '+1.581' },
                 ].map((d) => (
                   <div key={d.pos} className="flex items-center gap-3 bg-black p-3 rounded-lg border border-gray-800">
                     <div className={`w-6 text-center font-black ${d.pos === 1 ? 'text-red-500' : 'text-gray-600'}`}>{d.pos}</div>
                     <div className="flex-1 font-bold text-sm truncate">{d.name}</div>
                     <div className="text-right">
                       <div className={`font-black tracking-tight ${d.pos === 1 ? 'text-white' : 'text-gray-400'}`}>{d.time}</div>
                       <div className="text-[10px] text-gray-600">{d.diff}</div>
                     </div>
                   </div>
                 ))}
               </div>
               
               <div className="bg-gray-950 p-6 border-t border-gray-800 text-center">
                 <p className="text-xs text-gray-500 mb-3">Beat the lap record to win a free Grand Prix entry next month.</p>
                 <img src="https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=500&q=80" alt="Track Layout" className="w-full h-32 object-cover rounded-lg border border-gray-800 opacity-50 grayscale" />
                 <div className="text-[10px] text-gray-500 mt-2 uppercase font-bold tracking-widest font-mono">Circuit Layout A - Standard</div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
