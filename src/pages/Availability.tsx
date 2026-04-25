import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, ChevronRight, AlertCircle, CreditCard } from 'lucide-react';
import { halls } from '../data/content';
import { DatePicker } from '../components/DatePicker';
import { getBookedDatesForHall } from '../services/bookingService';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Availability() {
  const navigate = useNavigate();
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch booked dates whenever a hall is selected
  useEffect(() => {
    async function loadAvailability() {
      if (selectedHall) {
        setIsLoading(true);
        const dates = await getBookedDatesForHall(selectedHall);
        setBookedDates(dates);
        setIsLoading(false);
      } else {
        setBookedDates([]);
      }
    }
    loadAvailability();
  }, [selectedHall]);

  // Handle direct payment checkout simulation
  const handleDirectPayment = () => {
    // Navigate to booking page with pre-filled details, and maybe a payment query param
    navigate(`/booking?hall=${selectedHall}&date=${selectedDate}&checkout=true`);
  };

  const isBooked = selectedDate && bookedDates.some(
    d => format(d, 'yyyy-MM-dd') === selectedDate
  );

  return (
    <div className="pt-24 pb-20">
      {/* Header section */}
      <div className="bg-navy py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519167758481-83f540f28b07?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs font-bold tracking-[4px] uppercase block mb-4"
          >
            Check Availability
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Find Your Date
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-sm md:text-base max-w-2xl mx-auto"
          >
            Select your preferred hall and date to check real-time availability. 
            Once confirmed, you can proceed directly to secure your booking.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-[-40px] relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Hall Selection */}
            <div>
              <label htmlFor="hall" className="form-label font-semibold">1. Select Venue</label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {halls.map((hall) => (
                  <div 
                    key={hall.id}
                    onClick={() => setSelectedHall(hall.id)}
                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 flex flex-col ${
                      selectedHall === hall.id 
                        ? 'border-gold bg-[#FCF8F2] shadow-sm' 
                        : 'border-gray-200 hover:border-gold hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-semibold ${selectedHall === hall.id ? 'text-navy' : 'text-gray-700'}`}>
                      {hall.name}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center mt-1">
                      Up to {hall.capacity} guests
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="form-label font-semibold">2. Choose Date</label>
              <div className="mt-2">
                <DatePicker 
                  selected={selectedDate ? parseISO(selectedDate) : undefined}
                  onSelect={(d) => {
                    setSelectedDate(d ? format(d, 'yyyy-MM-dd') : '');
                  }}
                  minDate={new Date()}
                  disabledDates={bookedDates}
                  className="w-full"
                />
              </div>

              {selectedHall && !selectedDate && (
                <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start text-sm text-gray-600 gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                  <p>Please select a date from the calendar to check its availability status in real-time.</p>
                </div>
              )}
              
              {!selectedHall && (
                <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start text-sm text-gray-600 gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 shrink-0" />
                  <p>Select a venue first to load its availability calendar.</p>
                </div>
              )}

              {/* Status Output */}
              {selectedHall && selectedDate && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <label className="form-label font-semibold">Status</label>
                  {isLoading ? (
                    <div className="p-5 border border-gray-100 bg-gray-50 rounded-xl mt-2 animate-pulse flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-3 text-sm text-gray-500">Checking...</span>
                    </div>
                  ) : isBooked ? (
                    <div className="p-5 border border-red-100 bg-red-50 rounded-xl mt-2 flex flex-col">
                      <div className="flex items-center text-red-600 mb-2">
                        <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                        <span className="font-semibold">Not Available</span>
                      </div>
                      <p className="text-sm text-red-700 ml-8">
                        This date has already been booked for {halls.find(h => h.id === selectedHall)?.name}. Please select another date or venue.
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 border border-green-200 bg-green-50 rounded-xl mt-2 flex flex-col">
                      <div className="flex items-center text-green-700 mb-3">
                        <CheckCircle2 className="w-5 h-5 mr-3 shrink-0" />
                        <span className="font-semibold">Available!</span>
                      </div>
                      <p className="text-sm text-green-800 ml-8 mb-4">
                        Great news! {halls.find(h => h.id === selectedHall)?.name} is available on {format(parseISO(selectedDate), 'MMMM do, yyyy')}.
                      </p>
                      
                      <div className="ml-8 mt-2 space-y-3">
                        <button 
                          onClick={handleDirectPayment}
                          className="w-full flex items-center justify-center gap-2 bg-[#002349] hover:bg-[#00346a] text-white px-4 py-3 rounded-md font-medium transition-colors"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay & Secure Booking Now
                        </button>
                        <button 
                          onClick={() => navigate(`/booking?hall=${selectedHall}&date=${selectedDate}`)}
                          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-navy border border-gray-200 px-4 py-3 rounded-md font-medium transition-colors"
                        >
                          Send Inquiry Instead
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
