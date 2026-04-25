import { addDays, format } from 'date-fns';

// Generate some random booked dates from today
const generateBookedDates = () => {
  const dates = [];
  const today = new Date();
  
  // Randomly book some dates in the next 60 days
  for (let i = 0; i < 20; i++) {
    const randomDays = Math.floor(Math.random() * 60) + 1;
    dates.push(addDays(today, randomDays));
  }
  return dates;
};

// We will mock unique booked dates for each hall
export const hallAvailability: Record<string, Date[]> = {
  'grand-ballroom': generateBookedDates(),
  'sapphire-hall': generateBookedDates(),
  'emerald-lounge': generateBookedDates(),
};

export const checkIsBooked = (hallId: string, date: Date) => {
  if (!hallId) return false;
  const bookedDates = hallAvailability[hallId] || [];
  const dateStr = format(date, 'yyyy-MM-dd');
  return bookedDates.some(d => format(d, 'yyyy-MM-dd') === dateStr);
};
