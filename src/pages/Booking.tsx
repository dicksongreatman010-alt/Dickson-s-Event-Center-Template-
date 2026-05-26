import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { halls } from '../data/content';
import { DatePicker } from '../components/DatePicker';
import { getBookedDatesForHall, createBookingInquiry } from '../services/bookingService';
import { format, parseISO, addDays, addWeeks, addMonths } from 'date-fns';
import { supabase } from '../lib/supabase';

export default function Booking() {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    guests: '',
    date: '',
    hall: '',
    message: '',
    isRecurring: false,
    recurringType: 'weekly',
    recurringCount: '2'
  });

  const [bookingId, setBookingId] = useState('');

  // Fetch booked dates whenever a hall is selected
  useEffect(() => {
    async function loadAvailability() {
      if (formData.hall) {
        setIsLoading(true);
        const dates = await getBookedDatesForHall(formData.hall);
        setBookedDates(dates);
        setIsLoading(false);
      } else {
        setBookedDates([]);
      }
    }
    loadAvailability();

    if (formData.hall) {
      const subscription = supabase
        .channel(`public:bookings:${formData.hall}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'bookings', filter: `hall_id=eq.${formData.hall}` },
          () => {
            console.log('Real-time bookings update received for hall:', formData.hall);
            loadAvailability();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [formData.hall]);

  // Pre-select hall and date if passed in URL
  const params = new URLSearchParams(location.search);
  const checkoutParam = params.get('checkout') === 'true';

  useEffect(() => {
    const hallParam = params.get('hall');
    const dateParam = params.get('date');
    
    setFormData(prev => ({ 
      ...prev, 
      ...(hallParam && { hall: hallParam }),
      ...(dateParam && { date: dateParam })
    }));
  }, [location.search]); // Depend on location.search instead of location

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'date') {
      if (typeof value === 'string' && value && value < today) {
        setDateError('Please select a future date for your event.');
      } else {
        setDateError('');
      }
    }
  };

  const getRecurringDates = () => {
    if (!formData.date || !formData.isRecurring) return [formData.date];
    
    const dates = [formData.date];
    const initialDate = parseISO(formData.date);
    const count = parseInt(formData.recurringCount, 10);
    
    for (let i = 1; i < count; i++) {
      let nextDate = initialDate;
      if (formData.recurringType === 'daily') nextDate = addDays(initialDate, i);
      if (formData.recurringType === 'weekly') nextDate = addWeeks(initialDate, i);
      if (formData.recurringType === 'monthly') nextDate = addMonths(initialDate, i);
      dates.push(format(nextDate, 'yyyy-MM-dd'));
    }
    return dates;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.date) {
      setDateError('Please select a date for your event.');
      return;
    }

    if (formData.date && formData.date < today) {
      setDateError('Please select a future date for your event.');
      return;
    }

    if (formData.date && formData.hall) {
      const allDates = getRecurringDates();
      
      const isBooked = allDates.some(newDate => 
        bookedDates.some(booked => format(booked, 'yyyy-MM-dd') === newDate)
      );
      
      if (isBooked) {
        setDateError('One or more of selected dates are already booked for the selected hall.');
        return;
      }
    }
    
    // Validation passed, show confirmation modal
    setShowConfirmModal(true);
  };

  const processSubmission = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    
    try {
      const selectedHallName = halls.find(h => h.id === formData.hall)?.name || formData.hall;
      let newBookingId = '';
      const allDates = getRecurringDates();

      // 1. Save to Supabase
      try {
        for (let i = 0; i < allDates.length; i++) {
          const result = await createBookingInquiry({ ...formData, date: allDates[i] });
          if (i === 0 && result.success && result.data && result.data.length > 0) {
            newBookingId = result.data[0].id;
            setBookingId(newBookingId);
          }
        }
      } catch (err) {
        console.warn('Could not save booking to Supabase, perhaps the "bookings" table does not exist or permissions are incorrect. Continuing with email notification...', err);
      }
      
      // 2. Send email notification via backend API
      const datesStr = allDates.join(', ');
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: datesStr, hall: selectedHallName }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : data.error;
        throw new Error(errorMsg || 'Failed to send inquiry email');
      }
      
      if (checkoutParam) {
        if (newBookingId) {
          window.location.href = `/payment?bookingId=${newBookingId}&amount=500000`;
        } else {
          await handleDeposit();
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    if (bookingId) {
      window.location.href = `/payment?bookingId=${bookingId}&amount=500000`;
      return;
    }
    
    try {
      const selectedHallName = halls.find(h => h.id === formData.hall)?.name || formData.hall;
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, date: formData.date, hall: selectedHallName }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to initiate payment. Please try again later.');
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    const selectedHallName = halls.find(h => h.id === formData.hall)?.name || formData.hall;
    const allDates = getRecurringDates();
    const datesStr = formData.isRecurring ? `${allDates.length} occurrences (${formData.recurringType}): ${allDates.join(', ')}` : formData.date;
    const waMessage = `New Booking Inquiry%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AEvent: ${formData.eventType}%0AGuests: ${formData.guests}%0ADate: ${datesStr}%0AHall: ${selectedHallName}%0AMessage: ${formData.message}`;
    const waUrl = `https://wa.me/1234567890?text=${waMessage}`;

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="booking-card max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-burgundy mb-4">Inquiry Sent!</h2>
          <p className="text-text-gray text-sm mb-8 leading-relaxed">
            Thank you for choosing PentonRise Event Center. We have sent a confirmation to your email. Our team will review your inquiry and get back to you shortly.
          </p>
          <div className="space-y-3">
            <button 
              onClick={handleDeposit}
              disabled={isLoading}
              className="btn bg-burgundy text-white hover:bg-burgundy-light w-full"
            >
              {isLoading ? 'Processing...' : 'Secure Date with $500 Deposit'}
            </button>
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] text-white hover:bg-[#20bd5a] w-full flex items-center justify-center gap-2 border-none"
            >
              <MessageCircle size={20} />
              Follow up on WhatsApp
            </a>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setDateError('');
                setFormData({
                  name: '', phone: '', email: '', eventType: '', guests: '', date: '', hall: '', message: '',
                  isRecurring: false, recurringType: 'weekly', recurringCount: '2'
                });
              }}
              className="btn btn-outline w-full"
            >
              Submit Another Inquiry
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-burgundy mb-4"
          >
            Book Your Event
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-text-gray max-w-xl mx-auto"
          >
            Fill out the form below to check availability and start planning your unforgettable event.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="booking-card"
        >
          <h3 className="text-lg font-bold text-burgundy mb-6">Check Availability</h3>
          <form onSubmit={handleSubmit}>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
            >
              <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+1 (234) 567-890"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
            >
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="form-label">Event Type</label>
                <select 
                  id="eventType" 
                  name="eventType" 
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" disabled>Select Event Type</option>
                  <option value="Wedding Ceremony">Wedding Ceremony</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-x-6"
            >
              <div>
                <label htmlFor="guests" className="form-label">Guests</label>
                <input 
                  type="number" 
                  id="guests" 
                  name="guests" 
                  required
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="50"
                />
              </div>
              <div>
                <label htmlFor="date" className="form-label">Event Date</label>
                <DatePicker 
                  selected={formData.date ? parseISO(formData.date) : undefined}
                  onSelect={(d) => {
                    setFormData(prev => ({ ...prev, date: d ? format(d, 'yyyy-MM-dd') : '' }));
                    setDateError('');
                  }}
                  minDate={new Date()}
                  disabledDates={bookedDates}
                  hasError={!!dateError}
                />
                {!formData.hall && !formData.date && <p className="text-[#a0aec0] text-xs mt-1">Select a hall first to see available dates.</p>}
                {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
              </div>
              <div>
                <label htmlFor="hall" className="form-label">Preferred Hall</label>
                <select 
                  id="hall" 
                  name="hall" 
                  required
                  value={formData.hall}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="" disabled>Select a Space</option>
                  {halls.map(hall => (
                    <option key={hall.id} value={hall.id}>{hall.name}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
               className="mb-4 bg-gray-50 border border-gray-100 rounded-lg p-5"
            >
               <div className="flex items-center mb-4">
                 <input
                   type="checkbox"
                   id="isRecurring"
                   name="isRecurring"
                   checked={formData.isRecurring}
                   onChange={handleChange}
                   className="w-4 h-4 text-burgundy bg-gray-100 border-gray-300 rounded focus:ring-burgundy"
                 />
                 <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-gray-900">
                   Make this a recurring booking
                 </label>
               </div>
               
               {formData.isRecurring && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label htmlFor="recurringType" className="form-label text-xs">Frequency</label>
                     <select 
                       id="recurringType" 
                       name="recurringType" 
                       value={formData.recurringType}
                       onChange={handleChange}
                       className="form-input py-2"
                     >
                       <option value="daily">Daily</option>
                       <option value="weekly">Weekly</option>
                       <option value="monthly">Monthly</option>
                     </select>
                   </div>
                   <div>
                     <label htmlFor="recurringCount" className="form-label text-xs">Total Occurrences</label>
                     <input 
                       type="number" 
                       id="recurringCount" 
                       name="recurringCount" 
                       min="2"
                       max="50"
                       value={formData.recurringCount}
                       onChange={handleChange}
                       className="form-input py-2"
                     />
                   </div>
                   {formData.date && (
                     <div className="sm:col-span-2 mt-2 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100">
                       <p className="font-semibold mb-1">Booking Schedule:</p>
                       <div className="max-h-24 overflow-y-auto">
                         <ul className="list-disc pl-4 space-y-1">
                           {getRecurringDates().map((d, i) => (
                             <li key={i}>{format(parseISO(d), 'EEEE, MMMM do, yyyy')}</li>
                           ))}
                         </ul>
                       </div>
                     </div>
                   )}
                 </div>
               )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <label htmlFor="message" className="form-label">Message / Special Requests</label>
              <textarea 
                id="message" 
                name="message" 
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="form-input !h-[80px] resize-none"
                placeholder="Tell us more about your event..."
              ></textarea>
            </motion.div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <motion.button 
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              type="submit"
              disabled={isLoading}
              className="btn btn-gold w-full mt-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg font-semibold h-12"
            >
              {isLoading 
                ? 'Processing...' 
                : checkoutParam 
                  ? 'Proceed to Secure Payment' 
                  : 'Submit Inquiry'}
            </motion.button>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 pt-5 border-t border-[#EEE] text-[12px] text-text-gray text-center">
              <p>We typically respond within 2 hours</p>
            </motion.div>
          </form>
        </motion.div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-burgundy">Confirm Booking Details</h3>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-6">
                Please review your event details below. Make sure everything is correct before submitting your inquiry.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Guest Name</span>
                  <span className="font-semibold text-burgundy">{formData.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Email</span>
                  <span className="font-semibold text-burgundy">{formData.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Phone Number</span>
                  <span className="font-semibold text-burgundy">{formData.phone}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Event Type</span>
                  <span className="font-semibold text-burgundy">{formData.eventType}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Expected Guests</span>
                  <span className="font-semibold text-burgundy">{formData.guests}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Event Date{formData.isRecurring ? 's' : ''}</span>
                  <span className="font-semibold text-burgundy text-right">
                    {formData.date ? (
                      formData.isRecurring ? (
                        <div className="flex flex-col items-end">
                          <span className="mb-1">{getRecurringDates().length} occurrences ({formData.recurringType}):</span>
                          <span className="text-xs text-gray-500 max-h-24 overflow-y-auto pl-4 text-right">
                            {getRecurringDates().map((d, i) => (
                              <div key={i}>{format(parseISO(d), 'MMM do, yyyy')}</div>
                            ))}
                          </span>
                        </div>
                      ) : (
                        format(parseISO(formData.date), 'MMMM do, yyyy')
                      )
                    ) : ''}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium">Preferred Hall</span>
                  <span className="font-semibold text-burgundy">
                    {halls.find(h => h.id === formData.hall)?.name || formData.hall}
                  </span>
                </div>
                {formData.message && (
                  <div className="flex flex-col py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm font-medium mb-1">Additional Message</span>
                    <span className="text-sm text-burgundy bg-gray-50 p-2 rounded">{formData.message}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end items-center border-t border-gray-100">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back & Edit
              </button>
              <button 
                onClick={processSubmission}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-burgundy hover:bg-burgundy-light rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {checkoutParam ? 'Confirm & Proceed to Payment' : 'Confirm Application'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
