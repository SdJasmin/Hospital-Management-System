import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "sdjasmin786@gmail.com",
      pass: "ycap enkq bmor mvef",
    },
  });

  
