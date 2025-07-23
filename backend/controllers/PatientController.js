import fs from "fs";
import PDFDocument from "pdfkit";
import { transporter } from "../middlewares/Emailcong.js";
import { Appointment_Confirmation_Email_Template } from "../libs/EmailTemplate.js";
import { Patient } from "../models/Patient.js";

import { v4 as uuidv4 } from "uuid";
import path from "path";

// Function to generate serial number
const generateSerialNumber = async (selectedDate) => {
  const date = new Date(selectedDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const datePrefix = `${day}${month}`;

  const appointmentCount = await Patient.countDocuments({ date: selectedDate });

  const nextSerial = String(appointmentCount + 1).padStart(2, "0");
  return `${datePrefix}${nextSerial}`;
};

const doctorSlotLimits = {
  "General Physician": { morning: 30, evening: 30 },
  "Cardiologist": { morning: 25, evening: 25 },
  "Endocrinologist": { morning: 20, evening: 20 }
};

export const registerPatient = async (req, res) => {
  try {
    const { name, gender, age, phone, selectedDoctor, shift, email, date } = req.body;

    const maxSlots = doctorSlotLimits[selectedDoctor]?.[shift] || 20; // Default to 20 if doctor not found
    const bookedCount = await Patient.countDocuments({ date, shift, selectedDoctor });

    if (bookedCount >= maxSlots) {
      return res.status(400).json({ message: "No available slots for this shift." });
    }

    const existingPatient = await Patient.findOne({ name, phone, email, date });
    if (existingPatient) {
      return res.status(400).json({ message: "You have already booked an appointment." });
    }

    const confirmationToken = uuidv4();
    const serialNumber = `${date.replace(/-/g, "")}${String(bookedCount + 1).padStart(2, "0")}`;

    const newPatient = new Patient({
      name, gender, age, phone, selectedDoctor, shift, email, date,
      confirmationToken, serialNumber,
      serialNumberExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await newPatient.save();
    const confirmUrl = `http://localhost:5000/api/patients/confirm/${confirmationToken}`;
    const cancelUrl = `http://localhost:5000/api/patients/cancel/${confirmationToken}`;

    const emailTemplate = Appointment_Confirmation_Email_Template
      .replace("{name}", name)
      .replace("{doctor}", selectedDoctor)
      .replace("{date}",date)
      .replace("{confirmLink}", confirmUrl)
      .replace("{cancelLink}", cancelUrl);

    await transporter.sendMail({
      from: '"Arogya Hospital" <sdjasmin7314@gmail.com>',
      to: email,
      subject: "Appointment Confirmation",
      html: emailTemplate,
    });
    res.status(201).json({ 
      message: "Appointment booked. Check your email to confirm.", 
      confirmationToken  
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error registering patient", error: error.message });
  }

};

// Confirm an appointment
export const confirmAppointment = async (req, res) => {
  try {
    const { token } = req.params;
    const patient = await Patient.findOne({ confirmationToken: token });

    if (!patient) {
      return res.status(404).json({ message: "Invalid or expired confirmation link." });
    }

    await Patient.updateOne({ _id: patient._id }, { $unset: { confirmationToken: 1 } });

    res.send(`<h2>Appointment Confirmed</h2><p>Your appointment is confirmed. <a href="/api/patients/download/${patient._id}">Download PDF</a></p>`);
  } catch (error) {
    res.status(500).json({ message: "Error confirming appointment.", error: error.message });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { token } = req.params;
    const patient = await Patient.findOne({ confirmationToken: token });

    if (!patient) {
      return res.status(404).json({ message: "Invalid or expired cancellation link." });
    }

    await Patient.findByIdAndDelete(patient._id);

    res.send("<h2>Appointment Canceled</h2><p>Your appointment has been canceled.</p>");
  } catch (error) {
    res.status(500).json({ message: "Error canceling appointment.", error: error.message });
  }
};

// Generate and download PDF
export const downloadAppointmentPDF = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    const serialNumber = patient.serialNumber;
    const doc = new PDFDocument({ margin: 50 });

    const dirPath = path.resolve("appointments");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${patient._id}.pdf`);

    res.setHeader("Content-Disposition", `attachment; filename=appointment_${patient._id}.pdf`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(fs.createWriteStream(filePath));
    doc.pipe(res);

    doc.rect(10, 10, doc.page.width - 20, doc.page.height - 20).stroke();

    doc.fontSize(20).text("Appointment Confirmation", { align: "center" });
    doc.moveDown();
    
    doc.fontSize(14).text(`Serial No: ${serialNumber}`);
    doc.text(`Name: ${patient.name}`);
    doc.text(`Gender: ${patient.gender}`);
    doc.text(`Age: ${patient.age}`);
    doc.text(`Phone: ${patient.phone}`);
    doc.text(`Doctor: ${patient.selectedDoctor}`);
    doc.text(`Shift: ${patient.shift}`);
    doc.text(`Email: ${patient.email}`);

    doc.end();

    setTimeout(() => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }, 10000);

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF.", error: error.message });
  }
};

// Verify serial number
export const verifyPatientSerial = async (req, res) => {
  try {
    const { serialNumber } = req.body;
    const patient = await Patient.findOne({ serialNumber });

    res.json({ verified: !!patient });
  } catch (error) {
    res.status(500).json({ message: "Error verifying Serial Number", error: error.message });
  }
};
export const getAvailableSlots = async (req, res) => {
  try {
    const { date, shift, doctor } = req.query;
    if (!date || !shift || !doctor) {
      return res.status(400).json({ message: "Date, shift, and doctor are required" });
    }

    const maxSlots = doctorSlotLimits[doctor]?.[shift] || 20;
    const bookedCount = await Patient.countDocuments({ date, shift, selectedDoctor: doctor });
    const availableSlots = maxSlots - bookedCount;

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots", error: error.message });
  }
};



