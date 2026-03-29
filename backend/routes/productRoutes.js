import express from 'express';
import { scanBarcode, createProduct, getNearbyProducts, testDistribution } from '../controllers/productController.js';

const router = express.Router();

// 1. Retailer Scans Barcode -> Fetches Product Info from Open Food Facts API
router.get('/barcode/:code', scanBarcode);

// 2. Retailer Adds Product (Provides Barcode, Stock, Expiry, Location)
router.post('/', createProduct);

// 3. User Feed: Get Nearby Products (B2C View)
router.get('/nearby', getNearbyProducts);

// 4. Test Trigger: Force parallel demand distribution logic
router.post('/trigger-demand/:id', testDistribution);

export default router;
