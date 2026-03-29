import axios from 'axios';
import Product from '../models/Product.js';
import Store from '../models/Store.js';
import { computeLifecycle } from '../services/lifecycleEngine.js';
import { triggerDistribution } from '../services/distributionEngine.js';

// Open Food Facts Barcode API Call
export const scanBarcode = async (req, res) => {
    try {
        const { code } = req.params;
        
        // Open Food Facts API (Free JSON API)
        const url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;
        const response = await axios.get(url);

        if (response.data && response.data.status === 1) {
            const product = response.data.product;
            
            return res.status(200).json({
                found: true,
                data: {
                    name: product.product_name,
                    category: product.categories_tags ? product.categories_tags[0] : 'General',
                    // OpenFoodFacts rarely has live MRP, so we map a mock MRP or use defaults
                    mrp: 100 
                }
            });
        }
        
        // Manual fallback if barcode not found
        return res.status(200).json({ 
            found: false, 
            message: "Barcode not found, manual entry required." 
        });

    } catch (err) {
        console.error("Barcode Fetch Error:", err);
        return res.status(500).json({ error: "Failed to parse barcode data" });
    }
};

// Retailer adds a new product stock
export const createProduct = async (req, res) => {
    try {
        const { barcode, name, category, mrp, mfgDate, expiryDate, stock, locationCoordinates } = req.body;
        
        // 1. Compute Lifecycle & Pricing Parameters
        const lifecycleData = computeLifecycle({ mrp, mfgDate, expiryDate });
        
        // 2. Determine Initial Sale Status
        const now = new Date();
        const isActiveState = !!(now >= lifecycleData.saleStart && now <= lifecycleData.saleEnd);

        // 3. Store in DB
        const newProduct = new Product({
            barcode,
            name,
            category,
            mrp,
            mfgDate,
            expiryDate,
            stock,
            location: {
                type: 'Point',
                coordinates: locationCoordinates // [lon, lat]
            },
            ...lifecycleData,
            isActive: isActiveState
        });

        await newProduct.save();

        // 4. If Sale Window is currently active directly, trigger distribution
        if (isActiveState) {
            await triggerDistribution(newProduct);
        }

        return res.status(201).json({ message: "Product Add Success", product: newProduct });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

// B2C Feed - get products within 2KM radius
export const getNearbyProducts = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        // Uses MongoDB $geoNear to find active products within 2km
        const products = await Product.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [Number(lon), Number(lat)] },
                    $maxDistance: 2000 // 2km radius
                }
            },
            isActive: true,
            stock: { $gt: 0 }
        });

        return res.status(200).json({ data: products });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch feed" });
    }
};

// DEV ONLY: Test Notification logic manually
export const testDistribution = async (req, res) => {
    try {
         const product = await Product.findById(req.params.id);
         if(product) {
              await triggerDistribution(product);
              return res.json({ message: 'Triggered successfully' });
         }
         return res.status(404).json({ error: 'Product not found' });
    } catch(err){
         return res.status(500).json({ error: 'Failed to trigger' });
    }
};
