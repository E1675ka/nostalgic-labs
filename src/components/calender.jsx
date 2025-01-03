// CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  // Import styles

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container ">
      <h2>Get A Quote</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="bg-slate-500 rounded-xl m"
      />
      <div>
        <p>Selected date: {date.toDateString()}</p>
      </div>
      
    </div>
    
  );
};

export default CalendarComponent;
