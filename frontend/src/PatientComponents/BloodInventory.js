import React, { useEffect, useState } from "react";
import "./BloodInventory.css";
import { API_BASE_URL } from "../config";


// Initial static data to display while fetching from backend
const initialBloodInventoryData = [
  { group: "A+", units: 25 },   // Most common, higher stock
  { group: "A-", units: 10 },   // Less common, moderate stock
  { group: "B+", units: 20 },
  { group: "B-", units: 8 },
  { group: "O+", units: 30 },   // Universal donor for +ve, high stock
  { group: "O-", units: 12 },   // Universal donor, very important
  { group: "AB+", units: 10 },
  { group: "AB-", units: 5 }    // Rarest, but keep some stock
];


const getStatus = (units) => {
  if (units >= 10) return { label: "Normal", color: "green" };
  if (units >= 3) return { label: "Low", color: "orange" };
  return { label: "Critical", color: "red" };
};

const BloodInventory = () => {
  const [bloodInventoryData, setBloodInventoryData] = useState(initialBloodInventoryData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch live data from backend every 2 seconds
      fetch(`${API_BASE_URL}/api/blood-inventory`)

        .then((response) => response.json())
        .then((data) => {
          // Update only the units for the changed blood groups
          setBloodInventoryData((prevData) =>
            prevData.map((item) => {
              const updatedItem = data.find((d) => d.bloodGroup === item.group); // Match with 'bloodGroup' from the backend
              if (updatedItem && updatedItem.units !== item.units) {
                // Only update units if they are different
                return { ...item, units: updatedItem.units };
              }
              return item; // Keep existing data if no change
            })
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 2000); // Fetch every 2 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="inventory-container">
      <h1>🩸 Live Blood Inventory Status</h1>
      <div className="inventory-grid">
      {bloodInventoryData.map((item) => {
  const status = getStatus(item.units);
  return (
    <div key={item.group} className="inventory-card">
      <h3>{item.group}</h3>
      <p>{item.units} units</p>
      <span className={`status ${status.color}`}>{status.label}</span>

      {item.units < 5 && (
        <span className="alert-badge">Low Stock!</span>
      )}
    </div>
  );
})}

      </div>
    </div>
  );
};

export default BloodInventory;
