import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Trophy, Flag, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, isSameMonth, isSameDay, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import { getAllBookings, Booking } from '../services/bookingService';
import { supabase } from '../lib/supabase';
import { halls } from '../data/content';

const tracks = [
  { id: 'neon-run', name: 'Neon Run' },
  { id: 'cyber-drift', name: 'Cyber Drift' },
  { id: 'gravity-drop', name: 'Gravity Drop' },
];
const consoles = [
  { id: 'ps5', name: 'PlayStation 5'},
  { id: 'xbox', name: 'Xbox Series X' },
  { id: 'pc', name: 'Pro PC Rig' },
  { id: 'vip', name: 'VIP Room' },
];

const getVenueName = (id: string, type?: string) => {
  const hall = halls.find(h => h.id === id);
  if (hall) return hall.name;
  const track = tracks.find(t => t.id === id);
  if (track) return track.name;
  const cons = consoles.find(c => c.id === id);
  if (cons) return cons.name;
  return id;
};

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getAllBookings();
      setBookings(data);
    };
    fetchBookings();

    const sub = supabase.channel('calendar_bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, fetchBookings)
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate))
  });

  const getEventsForDay = (date: Date) => {
    return bookings.filter(b => b.event_date && isSameDay(parseISO(b.event_date), date)).map(b => {
      let type = 'hall';
      if (b.event_type === 'gaming') type = 'gaming';
      if (b.event_type === 'hoverboard') type = 'race';
      
      const title = `${getVenueName(b.hall_id)} Booked`;
      return { date: parseISO(b.event_date), type, title };
    });
  };

  const handleDayClick = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    navigate(`/booking?date=${formattedDate}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-burgundy font-serif flex items-center gap-2">
          <CalendarIcon size={20} className="text-gold" />
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysInMonth.map((day, idx) => {
            const events = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);

            return (
              <div 
                key={idx}
                onClick={() => handleDayClick(day)}
                className={`min-h-[60px] sm:min-h-[100px] p-1 sm:p-2 border rounded-xl cursor-pointer hover:border-gold hover:shadow-md transition-all flex flex-col items-start active:scale-95 group
                  ${isCurrentMonth ? 'bg-white border-gray-100' : 'bg-gray-50 border-transparent opacity-50 hover:opacity-100'}
                  ${isCurrentDay ? 'ring-1 sm:ring-2 ring-gold ring-offset-1 sm:ring-offset-2' : ''}
                `}
              >
                <div className="flex justify-between w-full items-center mb-1">
                  <span className={`text-[10px] sm:text-sm font-bold group-hover:text-gold transition-colors ${isCurrentDay ? 'text-burgundy' : 'text-gray-600'}`}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="flex-1 w-full space-y-1 overflow-hidden mt-1">
                  {events.map((event, i) => (
                    <div 
                      key={i} 
                      className={`text-[8px] sm:text-[10px] w-full truncate px-1 sm:px-1.5 py-0.5 rounded flex items-center gap-1 ${
                        event.type === 'hall' ? 'bg-burgundy/10 text-burgundy' :
                        event.type === 'gaming' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}
                      title={event.title}
                    >
                      {event.type === 'hall' && <MapPin size={8} className="hidden sm:block shrink-0" />}
                      {event.type === 'gaming' && <Trophy size={8} className="hidden sm:block shrink-0" />}
                      {event.type === 'race' && <Flag size={8} className="hidden sm:block shrink-0" />}
                      <span className="truncate hidden sm:inline">{event.title}</span>
                      <span className="truncate sm:hidden">{event.type === 'hall' ? 'Hall' : event.type === 'gaming' ? 'Gaming' : 'Race'}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3 sm:gap-6 items-center justify-center text-[10px] sm:text-xs text-gray-500 font-medium">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-burgundy/20 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-burgundy"></div></div> Hall Bookings</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-purple-200 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div></div> Gaming Tournaments</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-200 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div></div> Race Days</div>
      </div>
    </div>
  );
}
