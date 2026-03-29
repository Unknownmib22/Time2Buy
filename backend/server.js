import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

// Internal modules
import { pricingEngineCron } from './services/pricingEngine.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const API_HOST = process.env.API_HOST || `http://localhost:${process.env.PORT || 5050}`;
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date(), env: process.env.NODE_ENV || 'development', host: API_HOST });
});

// ====== VERCEL CRON ENDPOINT ======
app.get('/api/cron/price-decay', async (req, res) => {
  // Simple auth check to prevent unauthorized triggers (optional, can use Vercel header)
  const authHeader = req.headers['authorization'];
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('⏰ Running Price Decay Job via Vercel Cron');
  try {
    await pricingEngineCron();
    res.status(200).json({ status: 'success', message: 'Price decay job completed' });
  } catch (err) {
    console.error('❌ Price decay job failed:', err);
    res.status(500).json({ error: 'Job failed' });
  }
});

// Database Connection Helper (Serverless Friendly)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/time2buy';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
}

// Global middleware to ensure DB is connected for every request on Serverless
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Server listen (Only on non-Vercel environments)
const PORT = process.env.PORT || 5050;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    // Local Background Cron Jobs
    cron.schedule('0 0 * * *', () => { 
       console.log('⏰ Running Local Price Decay Job');
       pricingEngineCron();
    });
  });
}

// Export the app for Vercel
export default app;
