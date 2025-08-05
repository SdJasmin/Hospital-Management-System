Arogya Hospital: Hospital Management System

Arogya Hospital Management System is a full-stack web application built using the MERN stack, designed to simplify hospital operations such as patient appointment booking, OP registration, blood bank monitoring, and more. The system ensures a seamless experience for patients, with an intuitive dashboard, secure authentication, and real-time data management.

Key Features

Patient-Centric Appointment Flow
- OP registration with shift, date, and doctor selection
- Email confirmation with options to confirm or cancel
- Downloadable appointment form

Secure Authentication
- Sign Up / Sign In with email verification
- OTP-based forgot/reset password
- Session handling with JWT

 Dashboard with Navigation
- Sidebar with:
  - Arogya Hospital Logo
  - Links: Home, About Us, Appointment, Blood Bank Status
  - Profile: View name, email, and logout

 Blood Bank Monitoring
- Displays real-time availability of all blood group units in the hospital

Modules

User Management and Authentication
- Email-based registration and login
- OTP verification for password resets
- JWT-based session handling
- Role support for future scalability (e.g., Admin, Doctor, Patient)

 Appointment Booking System
- OP form for new patients
- Dynamic doctor selection, date, and shift options
- Email-based appointment confirmation system

 Blood Bank Status Tracker
- Blood unit availability display
- Can be extended to include blood request and donation features

## Getting Started

## Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud – MongoDB Atlas)

Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/hospital-management-system.git
cd hospital-management-system

# Setup Frontend
cd frontend
npm install
npm start

# Setup Backend (in a new terminal)
cd ../backend
npm install
npm run dev
