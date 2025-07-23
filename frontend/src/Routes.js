import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import ForgotPasswordPage from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./PatientComponents/Dashboard";
import LandingPage from "./Components/LandingPage";
import Home from "./PatientComponents/Home";
import Appointment from "./PatientComponents/Appointment";
import BloodBank from "./PatientComponents/BloodInventory";
import Aboutus  from "./PatientComponents/Aboutus";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Layout with Nested Routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<Home />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="bloodbank" element={<BloodBank />} />
        <Route path="aboutus" element={<Aboutus />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
