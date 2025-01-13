import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setHours, setMinutes } from 'date-fns';

function App() {
  const [moonPhase, setMoonPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeValue, setTimeValue] = useState("00:00");
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();
  const default_hour_minute_second = "T12:00:00";
  const default_values = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  useEffect(() => {
    const api_call = `http://localhost:8080/api/moonphase/datetime/${default_values.year}-${String(default_values.month).padStart(2, "0")}-${String(default_values.day).padStart(2, "0")}${default_hour_minute_second}`;
    console.log("API Call URL:", api_call);

    fetch(api_call)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch moon phase data');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Moon Phase Data:", data);
        setMoonPhase(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setTimeValue(time);

    if (!selectedDate) {
      return;
    }

    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedDate, minutes), hours);
    setSelectedDate(newSelectedDate);
  };

  const handleDaySelect = (date) => {
    if (!date) {
      setSelectedDate(date);
      return;
    }

    const [hours, minutes] = timeValue.split(":").map((str) => parseInt(str, 10));
    const newDate = setHours(setMinutes(date, minutes), hours);
    setSelectedDate(newDate);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <h1>Moon Phase Calculator</h1>
      {moonPhase ? (
        <div>
          <p><strong>Phase Name:</strong> {moonPhase.phaseName}</p>
          <p><strong>Zodiac Sign:</strong> {moonPhase.zodiacSign}</p>
          <p><strong>Illumination Fraction:</strong> {moonPhase.fraction.toFixed(2)}</p>
          <p><strong>Julian Date:</strong> {moonPhase.julianDate}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
      <form style={{ marginBlockEnd: "1em" }}>
        <label htmlFor="time-input">
          Set the time:
          <input
            id="time-input"
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            style={{ marginLeft: "0.5em" }}
          />
        </label>
      </form>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        styles={{
          day_selected: { backgroundColor: '#4682b4', color: '#fff' },
          nav_button: { color: '#ff5722' },
        }}
        captionLayout="dropdown"
        showOutsideDays
        footer={
          selectedDate
            ? `You picked ${selectedDate.toLocaleDateString()} at ${timeValue}.`
            : 'Please pick a day.'
        }
      />
      <button>Select Date</button>
      <button>Select Date and Time</button>
      <Footer />
    </div>
  );
}

export default App;
