import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";
import GeneralPhysician from "./GeneralPhysician";
import Cardiologist from "./Cardiologist";
import Endocrinologist from "./Endocrinologist";
import OldPatient from "./Oldpatient";

const Appointment = () => {
  const [step, setStep] = useState("login");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) setStep("patientPrompt");
  }, [token]);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleDoctorSelection = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handlePatientRegistration = (e) => {
    e.preventDefault();
    setStep("selectDoctor");
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    setStep("confirmAppointment");
  };

  return (
    <div className="appointment-container">
      {(step === "selectDoctor" || step === "newPatientForm") && (
        <button className="appointment-back-button" onClick={() => setStep("patientPrompt")}>
          ← Back
        </button>
      )}

      {step === "login" && (
        <>
          <h1 className="appointment-title">DO YOU WANT TO BOOK AN APPOINTMENT?</h1>
          <h2 className="appointment-subtitle">PLEASE LOGIN FIRST</h2>
          <button className="appointment-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </>
      )}

      {step === "patientPrompt" && (
        <>
          <h1 className="appointment-title">ARE YOU A NEW PATIENT?</h1>
          <div className="appointment-button-group">
            <button className="appointment-option-button appointment-button" onClick={() => setStep("newPatientForm")}>
              Yes
            </button>
            <button className="appointment-option-button appointment-button" onClick={() => setStep("oldPatient")}>
              No
            </button>
          </div>
        </>
      )}
      
      {step === "oldPatient" && (
        <OldPatient onComplete={() => setStep("selectDoctor")} onBack={() => setStep("patientPrompt")} />
      )}

      {step === "newPatientForm" && (
        <>
          <h1 className="appointment-title">NEW PATIENT REGISTRATION</h1>
          <div className="appointment-form-container">
            <form className="appointment-form" onSubmit={handlePatientRegistration}>
              <label>Name:</label>
              <input type="text" name="name" required onChange={handleChange} />

              <label>Gender:</label>
              <select name="gender" required onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Age:</label>
              <input type="number" name="age" required onChange={handleChange} />

              <label>Phone:</label>
              <input type="tel" name="phone" required onChange={handleChange} />

              <button className="appointment-button" type="submit">
                Next
              </button>
            </form>
          </div>
        </>
      )}

      {step === "selectDoctor" && (
        <>
          <h1 className="appointment-title">SELECT A DOCTOR</h1>
          <div className="appointment-form-container">
            <form className="appointment-form" onSubmit={handleDoctorSubmit}>
              {["General Physician", "Cardiologist", "Endocrinologist"].map((doctor) => (
                <label key={doctor}>
                  <input
                    type="radio"
                    name="selectedDoctor"
                    value={doctor}
                    checked={selectedDoctor === doctor}
                    onChange={handleDoctorSelection}
                  />
                  {doctor}
                </label>
              ))}
              <button className="appointment-button" type="submit">
                Next
              </button>
            </form>
          </div>
        </>
      )}

      {step === "confirmAppointment" && selectedDoctor === "General Physician" && (
        <GeneralPhysician
          onBack={() => setStep("selectDoctor")}
          patientData={patientData}
          selectedDoctor={selectedDoctor}
          onComplete={() => setStep("patientPrompt")}
        />
      )}

      {step === "confirmAppointment" && selectedDoctor === "Cardiologist" && (
        <Cardiologist
          onBack={() => setStep("selectDoctor")}
          patientData={patientData}
          selectedDoctor={selectedDoctor}
          onComplete={() => setStep("patientPrompt")}
        />
      )}

      {step === "confirmAppointment" && selectedDoctor === "Endocrinologist" && (
        <Endocrinologist
          onBack={() => setStep("selectDoctor")}
          patientData={patientData}
          selectedDoctor={selectedDoctor}
          onComplete={() => setStep("patientPrompt")}
        />
      )}
    </div>
  );
};

export default Appointment;
