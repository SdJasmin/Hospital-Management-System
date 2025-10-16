import express from "express";
import dotenv from "dotenv";
import dbCon from "./libs/db.js";
import authRoutes from "./routes/Authroutes.js"; // Ensure correct variable names
import patientRoutes from "./routes/Patientroutes.js"; // Ensure correct variable names
import cors from "cors";
import bloodInventoryRoutes from './routes/BloodInventoryRoutes.js';

dotenv.config();

// Establish database connection
dbCon();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://hospital-management-system-pi-topaz.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));



// Authentication routes
app.use("/auth", authRoutes);

// Patient registration and booking routes
app.use("/api/patients", patientRoutes);
app.use('/api/blood-inventory', bloodInventoryRoutes);


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
