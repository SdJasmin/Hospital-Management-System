import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import userprofile from "./userprofile.png";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:5000/auth/user/profile", { headers: { "x-auth-token": token } })
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem("userEmail", response.data.user.email); // Store email in localStorage
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          setUser(null);
          localStorage.removeItem("userEmail"); // Remove email if session is invalid
        });
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/dashboard/home");
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">Arogya Healthcare</div>
        <ul className="navbar-links">
          {["home", "aboutus", "appointment", "bloodbank"].map((route) => (
            <li key={route}>
              <Link to={`/dashboard/${route}`}>{route.charAt(0).toUpperCase() + route.slice(1)}</Link>
            </li>
          ))}
          <li className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
            <img src={userprofile} alt="User Profile" />
          </li>
        </ul>
      </nav>

      {showProfile && (
        <div className="profile-dropdown">
          {user ? (
            <>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <p>Please login to see your profile</p>
          )}
        </div>
      )}

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
