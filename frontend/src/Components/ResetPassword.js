import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is missing!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
     const response = await axios.post(
        `${API_BASE_URL}/auth/resetpassword`, // use API_BASE_URL
        {
          email: email,
          newPassword: password,
        }
      );

      if (response.data.success) {
        setPopupMessage("Password reset successful. Please log in.");
        setTimeout(() => {
          setPopupMessage("");
          navigate("/login");
        }, 3000);
      } else {
        setError(response.data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Error in password reset:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <div className="left-container"></div>
      <div className="reset-password-container">
        
        {error && <div className="reset-password-error-popup">{error}</div>}
        <div className="reset-password-form-container">
          <h1 className="reset-password-form-title">Reset Your Password</h1>
          <h2 className="reset-password-form-text">
            Enter your new password below.
          </h2>
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <label className="reset-password-form-label">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="reset-password-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="reset-password-form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="reset-password-form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="reset-password-submit-btn">
              Reset Password
            </button>
          </form>
          <p className="reset-password-back-to-login">
            Go back to{" "}
            <Link to="/login" className="reset-password-form-link">
              Sign in
            </Link>
            .
          </p>
        </div>
        {popupMessage && (
          <div className="reset-password-popup-message">
            <p>{popupMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
