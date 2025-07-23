import React, { useState, useEffect } from "react";
import "./Payment.css";
import qrimage from "./qrcode.jpg";

const Payment = ({ onPaymentComplete }) => {
    const [file, setFile] = useState(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            alert("User email not found. Please log in.");
        }
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please upload a payment screenshot!");
            return;
        }

        setTimeout(() => {
            setPaymentConfirmed(true);
            onPaymentComplete(); // Return to Doctor's Page
        }, 2000);
    };

    return (
        <div className="payment-container">
            <h1>Scan & Pay via UPI</h1>
            <img src={qrimage} alt="UPI QR Code" className="qr-code" />
            <h2>Scan the QR code using Google Pay, PhonePe, or Paytm.</h2>
            <br /><br />
            <h1>Upload Payment Screenshot</h1>
            <input type="file" onChange={handleFileChange} /><br /><br />
            <button className="upload-button" onClick={handleUpload}>
                Upload & Confirm Payment
            </button>
        </div>
    );
};

export default Payment;
