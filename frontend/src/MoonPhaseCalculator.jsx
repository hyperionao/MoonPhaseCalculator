import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useState } from 'react';

function MoonPhaseCalculator() {
  const phasesToEmojis = new Map([
    ["New", "🌑"],
    ["Evening Crescent", "🌒"],
    ["First Quarter", "🌓"],
    ["Waxing Gibbous", "🌔"],
    ["Full", "🌕"],
    ["Waning Gibbous", "🌖"],
    ["Last Quarter", "🌗"],
    ["Morning Crescent", "🌘"],
  ]);

  const [moonPhase, setMoonPhase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timeValue, setTimeValue] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [resultDate, setResultDate] = useState(null);
  const [resultTime, setResultTime] = useState(null);

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

  // Fetch Data from API
  const fetchMoonPhase = () => {
    if (!selectedDate) return;
    setLoading(true);

    const formattedDateTime = formatDateTime(selectedDate, timeValue);
    const apiUrl = `http://localhost:8080/api/moonphase/datetime/${formattedDateTime}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch moon phase data");
        }
        return response.json();
      })
      .then((data) => {
        setMoonPhase(data);
        setLoading(false);

        setResultDate(selectedDate);
        setResultTime(timeValue);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };

  const handleDaySelect = (date) => {
    setSelectedDate(date);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-8">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Left: Moon Phase Graphic */}
        <div className="lg:w-1/2 flex justify-center align-middle">
          <h1 style={{ fontSize: "20rem", padding: "20px", textShadow: "0 0 10px #000000" }}>
            {phasesToEmojis.get(moonPhase?.phaseName) || "🌕"}
          </h1>
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2 grid gap-8">
          {/* Title */}
          <div>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-100 md:text-3xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500">
                Moon Phase Calculator
              </span>
            </h1>
          </div>

          {/* Moon Phase Details */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            {resultDate && resultTime ? (
              <>
                <p className="text-gray-300">
                  Selected Date: <strong>{resultDate.toLocaleDateString()}</strong> at{" "}
                  <strong>{resultTime}</strong>
                </p>
                <p className="text-gray-300 mt-2">
                  The moon was in the <strong>{moonPhase.phaseName}</strong> phase.
                </p>
                <p className="text-gray-300 mt-2">
                  At this point in its lunar cycle, the moon was{" "}
                  <strong>{moonPhase.age?.toFixed(2)}</strong> days old and appeared{" "}
                  <strong>{(moonPhase.fraction * 100)?.toFixed(1)}%</strong> illuminated.
                </p>
                <p className="text-gray-300 mt-2">
                  It's distance from Earth was about <strong>{moonPhase.distance?.toFixed(4)} Earth radii</strong>. Astrologically, the moon was in the sign of <strong>{moonPhase.zodiacSign}</strong>. It's Ecliptical longitude was <strong>{moonPhase.longitude.toFixed(4)}°</strong> and it's latitude was <strong>{moonPhase.latitude.toFixed(4)}°</strong>.
                </p>
              </>
            ) : (
              <p className="text-gray-300"><strong>Press "Calculate" to see results.</strong></p>
            )}
          </div>

          {/* Calendar and Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Calendar */}
            <div>
              <DayPicker
                className="p-4 bg-gray-800 rounded-lg shadow-md text-white max-w-sm"
                mode="single"
                selected={selectedDate}
                onSelect={handleDaySelect}
                styles={{
                  day_selected: { backgroundColor: '#9362D1', color: '#fff' },
                  nav_button: { color: '#ff5722' },
                }}
                captionLayout="dropdown"
                showOutsideDays
                fromYear={1900}
                toYear={2100}
                footer={
                  selectedDate
                    ? `You picked ${selectedDate.toLocaleDateString()} at ${timeValue}.`
                    : 'Please pick a day.'
                }
              />
            </div>

            {/* Time Input and Buttons */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <form className="flex flex-col gap-4">
                <label htmlFor="time-input" className="text-gray-300">
                  <strong>Set the time:</strong>
                </label>
                <input
                  id="time-input"
                  type="time"
                  value={timeValue}
                  onChange={handleTimeChange}
                  className="bg-gray-700 text-white rounded px-4 py-2"
                />
              </form>
              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={fetchMoonPhase}
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Calculate Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoonPhaseCalculator;
