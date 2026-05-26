import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { updateBookingStatus } from '../services/bookingService';
import { CheckCircle, CreditCard, Copy, Info } from 'lucide-react';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount') || '0';
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    bankName: "Guaranty Trust Bank (GTB)",
    accountName: "Royal Events & Gaming",
    accountNumber: "0123456789"
  };

  useEffect(() => {
    if (!bookingId) {
      navigate('/');
    }
  }, [bookingId, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmed = async () => {
    if (!bookingId) return;
    setIsSubmitting(true);
    try {
      const success = await updateBookingStatus(bookingId, 'awaiting_verification');
      if (success) {
        navigate('/booking-success?type=payment_verifying');
      } else {
        alert("There was an error updating your status. Please contact support.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error updating your status.");
      setIsSubmitting(false);
    }
  };

  if (!bookingId) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 pt-32">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard className="w-24 h-24" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 relative z-10">Secure Your Booking</h2>
          <p className="text-slate-300 relative z-10">Please make a deposit to confirm</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <p className="text-sm text-slate-500 mb-1">Amount Due</p>
            <p className="text-4xl font-bold text-slate-900 font-mono">₦{parseInt(amount).toLocaleString()}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Bank Transfer Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Bank Name</p>
                <p className="font-medium text-slate-900">{bankDetails.bankName}</p>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 mb-1">Account Name</p>
                <p className="font-medium text-slate-900">{bankDetails.accountName}</p>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 mb-1">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xl font-bold text-slate-900">{bankDetails.accountNumber}</p>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600"
                    title="Copy Account Number"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-8 p-4 bg-blue-50 text-blue-800 rounded-lg">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Please transfer the amount above to the provided account. Once completed, click the button below to notify our admin.
            </p>
          </div>

          <button
            onClick={handlePaymentConfirmed}
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                I Have Made Payment
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
