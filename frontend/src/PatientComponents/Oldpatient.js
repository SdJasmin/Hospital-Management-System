import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./Timeslot.css"; 

const OldPatient = ({ onBack, onComplete }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Success message state

  const handleVerify = async () => {
    if (!serialNumber.trim()) {
      alert("Please enter a valid Serial Number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/patients/verify`, { serialNumber });


      if (response.data.verified) {
        setMessage("Verification successful!"); // Show success message
        setTimeout(() => {
          setMessage(""); // Hide message after delay
          onComplete(); // Call onComplete function
        }, 2000);
      } else {
        alert("Invalid Serial Number. Please try again.");
      }
    } catch (error) {
      alert("Error verifying Serial Number. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="old-patient-page">
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="old-patient-container">
        <h1>Old Patient Verification</h1>
        <label className="patient-label">Enter Serial Number:</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          placeholder="Enter your Serial Number"
          required
        />
        <div className="verify-container">
          <button className="verify-button" onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
        {message && <div className="success-popup">{message}</div>}
      </div>
    </div>
  );
};

export default OldPatient;
