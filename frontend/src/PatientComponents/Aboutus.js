import React from "react";
import "./Aboutus.css";
import researchImage from "./aboutus1.png"; // Ensure this image is available in your project folder
import generalPhysicianImage from "./general.png"; // Add image paths
import cardiologistImage from "./cardiologist.png";
import endocrinologistImage from "./endocrinologist.png";

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      {/* Research Section */}
      <div className="aboutus-content">
        <div className="aboutus-text">
          <h1>Research and Development</h1>
          <h2>Innovating in Health</h2>
          <p>
            Research and development involve continuous effort and innovation to achieve progress.
            By staying focused and working diligently, new solutions can be created to address
            challenges effectively while ensuring meaningful advancements.
          </p>
        </div>
        <div className="aboutus-image">
          <img src={researchImage} alt="Research and Development" />
        </div>
      </div>

      {/* Medical Team Section */}
      <div className="medical-team-container">
        <h1>Our medical team:</h1>
        <h2>Dedicated professionals</h2>
        <div className="medical-team">
          <div className="team-member">
            <img src={generalPhysicianImage} alt="General Physician" />
            <div className="team-content">
              <h3>GENERAL PHYSICIAN</h3>
              <p>
                Serving as the first point of contact, our general physicians provide 
                comprehensive assessments and guide patients to the appropriate specialists 
                for advanced care.
              </p>
            </div>
          </div>
          
          <div className="team-member">
            <img src={cardiologistImage} alt="Cardiologist" />
            <div className="team-content">
              <h3>CARDIOLOGIST</h3>
              <p>
                With a deep focus on heart health, our cardiology team diagnoses and treats 
                cardiovascular conditions, helping patients lead healthier lives.
              </p>
            </div>
          </div>

          <div className="team-member">
            <img src={endocrinologistImage} alt="Endocrinologist" />
            <div className="team-content">
              <h3>ENDOCRINOLOGIST</h3>
              <p>
                Experts in managing hormonal and metabolic disorders, our endocrinologists 
                collaborate with other departments to address complex health concerns such as 
                diabetes, thyroid issues, and obesity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
