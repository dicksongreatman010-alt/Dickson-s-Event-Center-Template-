import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Camera, Users, Trophy, ChevronRight, CheckCircle2, AlertTriangle, UserPlus, Clock } from 'lucide-react';
import { DatePicker } from '../components/DatePicker';

const tracks = [
  { id: 'neon-run', name: 'Neon Run', level: 'Beginner', icon: Shield, price: 3000, desc: 'Wide paths and gentle curves. Perfect for first-timers.', color: 'text-green-400', border: 'border-green-400' },
  { id: 'cyber-drift', name: 'Cyber Drift', level: 'Intermediate', icon: Zap, price: 4500, desc: 'Tight corners and speed zones for experienced riders.', color: 'text-yellow-400', border: 'border-yellow-400' },
  { id: 'gravity-drop', name: 'Gravity Drop', level: 'Pro/Expert', icon: AlertTriangle, price: 6000, desc: 'High-speed ramps and complex obstacle courses.', color: 'text-red-400', border: 'border-red-400' },
];

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

const addOnsList = [
  { id: 'gear', name: 'Premium Safety Gear', icon: Shield, price: 1000 },
  { id: 'media', name: 'GoPro & Action Photos', icon: Camera, price: 2500 },
  { id: 'instructor', name: '1-on-1 Instructor (30m)', icon: UserPlus, price: 3000 },
];

