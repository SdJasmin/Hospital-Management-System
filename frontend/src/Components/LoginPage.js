import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { API_BASE_URL } from "../config"; // adjust the path if needed


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Special case: Admin login without API call
  if (email === "admin@gmail.com" && password === "admin") {
    localStorage.setItem("authToken", "admin-static-token"); // or skip if not needed
    navigate("/admin");
    return;
  }

  // Normal user login
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

    if (data.success) {
      localStorage.setItem("authToken", data.token);
      navigate("/dashboard/appointment");
    } else {
      setError(data.message || "Login failed.");
    }
  } catch {
    setError("An error occurred. Please try again.");
  }
};


  return (
    <div className="page-container">
      <div className="left-container"></div>
      <div className="login-container">
        <h1 className="title">Welcome to Arogya Hospital</h1>
        {error && <div className="error-popup">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" className="login-form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" placeholder="Enter your password" className="login-form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="submit-btn">Submit</button><br></br>
          <p>Haven't signed up? <Link to="/signup" className="signup-link">Sign up here.</Link></p><br></br>
          <p>Forgot your password? <Link to="/forgot-password" className="forgot-password-link">Click here.</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
