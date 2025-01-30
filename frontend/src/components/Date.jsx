import React, { useState, useEffect } from 'react';

const DateComponent = () => {
  // State to hold the current date and the selected date
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Set the current date when the component mounts
  useEffect(() => {
    const date = new Date();
    // Format current date to "YYYY-MM-DD"
    const formattedDate = date.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  // Handle the change when user selects a date
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h1>Current Date</h1>
      <p>Today's Date: {currentDate}</p>

      <h2>Choose a Date</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {selectedDate && (
        <p>You selected: {selectedDate}</p>
      )}
    </div>
  );
};

export default DateComponent;