export default function Hoverboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [isBookingDetails, setIsBookingDetails] = useState(false);

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedTrack) {
      const trackPrice = tracks.find(t => t.id === selectedTrack)?.price || 0;
      total += trackPrice;
    }
    selectedAddOns.forEach(addonId => {
      const addonPrice = addOnsList.find(a => a.id === addonId)?.price || 0;
      total += addonPrice;
    });
    return total;
  };

  const handleBooking = async () => {
    if (!waiverSigned || !selectedTrack || !selectedSlot) return;

    const name = (document.getElementById('hoverboard_name') as HTMLInputElement)?.value;
    const email = (document.getElementById('hoverboard_email') as HTMLInputElement)?.value;
    const phone = (document.getElementById('hoverboard_phone') as HTMLInputElement)?.value;
    if (!name || !email) {
      alert("Please provide your name and email.");
      return;
    }

    try {
      const { createBookingInquiry } = await import('../services/bookingService');
      const totalAmount = calculateTotal();
      const result = await createBookingInquiry({
        hall: selectedTrack,
        date: selectedDate?.toISOString() || new Date().toISOString(),
        name, email, phone,
        eventType: 'hoverboard',
        guests: 1,
        message: `Time slot: ${selectedSlot} | Add-ons: ${selectedAddOns.join(', ')} | Total: ₦${totalAmount}`
      });
      if (result.success && result.data && result.data.length > 0) {
        const newBookingId = result.data[0].id;
        window.location.href = `/payment?bookingId=${newBookingId}&amount=${totalAmount}`;
      } else {
        alert("Error saving booking. Please try again.");
      }
    } catch (e: any) { alert("Error booking: " + e.message); }
  };

  return (
    <div className="w-full pb-20 bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://cdn.shopify.com/s/files/1/0605/4549/9286/files/ihoverboard_h1_hoverboard_8.jpg?v=1726034216" 
            alt="Hoverboard Arena" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan-950/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Zero Gravity Zone</span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-6 italic"
          >
            HOVER ARENA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light"
          >
            Defy gravity on our cutting-edge indoor tracks. Choose your difficulty, set new course records, and experience the future of riding.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Booking Flow */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Tracks */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">1</span> 
                Select Your Track
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {tracks.map(track => (
                  <div 
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all border-2 bg-slate-900 overflow-hidden group ${selectedTrack === track.id ? `border-cyan-500 bg-cyan-950/30` : 'border-slate-800 hover:border-slate-600'}`}
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <track.icon className={`w-8 h-8 mb-4 ${track.color}`} />
                    <h3 className="text-xl font-bold text-white mb-1">{track.name}</h3>
                    <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${track.color}`}>{track.level}</div>
                    <p className="text-sm text-slate-400 mb-4 h-10">{track.desc}</p>
                    <div className="text-xl font-mono text-cyan-400 font-bold">₦{track.price}<span className="text-sm text-slate-500 font-sans">/hr</span></div>
                    
                    {selectedTrack === track.id && (
                      <div className="absolute top-4 right-4 text-cyan-400">
                        <CheckCircle2 />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Time & Date */}
            <section className={!selectedTrack ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">2</span> 
                Schedule Ride
              </h2>
              <div className="grid md:grid-cols-2 gap-8 bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-3">Select Date</label>
                  <div className="custom-dark-datepicker">
                    <DatePicker selected={selectedDate} onSelect={(date) => { setSelectedDate(date); setSelectedSlot(null); }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-3">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-xl text-sm font-mono transition-all border ${selectedSlot === slot ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Add-ons */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">
                  <Zap className="text-cyan-400" size={20} /> Equip Add-ons
                </h3>
                <div className="space-y-3">
                  {addOnsList.map(addon => (
                    <div 
                      key={addon.id} 
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedAddOns.includes(addon.id) ? 'bg-cyan-950/40 border-cyan-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                    >
                      <div className="flex items-center gap-3">
                        <addon.icon className={selectedAddOns.includes(addon.id) ? 'text-cyan-400' : 'text-slate-500'} size={18} />
                        <div>
                          <p className="text-sm font-medium text-slate-200">{addon.name}</p>
                          <p className="text-xs text-slate-500 font-mono">₦{addon.price}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded overflow-hidden flex items-center justify-center border ${selectedAddOns.includes(addon.id) ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700'}`}>
                        {selectedAddOns.includes(addon.id) && <CheckCircle2 size={14} className="text-slate-900" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Summary */}
              <div className="bg-gradient-to-br from-cyan-950 to-blue-900 p-1 rounded-2xl">
                <div className="bg-slate-950 p-6 rounded-xl h-full">
                  <h3 className="text-xl font-bold text-white mb-6">Mission Details</h3>
                  
                  {!selectedTrack || !selectedSlot ? (
                    <div className="text-slate-500 text-center py-8 text-sm">
                      Select a track and time slot to view your mission briefing.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-sm space-y-3 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Track</span>
                          <span className="font-bold text-cyan-400">{tracks.find(t => t.id === selectedTrack)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date</span>
                          <span className="font-medium text-white">{selectedDate?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Time</span>
                          <span className="font-medium text-white">{selectedSlot}</span>
                        </div>
                        {selectedAddOns.length > 0 && (
                          <div className="pt-3 border-t border-slate-800">
                            <span className="text-slate-500 block mb-2">Selected Gear:</span>
                            {selectedAddOns.map(id => (
                              <div key={id} className="flex justify-between text-xs mb-1">
                                <span>- {addOnsList.find(a => a.id === id)?.name}</span>
                                <span className="font-mono">₦{addOnsList.find(a => a.id === id)?.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Waiver */}
                      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="mt-1">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500/20 bg-slate-950"
                              checked={waiverSigned}
                              onChange={(e) => setWaiverSigned(e.target.checked)}
                            />
                          </div>
                          <span className="text-xs text-slate-400">
                            I agree to the <a href="#" className="text-cyan-400 hover:underline">Safety Liability Waiver</a> and confirm I am physically fit to participate.
                          </span>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        <input type="text" id="hoverboard_name" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                        <input type="email" id="hoverboard_email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                        <input type="tel" id="hoverboard_phone" placeholder="Phone Number" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex items-end justify-between">
                        <span className="text-slate-400 text-sm">Total Cost</span>
                        <span className="text-3xl font-mono font-bold text-white">₦{calculateTotal().toLocaleString()}</span>
                      </div>

                      <button 
                        onClick={handleBooking}
                        disabled={!waiverSigned}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-slate-950 font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 flex justify-center items-center gap-2 uppercase tracking-wide"
                      >
                        CONFIRM PROTOCOL <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Hoverboard Arena Gallery & Action Highlights */}
        <div className="mt-24 border-t border-slate-900 pt-16">
          <div className="text-center mb-10">
            <span className="text-cyan-400 font-bold tracking-[0.25em] uppercase text-xs block mb-2">Live Action & Experience</span>
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
              Zero-G <span className="text-cyan-500">Arena Highlights</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm font-light">
              Catch a glimpse of the adrenaline, the neon glows, and the pure thrill of sprinting on our futuristic tracks. Safe for all experience levels with premium pro-grade gear.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-950 transition-all hover:border-cyan-500/30">
              <div className="h-72 md:h-96 overflow-hidden relative">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0605/4549/9286/files/ihoverboard_h1_hoverboard_8.jpg?v=1726034216" 
                  alt="Neon Pro Hoverboard Control and Drift" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-slate-900/60">
                <h4 className="font-black uppercase tracking-wide text-cyan-400 text-sm mb-1">Precision Drift Core</h4>
                <p className="text-xs text-slate-400">Pro-tuned smart gyroscopic stabilization sensors ensure quick, snappy response times on high-speed sweeps.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-950 transition-all hover:border-cyan-500/30">
              <div className="h-72 md:h-96 overflow-hidden relative">
                <img 
                  src="https://www.myrideo.com.au/cdn/shop/articles/Two_kids_playing_with_rideo_hoverboard.jpg?v=1720690119" 
                  alt="Fun and family friendly hoverboard riding" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-slate-900/60">
                <h4 className="font-black uppercase tracking-wide text-cyan-400 text-sm mb-1">Friendly Arena Environment</h4>
                <p className="text-xs text-slate-400">A community where riders of all ages learn, play, and safely compete with continuous safety supervisor monitoring.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Leaderboard & Events */}
        <div className="mt-32 pt-16 border-t border-slate-800">
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            {/* Leaderboard */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
               {/* Decorative glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
               
               <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                 <Trophy className="text-cyan-400" />
                 SERVER LEADERBOARD
               </h3>
               
               <div className="space-y-4 relative z-10">
                 {[
                   { rank: 1, name: 'NovaRider', time: '01:12.45', track: 'Cyber Drift' },
                   { rank: 2, name: 'Flash99', time: '01:14.20', track: 'Cyber Drift' },
                   { rank: 3, name: 'AeroZero', time: '01:15.05', track: 'Cyber Drift' },
                   { rank: 4, name: 'PulseKit', time: '01:16.88', track: 'Cyber Drift' },
                 ].map((r) => (
                   <div key={r.rank} className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                     <div className={`w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-sm ${r.rank === 1 ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                       #{r.rank}
                     </div>
                     <div className="flex-1">
                       <div className="font-bold text-white text-lg">{r.name}</div>
                     </div>
                     <div className="text-right">
                       <div className="font-mono text-cyan-400 font-bold">{r.time}</div>
                       <div className="text-xs text-slate-500">{r.track}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Event Calendar */}
            <div className="bg-gradient-to-br from-slate-900 flex flex-col to-slate-950 rounded-3xl p-8 border border-slate-800/50 shadow-2xl">
               <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                 <Users className="text-cyan-400" />
                 UPCOMING RACES
               </h3>
               <p className="text-slate-400 mb-8">Join massive multiplayer races and open track days.</p>

               <div className="space-y-6 flex-1">
                 {[
                   { date: 'OCT 28', title: 'Neon Nights Open Track', type: 'Casual Meetup', slots: 15 },
                   { date: 'NOV 05', title: 'Cyber Drift Championship', type: 'Pro Tournament', slots: 4 },
                   { date: 'NOV 12', title: 'Beginner Clinic & Race', type: 'Training + Race', slots: 20 },
                 ].map((evt, i) => (
                   <div key={i} className="flex gap-6 group cursor-pointer">
                     <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-xl p-3 min-w-[80px] group-hover:border-cyan-500/50 transition-colors">
                       <span className="text-cyan-400 font-black text-xl leading-none mb-1">{evt.date.split(' ')[1]}</span>
                       <span className="text-slate-500 text-xs font-bold">{evt.date.split(' ')[0]}</span>
                     </div>
                     <div className="flex-1 flex flex-col justify-center border-b border-slate-800/50 pb-6 group-last:border-0 group-last:pb-0">
                       <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{evt.title}</h4>
                       <div className="flex items-center gap-4 text-xs font-medium">
                         <span className="text-slate-400">{evt.type}</span>
                         <span className="flex items-center gap-1 text-cyan-500"><AlertTriangle size={12}/> {evt.slots} Slots Left</span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
               
               <button className="w-full mt-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition-colors uppercase text-sm tracking-wider">
                 View Full Calendar
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
