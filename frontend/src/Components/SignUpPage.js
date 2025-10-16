import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    const userData = { name, email, password };

    try {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

      if (response.data.success) {
        setMessage("Registration successful! You can now log in.");
        setMessageType("success");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (response.data.message === "User already exists. Please login.") {
          setMessage("User already exists. Please login.");
          setMessageType("error");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(response.data.message || "An error occurred. Please try again.");
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Registration error: ", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="page-container">
      {/* Left side container */}
      <div className="left-container"></div>

      {/* Right side container */}
      <div className="signup-container">
        <h1 className="title">Welcome to Arogya Hospital</h1>

        {message && (
          <div className={`message-popup ${messageType}`}>
            {message}
          </div>
        )}

        <form className="signup-form" onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="register-btn">Register</button>
          <p>
            Already Signed up?{" "}
            <Link to="/login" className="signin-link">Sign in here.</Link>
          </p>
        </form>

        <footer className="footer">
          Footer: Arogya Hospital, All rights reserved, 2024
        </footer>
      </div>
    </div>
  );
};

export default SignUpPage;
