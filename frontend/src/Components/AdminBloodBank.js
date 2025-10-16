import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminBloodBank.css";

const allBloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const AdminBloodBank = () => {
  const [formData, setFormData] = useState({ bloodGroup: "", units: "" });
  const [unitsData, setUnitsData] = useState({});
  const token = localStorage.getItem("token");

  // Fetch current units every 2 seconds
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blood-inventory");
        const mappedUnits = {};
        allBloodGroups.forEach((grp) => {
          const match = res.data.find(
            (item) => item.bloodGroup === grp || item.group === grp
          );
          mappedUnits[grp] = match ? match.units : 0;
        });
        setUnitsData(mappedUnits);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUnits();
    const interval = setInterval(fetchUnits, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async () => {
    if (!formData.bloodGroup || formData.units === "") {
      return alert("Please select a blood group and enter units");
    }

    try {
      await axios.put(
        "http://localhost:5000/api/blood-inventory/update",
        { bloodGroup: formData.bloodGroup, units: Number(formData.units) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blood units updated successfully!");
      setFormData({ bloodGroup: "", units: "" });
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };
 
  return (
   
    <div className="admin-blood-container">
      
      <h2>🩸 Blood Bank Management</h2>

      {/* Display static 8 groups with live units */}
      <div className="blood-grid">
        {allBloodGroups.map((grp) => (
          <div className="blood-row" key={grp}>
            <span className="blood-group">{grp}</span>
            <span className="blood-units">{unitsData[grp] ?? 0} units</span>
          </div>
        ))}
      </div>

      {/* Update section */}
      <div className="update-section">
        <h3>Update Blood Units</h3>
        <div className="form-group">
          <select
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
          >
            <option value="">Select Blood Group</option>
            {allBloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Units"
            value={formData.units}
            onChange={(e) =>
              setFormData({ ...formData, units: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default AdminBloodBank;
