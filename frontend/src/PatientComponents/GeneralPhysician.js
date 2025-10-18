import React, { useState, useEffect } from "react";
import "./Timeslot.css";
import { API_BASE_URL } from "../config";
import axios from "axios";

const GeneralPhysician = ({ onBack, patientData, selectedDoctor }) => {
  const [shift, setShift] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split("T")[0];

  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const formattedLastDay =
    lastDayOfMonth.getFullYear() +
    "-" +
    String(lastDayOfMonth.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(lastDayOfMonth.getDate()).padStart(2, "0");

  useEffect(() => {
    if (!shift || !selectedDate) return;

    const fetchSlots = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/patients/getAvailableSlots`, {
          params: {
            date: selectedDate,
            shift,
            doctor: selectedDoctor.name,
          },
        });
        setAvailableSlots(data.availableSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots(0);
      }
    };

    fetchSlots();
  }, [shift, selectedDate, selectedDoctor]);

  const handleBookAppointment = async () => {
    if (!shift || !selectedDate) return;

    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Please login first");
      return;
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/patients/register`, {
        name: patientData.name,
        gender: patientData.gender,
        age: patientData.age,
        phone: patientData.phone,
        selectedDoctor: selectedDoctor.name,
        shift,
        date: selectedDate,
        email,
      });

      if (data.success) {
        setAppointmentConfirmed(true);
        setAvailableSlots((prevSlots) => (prevSlots > 0 ? prevSlots - 1 : 0));
      }
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to book appointment");
    }
  };

  return (
    <div className="timeslot-container">
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>← Back</button>
      </div>

      {appointmentConfirmed ? (
        <div className="confirmation-container">
          <h2>
            Your appointment was confirmed.<br /> Please check your mail. ✅
          </h2>
          <button className="ok-button" onClick={() => window.location.reload()}>OK</button>
        </div>
      ) : (
        <>
          {!shift ? (
            <>
              <h1>Select a Shift 🕒</h1>
              <button className="shift-button" onClick={() => setShift("morning")}>
                Morning Shift (9 AM - 3 PM)
              </button>
              <button className="shift-button" onClick={() => setShift("evening")}>
                Evening Shift (5 PM - 10 PM)
              </button>
            </>
          ) : (
            <>
              <h1>Book Your Appointment 📅</h1>
              <h2>
                Selected Shift: {shift === "morning" ? "Morning (9 AM - 3 PM)" : "Evening (5 PM - 10 PM)"}
              </h2>

              <div className="form-container">
                <h2>Select Date:</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={formattedTomorrow}
                  max={formattedLastDay}
                />
              </div>

              <div className="availability-container">
                <span className="availability-text"><h2>Available Slots:</h2></span>
                <span className="slot-count">
                  {availableSlots !== null ? (
                    availableSlots > 0 ? (
                      <>
                        <span className="blinking-dot">🟢</span> {availableSlots} left
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
        </>
      )}
    </div>
  );
};

export default GeneralPhysician;
