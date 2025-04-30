import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarSection = ({ predictionDates, selectedDate, onDateChange }) => (
  <div className="p-4 bg-white rounded shadow-md w-1/2">
    <h2 className="text-lg font-semibold mb-4" style={{ color: '#4A5565' }}>Calendrier des Prédictions</h2>
    <Calendar
      onChange={onDateChange}
      value={selectedDate}
      tileClassName={({ date, view }) => {
        if (predictionDates.some((d) => d.toDateString() === date.toDateString())) {
          return 'bg-red-500 text-white';
        }
        return null;
      }}
      className="w-full"
    />
  </div>
);

export default CalendarSection;
