import mongoose from 'mongoose';

const BloodInventorySchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    unique: true
  },
  units: {
    type: Number,
    required: true
  }
});

const BloodInventory = mongoose.model('BloodInventory', BloodInventorySchema);
export default BloodInventory;
