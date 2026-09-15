import React, { useMemo, useState } from 'react';
import { Modal } from './Modal';

const WHATSAPP_NUMBER = "918884972272";

interface DayOption {
  weekday: string;
  date: string;
  month: string;
  full: string;
}

const TIME_SLOTS = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM"];

function getUpcomingWeekdays(count: number): DayOption[] {
  const days: DayOption[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push({
        weekday: cursor.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: String(cursor.getDate()).padStart(2, '0'),
        month: cursor.toLocaleDateString('en-US', { month: 'short' }),
        full: cursor.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({ isOpen, onClose }) => {
  const days = useMemo(() => getUpcomingWeekdays(4), []);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');

  const ready = selectedTime !== null && name.trim().length > 0;

  const hint = !selectedTime
    ? "Pick a day and time to continue."
    : name.trim().length === 0
      ? "Add your name to confirm."
      : "You're all set — confirm below.";

  const handleConfirm = () => {
    if (!ready || selectedTime === null) return;
    const day = days[selectedDay];
    const message = `Hi Khosha Systems, I'd like to book a 15-minute demo.\n\nDay: ${day.full}\nTime: ${selectedTime} IST\nName: ${name.trim()}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Book a 15-minute demo">
      <span className="text-[11px] sm:text-xs font-semibold text-bronze-600 uppercase tracking-widest mb-2 block">
        15-Minute Demo
      </span>
      <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-3 leading-snug">
        Pick a time that works for you.
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed mb-6">
        Weekdays, 12:00–3:00 PM IST, over the next week. We walk you through our products on a quick call — no slides, just the product.
      </p>

      <div className="mb-5">
        <span className="block text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-2.5">
          1 · Choose a Day
        </span>
        <div className="grid grid-cols-4 gap-2">
          {days.map((day, i) => {
            const isSelected = i === selectedDay;
            return (
              <button
                key={day.full}
                type="button"
                onClick={() => setSelectedDay(i)}
                className={`rounded-lg py-2.5 text-center transition-colors border ${
                  isSelected
                    ? 'bg-bronze-600 border-bronze-600 text-white'
                    : 'bg-stone-50 border-stone-200 text-stone-500 hover:border-bronze-300'
                }`}
              >
                <span className={`block text-[9px] font-semibold uppercase tracking-wide ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                  {day.weekday}
                </span>
                <span className="block text-base font-serif font-bold leading-tight">{day.date}</span>
                <span className={`block text-[9px] uppercase tracking-wide ${isSelected ? 'text-white/70' : 'text-stone-400'}`}>
                  {day.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <span className="block text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-2.5">
          2 · Choose a Time (IST)
        </span>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = slot === selectedTime;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`rounded-lg py-2.5 text-xs sm:text-sm font-medium text-center transition-colors border ${
                  isSelected
                    ? 'bg-bronze-600 border-bronze-600 text-white'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-bronze-300'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <span className="block text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-2.5">
          3 · Your Name
        </span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-800 focus:border-bronze-400 focus:outline-none transition-colors placeholder:text-stone-400"
        />
      </div>

      <div className="bg-bronze-50 border border-bronze-100 rounded-lg px-4 py-2.5 text-xs text-bronze-700 mb-4">
        {hint}
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!ready}
        className={`w-full flex items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-medium uppercase tracking-wider transition-colors ${
          ready
            ? 'bg-[#128C7E] text-white hover:bg-[#0f7466]'
            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
        }`}
      >
        <WhatsAppIcon />
        Confirm on WhatsApp
      </button>
      <p className="text-stone-400 text-[11px] text-center mt-3 leading-relaxed">
        Opens WhatsApp with your slot pre-filled. Send the message and we'll confirm your demo.
      </p>
    </Modal>
  );
};
