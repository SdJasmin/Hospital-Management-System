import express from "express";
import {
  registerPatient,
  confirmAppointment,
  cancelAppointment,
  downloadAppointmentPDF,
  verifyPatientSerial,
  getAvailableSlots,
} from "../controllers/PatientController.js";

const router = express.Router();

router.post("/register", registerPatient);
router.get("/confirm/:token", confirmAppointment);
router.get("/cancel/:token", cancelAppointment);
router.get("/download/:id", downloadAppointmentPDF);
router.post("/verify", verifyPatientSerial);
router.get("/getAvailableSlots", getAvailableSlots);
 // New endpoint to fetch available slots

export default router;
