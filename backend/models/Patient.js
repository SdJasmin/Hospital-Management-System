import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  selectedDoctor: { type: String, required: true },
  shift: { type: String, required: true }, // "Morning" or "Evening"
  email: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  confirmationToken: { type: String, required: true },
  serialNumber: { type: String, required: true },
  serialNumberExpiry: { type: Date, expires: "7d", default: Date.now },
  createdAt: { type: Date, default: Date.now },
  confirmed: { type: Boolean, default: false }, // Track confirmation status
});

const Patient = mongoose.model("Patient", patientSchema);
export { Patient };
