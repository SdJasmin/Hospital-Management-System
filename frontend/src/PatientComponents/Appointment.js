import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";
import OldPatient from "./Oldpatient";
import generalPhysicianImage from "./general.png";
import cardiologistImage from "./cardiologist.png";
import endocrinologistImage from "./endocrinologist.png";
import GeneralPhysician from "./GeneralPhysician";
import Cardiologist from "./Cardiologist";
import Endocrinologist from "./Endocrinologist";


const doctorList = [
  {
    name: "Dr. Anjali Verma",
    specialty: "General Physician",
    image: generalPhysicianImage,
    info: "Dr. Anjali has 10+ years of experience in treating general illnesses and preventive care.",
  },
  {
    name: "Dr. Rajiv Menon",
    specialty: "Cardiologist",
    image: cardiologistImage,
    info: "Dr. Rajiv is a leading heart specialist known for non-invasive cardiology.",
  },
  {
    name: "Dr. Neha Sinha",
    specialty: "Endocrinologist",
    image: endocrinologistImage,
    info: "Dr. Neha specializes in diabetes, thyroid, and hormonal disorders.",
  },
];

const Appointment = () => {
  const [step, setStep] = useState("login");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    address: "",
    city: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) setStep("patientPrompt");
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneRegex = /^[6-9]\d{0,9}$/;
      if (!phoneRegex.test(value) && value !== "") {
        setPhoneError("Please enter a valid 10-digit Indian phone number.");
      } else {
        setPhoneError("");
      }
    }

    setPatientData({ ...patientData, [name]: value });
  };

  const handlePatientRegistration = (e) => {
    e.preventDefault();
    if (phoneError || patientData.phone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setStep("selectDoctor");
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setStep("doctorDetails");
  };

  const handleConfirmDoctor = () => {
    setStep("confirmAppointment");
  };

  return (
    <div className="appointment-container">
      {/* Back button for steps after patient check */}
      {["newPatientForm", "oldPatient", "selectDoctor", "doctorDetails"].includes(step) && (
        <button className="appointment-back-button" onClick={() => setStep("patientPrompt")}>
          ← Back
        </button>
      )}

      {/* Step 1: Login */}
      {step === "login" && (
        <>
          <h1 className="appointment-title">DO YOU WANT TO BOOK AN APPOINTMENT?</h1>
          <h2 className="appointment-subtitle">PLEASE LOGIN FIRST</h2>
          <button className="appointment-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </>
      )}

      {/* Step 2: Are you a new patient? */}
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

      {/* Step 2A: New Patient Registration Form */}
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
              <input
                type="tel"
                name="phone"
                required
                maxLength="10"
                pattern="[6-9]{1}[0-9]{9}"
                onChange={handleChange}
              />
              {phoneError && <p className="error-text">{phoneError}</p>}

              <label>Address:</label>
              <input type="text" name="address" required onChange={handleChange} />

              <label>City:</label>
              <input type="text" name="city" required onChange={handleChange} />

              <button className="appointment-button" type="submit">
                Next
              </button>
            </form>
          </div>
        </>
      )}

      {/* Step 2B: Old Patient Phone Entry */}
      {step === "oldPatient" && (
        <OldPatient onComplete={() => setStep("selectDoctor")} onBack={() => setStep("patientPrompt")} />
      )}

      {/* Step 3: Doctor Selection */}
      {step === "selectDoctor" && (
        <>
          <h1 className="appointment-title">SELECT A DOCTOR</h1>
          <div className="doctor-card-container">
            {doctorList.map((doc, index) => (
              <div key={index} className="doctor-card" onClick={() => handleDoctorClick(doc)}>
                <img src={doc.image} alt={doc.name} className="doctor-card-image" />
                <div className="doctor-card-info">
                  <h3>{doc.name}</h3>
                  <p>{doc.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 4: Doctor Details */}
     {step === "doctorDetails" && selectedDoctor && (
  <div className="doctor-details-container">
    <div className="doctor-details-card">
      <div className="doctor-details-left">
        <img src={selectedDoctor.image} alt={selectedDoctor.name} className="doctor-details-image-large" />
      </div>
      <div className="doctor-details-right">
        <h2>{selectedDoctor.name}</h2>
        <h4>{selectedDoctor.specialty}</h4>
        <p>
          {selectedDoctor.name} is a well-regarded {selectedDoctor.specialty.toLowerCase()} with over a decade of experience in delivering quality care to patients. Known for a calm and compassionate approach, {selectedDoctor.name} has helped numerous individuals achieve improved health outcomes.
        </p>
        <p>
          With a strong academic background and consistent dedication to patient-centered treatment, {selectedDoctor.name} ensures every patient receives the best possible consultation, diagnosis, and follow-up.
        </p>
        <p>
          Patients appreciate the detailed attention and clarity {selectedDoctor.name} brings to every appointment, making healthcare more accessible and understandable.
        </p>
        <button className="appointment-button" onClick={handleConfirmDoctor}>
          Proceed with this doctor
        </button>
      </div>
    </div>
  </div>
)}


      {/* Step 5: Shift & Date + Book */}
      {step === "confirmAppointment" && selectedDoctor?.specialty === "General Physician" && (
        <GeneralPhysician
          onBack={() => setStep("selectDoctor")}
          patientData={patientData}
          selectedDoctor={selectedDoctor}
          onComplete={() => setStep("patientPrompt")}
        />
      )}

      {step === "confirmAppointment" && selectedDoctor?.specialty === "Cardiologist" && (
        <Cardiologist
          onBack={() => setStep("selectDoctor")}
          patientData={patientData}
          selectedDoctor={selectedDoctor}
          onComplete={() => setStep("patientPrompt")}
        />
      )}

      {step === "confirmAppointment" && selectedDoctor?.specialty === "Endocrinologist" && (
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
