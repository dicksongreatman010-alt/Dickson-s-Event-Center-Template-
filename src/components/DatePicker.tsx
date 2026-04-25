import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabledDates?: Date[];
  minDate?: Date;
  className?: string;
  hasError?: boolean;
}

export function DatePicker({ selected, onSelect, disabledDates = [], minDate, className = "", hasError = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set disabled logic
  const disabledDays = [
    ...(minDate ? [{ before: minDate }] : []),
    ...disabledDates
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`form-input flex items-center justify-between w-full text-left bg-white
          ${!selected ? 'text-text-gray' : 'text-navy'}
          ${hasError ? '!border-red-500 focus:!border-red-500 focus:!ring-red-500' : ''}
        `}
      >
        {selected ? format(selected, 'PPP') : <span>Pick a date</span>}
        <CalendarIcon className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#E2E8F0] shadow-lg rounded-xl p-3">
          <style>
            {`
              .rdp {
                margin: 0;
                --rdp-cell-size: 36px;
                --rdp-accent-color: #C5A059;
                --rdp-background-color: #F8F9FA;
              }
              .rdp-day_selected {
                background-color: var(--rdp-accent-color) !important;
                color: white;
                font-weight: bold;
              }
              .rdp-day_selected:hover {
                background-color: #B59049 !important;
              }
              .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: var(--rdp-background-color);
                color: #002349;
              }
              .rdp-day_disabled {
                text-decoration: line-through;
                opacity: 0.3;
              }
            `}
          </style>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(d) => {
              onSelect(d);
              setIsOpen(false);
            }}
            disabled={disabledDays}
            modifiers={{ booked: disabledDates }}
            modifiersStyles={{
              booked: { textDecoration: 'line-through', opacity: 0.3 }
            }}
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
}
