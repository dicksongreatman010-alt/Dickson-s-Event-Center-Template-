import { supabase } from '../lib/supabase';
import { parseISO, format } from 'date-fns';

export interface Booking {
  id: string;
  hall_id: string;
  event_date: string;
  status: string;
}

export async function getBookedDatesForHall(hallId: string): Promise<Date[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('event_date')
      .eq('hall_id', hallId)
      .in('status', ['confirmed', 'deposit_paid', 'pending']);
      
    if (error) {
      console.error('Error fetching booked dates from Supabase:', error);
      return [];
    }

    if (data) {
      // Map the ISO date strings to actual Date objects
      return data.map(booking => parseISO(booking.event_date));
    }
    
    return [];
  } catch (error) {
    console.error('Unexpected error fetching availability:', error);
    return [];
  }
}

export async function createBookingInquiry(bookingData: any) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          hall_id: bookingData.hall,
          event_date: bookingData.date,
          status: 'pending',
          guest_name: bookingData.name,
          guest_email: bookingData.email,
          guest_phone: bookingData.phone,
          event_type: bookingData.eventType,
          guests_count: parseInt(bookingData.guests, 10),
          message: bookingData.message
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating booking inquiry:', error);
    throw error;
  }
}
