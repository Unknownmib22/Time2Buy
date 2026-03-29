import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

// Internal modules
import { pricingEngineCron } from './services/pricingEngine.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date() });
});

// Database and Server Setup
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/time2buy';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      // Initialize Background Cron Jobs
      // Schedule price decay every night or based on interval required mapping
      cron.schedule('0 0 * * *', () => { // Every Midnight
         console.log('⏰ Running Price Decay Job');
         pricingEngineCron();
      });
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });
