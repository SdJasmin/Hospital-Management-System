import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config"; // adjust the path if needed

import axios from "axios";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/forgotpassword`, { email });
      if (response.data.success) {
        localStorage.setItem("resetEmail", email);
        setStep("otp");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
  email,
  verificationCode: otp.trim(),
});

      if (response.data.success) {
        navigate("/resetpassword");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fp-page-container">
      {/* Left side container */}
      <div className="fp-left-container"></div>

      {/* Right side container */}
      <div className="fp-container">
        <div className="fp-form-container">
          {step === "email" && (
            <>
              <h2 className="fp-form-title">Forgot Password</h2>
              <p className="fp-form-text">
                Enter your registered email, and you'll receive a link or OTP to reset your password.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <label htmlFor="email" className="fp-form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your registered email"
                  className="fp-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="fp-submit-button">
                  Send OTP
                </button>
                {errorMessage && <p className="fp-error-message">{errorMessage}</p>}
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="fp-form-title">Enter OTP</h2>
              <p className="fp-form-text">
                We've sent a One-Time Password (OTP) to your email. Please enter it below.
              </p>
              <form onSubmit={handleOTPSubmit}>
                <label htmlFor="otp" className="fp-form-label">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter the OTP"
                  className="fp-form-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit" className="fp-submit-button">
                  Verify OTP
                </button>
                {errorMessage && <p className="fp-error-message">{errorMessage}</p>}
              </form>
              <p className="fp-back-to-login">
                Entered the wrong email?{" "}
                <button
                  type="button"
                  className="fp-back-btn-link"
                  onClick={() => {
                    setStep("email");
                    setErrorMessage("");
                  }}
                >
                  Go back
                </button>
              </p>
            </>
          )}
        </div>

        <footer className="fp-footer">
          Footer, Arogya Hospital. All rights reserved, 2024
        </footer>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
