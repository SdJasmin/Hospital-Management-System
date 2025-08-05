import React, { useState, useEffect } from "react";
import "./Timeslot.css";

const Cardiologist = ({ onBack, patientData, selectedDoctor, onComplete }) => {
  const [shift, setShift] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(null);
  const today = new Date();
  const firstDayOfMonth = today.toISOString().split("T")[0]; 
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const formattedLastDay = lastDayOfMonth.getFullYear() +
  "-" +
  String(lastDayOfMonth.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(lastDayOfMonth.getDate()).padStart(2, "0");

  useEffect(() => {
    if (!shift || !selectedDate) return;
  
    const fetchSlots = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/getAvailableSlots?date=${selectedDate}&shift=${shift}&doctor=${selectedDoctor}`
        );
        const data = await response.json();
        setAvailableSlots(data.availableSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots(0);
      }
    };
    
    fetchSlots();
  }, [shift, selectedDate, selectedDoctor]);
  
  const handleBookAppointment = async () => {
    if (!shift) return setPopupMessage("Please select a shift.");
    if (!selectedDate) return setPopupMessage("Please select a date.");

    const email = localStorage.getItem("userEmail");
    if (!email) {
      setPopupMessage("User email not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/patients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientData.name,
          gender: patientData.gender,
          age: patientData.age,
          phone: patientData.phone,
          selectedDoctor: selectedDoctor.name,
          shift,
          date: selectedDate,
          email,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        
        setConfirmation(true);
        setAvailableSlots((prevSlots) => (prevSlots > 0 ? prevSlots - 1 : 0));
      } else {
        setPopupMessage(responseData.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error:", error);
      setPopupMessage("An error occurred while booking the appointment.");
    }
  };

  if (confirmation) {
    return (
      <div className="confirmation-container">
        <h1>Your appointment was booked! ✅</h1>
        <p>Please check your email for details.</p>
        <button className="ok-button" onClick={onComplete}>OK</button>
      </div>
    );
  }

  return (
    <div className="timeslot-container">
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>← Back</button>
      </div>

      {popupMessage && (
        <div className="popup-container">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage("")}>OK</button>
          </div>
        </div>
      )}

      {!shift ? (
        <>
          <h1>Select a Shift 🕒</h1>
          <button className="shift-button" onClick={() => setShift("morning")}>
            Morning Shift (9 AM - 2PM)
          </button>
          <button className="shift-button" onClick={() => setShift("evening")}>
            Evening Shift (4 PM - 9 PM)
          </button>
        </>
      ) : (
        <>
          <h1>Book Your Appointment 📅</h1>
          <h2>Selected Shift: {shift === "morning" ? "Morning (9 AM - 2 PM)" : "Evening (4 PM - 9 PM)"}</h2>

          <div className="form-container">
            <h2>Select Date:</h2>
            <input
  type="date"
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  min={firstDayOfMonth}
  max={formattedLastDay} // Ensures last day of month is included
/>

          </div>

          <div className="availability-container">
           <br>
           </br><br></br> <span className="availability-text"><h2>Available Slots:</h2></span>
            <span className="slot-count">
              {availableSlots !== null ? (
                availableSlots > 0 ? (
                  <>
                    <span className="blinking-dot">🟢</span> {availableSlots}
                  </>
                ) : (
                  "❌ No Slots Available"
                )
              ) : (
                " Loading..."
              )}
            </span>
          </div>

          <button className="confirm-button" onClick={handleBookAppointment}>
            Book Appointment
          </button>
        </>
      )}
    </div>
  );
};

export default Cardiologist;
