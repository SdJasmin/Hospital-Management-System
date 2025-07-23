import express from 'express';
import BloodInventoryController from '../controllers/BloodInventoryController.js';

const router = express.Router();

// Route to get all blood inventory data
router.get('/', BloodInventoryController.getAllBloodInventory);

// Route to update blood units
router.put('/update', BloodInventoryController.updateBloodUnits);

// Route to insert static blood inventory data
router.post('/insertStaticData', BloodInventoryController.insertStaticData);

export default router;
