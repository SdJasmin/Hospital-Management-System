import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import landingImage from "./landing.png";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard/home"); // Navigate to dashboard instead of login
  };

  return (
    <div className="landing-page">
      <div className="welcome-section">
        <h1 className="welcome-text">WELCOME TO</h1>
        <h1 className="hospital-name">AROGYA HOSPITAL</h1>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="image-section">
        <img src={landingImage} alt="Landing Illustration" className="landing-image" />
      </div>
    </div>
  );
}

export default LandingPage;
