import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useState, useEffect } from 'react';


function MoonPhaseCalculator() {
    const [moonPhase, setMoonPhase] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [timeValue, setTimeValue] = useState("12:00");
      const [selectedDate, setSelectedDate] = useState(null);
    
      const currentDate = new Date();
      const default_hour_minute_second = "T12:00:00"; // Default to noon UTC
      const default_values = {
        year: currentDate.getUTCFullYear(),
        month: currentDate.getUTCMonth() + 1,
        day: currentDate.getUTCDate(),
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
    
      const formatDate = (date) => {
        if (!date) return "";
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
    
      const formatDateTime = (date, time) => {
        if (!date || !time) return "";
        const formattedDate = formatDate(date);
        return `${formattedDate}T${time}:00`;
      };
    
      const handleTimeChange = (e) => {
        const time = e.target.value;
        setTimeValue(time);
    
        if (!selectedDate) {
          return;
        }
    
        const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
        const utcDate = new Date(Date.UTC(
          selectedDate.getUTCFullYear(),
          selectedDate.getUTCMonth(),
          selectedDate.getUTCDate(),
          hours,
          minutes
        ));
        setSelectedDate(utcDate);
      };
    
      const handleDaySelect = (date) => {
        if (!date) {
          setSelectedDate(null);
          return;
        }
    
        const [hours, minutes] = timeValue.split(":").map((str) => parseInt(str, 10));
        const utcDate = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hours,
          minutes
        ));
        setSelectedDate(utcDate);
      };
    
      const callAPI_NOTIME = (formattedDate) => {
        if (!formattedDate) {
          alert("Please select a date first!");
          return;
        }
    
        const apiUrl = `http://localhost:8080/api/moonphase/date/${formattedDate}`;
        console.log("Calling API without time:", apiUrl);
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch moon phase data");
            }
            return response.json();
          })
          .then((data) => {
            console.log("API Response:", data);
            setMoonPhase(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      };
    
      const callAPI_WTIME = (formattedDateTime) => {
        if (!formattedDateTime) {
          alert("Please select a date and time first!");
          return;
        }
    
        const apiUrl = `http://localhost:8080/api/moonphase/datetime/${formattedDateTime}`;
        console.log("Calling API with time:", apiUrl);
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch moon phase data");
            }
            return response.json();
          })
          .then((data) => {
            console.log("API Response:", data);
            setMoonPhase(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      };
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <div>
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
                  <button onClick={() => callAPI_NOTIME(formatDate(selectedDate))}>Select Date</button>
                  <button onClick={() => callAPI_WTIME(formatDateTime(selectedDate, timeValue))}>Select Date with Time</button>
        </div>
      );
}

export default MoonPhaseCalculator;