import { Sendverificationcode } from "../middlewares/Email.js";
import Usermodel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Registration (without email verification)
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validate input fields
    if (!email || !name || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required." 
      });
    }

    // Check if the user already exists
    const existUser = await Usermodel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists. Please login." 
      });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user and save to the database
    const newUser = new Usermodel({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();

    // Respond with success message
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });

  } catch (error) {
    console.error("Registration error: ", error);

    // Handle unexpected errors
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error. Please try again later." 
    });
  }
};


// User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: { name: user.name, email: user.email }, // Include user details
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Forgot Password (Request OTP)
const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email is required." });

    const user = await Usermodel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    // Send OTP email
    Sendverificationcode(user.email, verificationCode);

    return res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Verify OTP for password reset
const VerifyOTP = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const user = await Usermodel.findOne({ email });
    if (!user || user.verificationCode !== verificationCode.trim()) {
      return res.status(400).json({ success: false, message: "Invalid OTP or email." });
    }

    // Clear the verification code once verified
    user.verificationCode = null;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const ResetPassword = async (req, res) => {
  try {
    console.log("Request body:", req.body);  // Log the full request body

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "Email and new password are required." });
    }

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hash the new password before saving
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.error("Error:", error);  // Log the error for better debugging
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};



export { register, login, ForgotPassword, ResetPassword, VerifyOTP };
