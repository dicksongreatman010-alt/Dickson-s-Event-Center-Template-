import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { halls } from '../data/content';

export default function Booking() {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    guests: '',
    date: '',
    hall: '',
    message: ''
  });

  // Pre-select hall if passed in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hallParam = params.get('hall');
    if (hallParam) {
      setFormData(prev => ({ ...prev, hall: hallParam }));
    }
  }, [location]);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'date') {
      if (value && value < today) {
        setDateError('Please select a future date for your event.');
      } else {
        setDateError('');
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.date && formData.date < today) {
      setDateError('Please select a future date for your event.');
      return;
    }
    
    // Simulate sending email (in a real app, this would be an API call)
    console.log('Form submitted:', formData);
    
    // Show success message
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    const selectedHallName = halls.find(h => h.id === formData.hall)?.name || formData.hall;
    const waMessage = `New Booking Inquiry%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AEvent: ${formData.eventType}%0AGuests: ${formData.guests}%0ADate: ${formData.date}%0AHall: ${selectedHallName}%0AMessage: ${formData.message}`;
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
          <h2 className="text-2xl font-bold text-navy mb-4">Inquiry Sent!</h2>
          <p className="text-text-gray text-sm mb-8 leading-relaxed">
            Thank you for choosing Eko Grandeur. We have received your booking inquiry and will get back to you shortly.
          </p>
          <div className="space-y-3">
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
                  name: '', phone: '', email: '', eventType: '', guests: '', date: '', hall: '', message: ''
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
            className="text-3xl md:text-4xl font-bold text-navy mb-4"
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
          <h3 className="text-lg font-bold text-navy mb-6">Check Availability</h3>
          <form onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
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
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  required
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={`form-input ${dateError ? '!border-red-500 focus:!border-red-500 focus:!ring-red-500' : ''}`}
                />
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
            </div>

            <div>
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
            </div>

            <button 
              type="submit"
              className="btn btn-gold w-full mt-2"
            >
              Submit Inquiry
            </button>
            <div className="mt-6 pt-5 border-t border-[#EEE] text-[12px] text-text-gray text-center">
              <p>We typically respond within 2 hours</p>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
