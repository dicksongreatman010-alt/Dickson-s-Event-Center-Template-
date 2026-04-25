import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { format, parseISO } from 'date-fns';
import { RefreshCw, Search, CheckCircle, Clock, XCircle, CreditCard, ChevronDown, Lock } from 'lucide-react';
import { getAllBookings, updateBookingStatus, Booking } from '../services/bookingService';
import { halls } from '../data/content';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setAuthError(error.message);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    const data = await getAllBookings();
    setBookings(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchBookings();

      const bookingSubscription = supabase
        .channel('public:bookings')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'bookings' },
          (payload) => {
            console.log('Real-time data received:', payload);
            if (payload.eventType === 'INSERT') {
              setBookings((current) => [payload.new as Booking, ...current]);
            } else if (payload.eventType === 'UPDATE') {
              setBookings((current) =>
                current.map((booking) =>
                  booking.id === payload.new.id ? (payload.new as Booking) : booking
                )
              );
            } else if (payload.eventType === 'DELETE') {
              setBookings((current) =>
                current.filter((booking) => booking.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(bookingSubscription);
      };
    }
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const success = await updateBookingStatus(id, newStatus);
    if (success) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } else {
      alert("Failed to update status. Please check your Supabase permissions.");
    }
    setUpdatingId(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'deposit_paid': return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'deposit_paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guest_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.guest_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      halls.find(h => h.id === booking.hall_id)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3 text-navy">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="font-medium">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-navy/5 flex items-center justify-center rounded-full text-navy">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-navy mb-2">Admin Login</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Sign in to manage venue bookings</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {authError}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy text-white font-medium py-2.5 rounded-lg hover:bg-navy-light transition-colors disabled:opacity-70 mt-4 flex justify-center items-center"
            >
              {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8 mt-4">
          <div>
            <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
            <p className="text-text-gray mt-1 text-sm">Manage venue bookings and inquiries</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={fetchBookings}
              className="flex items-center space-x-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <label htmlFor="searchBookings" className="sr-only">Search bookings</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="searchBookings"
              type="text"
              placeholder="Search by guest, email, or hall..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm transition-shadow"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-64">
            <label htmlFor="statusFilter" className="sr-only">Filter by status</label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm rounded-lg bg-white transition-shadow"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="deposit_paid">Deposit Paid</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Hall</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest Info</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Details</th>
                  <th scope="col" className="px-6 py-4 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading && bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                      Loading bookings...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                      No bookings found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={booking.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-navy">
                          {booking.event_date ? format(parseISO(booking.event_date), 'MMM dd, yyyy') : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {halls.find(h => h.id === booking.hall_id)?.name || booking.hall_id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.guest_name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{booking.guest_email || 'No email provided'}</div>
                        <div className="text-sm text-gray-500">{booking.guest_phone || 'No phone provided'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 capitalize">{booking.event_type?.replace('-', ' ') || 'Event'}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {booking.guests_count || 'Unspecified'} Guests
                        </div>
                        {booking.created_at && (
                          <div className="text-[11px] text-gray-400 mt-2">
                            Booked: {format(parseISO(booking.created_at), 'PP p')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusClass(booking.status)}`}>
                          <span className="mr-1.5">{getStatusIcon(booking.status)}</span>
                          <span className="capitalize">{booking.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left w-full sm:w-40">
                          <label htmlFor={`status-update-${booking.id}`} className="sr-only">Update status for booking by {booking.guest_name}</label>
                          <select
                            id={`status-update-${booking.id}`}
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            disabled={updatingId === booking.id}
                            className={`block w-full pl-3 pr-8 py-1.5 text-xs font-semibold border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold rounded-md bg-gray-50 border shadow-sm transition-all ${
                              updatingId === booking.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white'
                            }`}
                          >
                            <option value="pending">Mark Pending</option>
                            <option value="deposit_paid">Mark Deposit Paid</option>
                            <option value="confirmed">Mark Confirmed</option>
                            <option value="cancelled">Mark Cancelled</option>
                          </select>
                          {updatingId === booking.id && (
                            <div className="absolute inset-y-0 right-7 flex items-center pointer-events-none">
                              <RefreshCw className="w-3 h-3 text-gold animate-spin" />
                            </div>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
