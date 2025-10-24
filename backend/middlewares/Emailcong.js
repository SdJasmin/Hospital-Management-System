import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // SSL port
  secure: true,       // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,   // your full Gmail address
    pass: process.env.EMAIL_PASS,   // App Password, NOT regular Gmail password
  },
});
