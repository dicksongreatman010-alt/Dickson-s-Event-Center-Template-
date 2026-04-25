import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function BookingSuccess() {
  return (
    <div className="w-full py-12 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="booking-card"
        >
          <div className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-navy mb-4">Payment Successful!</h2>
          <p className="text-text-gray mb-8 leading-relaxed">
            Thank you! Your deposit has been received and your event date is now officially secured. You will receive a receipt via email shortly.
          </p>
          <Link 
            to="/"
            className="btn btn-gold w-full"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
