import React from "react";
import "./Home.css"; // Import the CSS file for styling
import home1 from "./home1.png"; // Replace with your actual image file
import home2 from "./home2.png"; // Replace with your actual image file
import home3 from "./home3.png"; // Add the image for the third section

const Home = () => {
  return (
    <div className="home-container">
      {/* Section 1: Content on Left, Image on Right */}
      <div className="content-section">
        <div className="text-section">
          <h1 className="tagline">Healing with Compassion, Excellence, and Expertise</h1>
          <p className="introduction">
            Welcome to Arogya Hospital, your trusted partner in health and well-being. At Arogya, we are dedicated to
            providing exceptional medical care through a harmonious blend of advanced technology, experienced professionals,
            and a patient-centric approach. Our commitment lies in offering personalized, holistic healthcare solutions
            tailored to your unique needs.
          </p>
        </div>
        <div className="image-section">
          <img src={home1} alt="Doctor with patients" className="doctor-image" />
        </div>
      </div>

      {/* Section 2: Image on Left, Content on Right */}
      <div className="content-section reverse-layout">
        <div className="image-section">
          <img src={home2} alt="Modern hospital" className="doctor-image" />
        </div>
        <div className="text-section">
          <h1 className="tagline">State-of-the-Art Facilities</h1>
          <p className="introduction">
            Our hospital is equipped with advanced technology to ensure precise diagnosis and effective treatments.
            We strive to create a warm and welcoming environment where every patient receives world-class care.
          </p>
        </div>
      </div>

      {/* New Section: Content on Left, Image on Right */}
      <div className="content-section new-section">
        <div className="text-section">
          <h1 className="tagline">Personalized Care: Listening to Patients</h1>
          <p className="introduction">
            Work and pain are a natural part of life, but they can be made easier. Always strive to do your best and enjoy
            the little things that bring comfort and happiness. Avoid actions that might cause harm or regret, and focus
            on creating a fulfilling and balanced life.
          </p>
        </div>
        <div className="image-section">
          <img src={home3} alt="Personalized Care" className="doctor-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;