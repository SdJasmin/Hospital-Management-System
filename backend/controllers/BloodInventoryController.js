import BloodInventory from '../models/BloodInventory.js';

const getAllBloodInventory = async (req, res) => {
  try {
    const inventory = await BloodInventory.find({});
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateBloodUnits = async (req, res) => {
  const { bloodGroup, units } = req.body;
  try {
    const updated = await BloodInventory.findOneAndUpdate(
      { bloodGroup },
      { $set: { units } },
      { new: true, upsert: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error });
  }
};

const insertStaticData = async (req, res) => {
  const staticData = [
    { bloodGroup: "A+", units: 25 },
    { bloodGroup: "A-", units: 10 },
    { bloodGroup: "B+", units: 20 },
    { bloodGroup: "B-", units: 8 },
    { bloodGroup: "O+", units: 30 },
    { bloodGroup: "O-", units: 12 },
    { bloodGroup: "AB+", units: 10 },
    { bloodGroup: "AB-", units: 5 }
  ];

  try {
    await BloodInventory.insertMany(staticData);
    res.status(200).json({ message: 'Static data inserted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting static data', error });
  }
};

export default {
  getAllBloodInventory,
  updateBloodUnits,
  insertStaticData
};

