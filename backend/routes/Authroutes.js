import express from "express";
import {
  register,
  login,
  ForgotPassword,
  ResetPassword,
  VerifyOTP,
} from "../controllers/Auth.js";
import { getUserProfile } from "../controllers/User.js"; // Importing profile controller
import authenticate from "../middlewares/authenticate.js"; // Middleware for token verification

const Authroutes = express.Router();

// Authentication routes
Authroutes.post("/register", register);
Authroutes.post("/login", login);
Authroutes.post("/forgotpassword", ForgotPassword);
Authroutes.post("/resetpassword", ResetPassword);
Authroutes.post("/verify-otp", VerifyOTP);

// User profile route
Authroutes.get("/user/profile", authenticate, getUserProfile);

export default Authroutes;
