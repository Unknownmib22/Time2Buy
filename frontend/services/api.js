// API Service Layer for T2B
import axios from 'axios';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ====== BARCODE ======
export const lookupBarcode = async (barcode) => {
  try {
    const res = await api.get(`/products/barcode/${barcode}`);
    return res.data;
  } catch (err) {
    // Fallback: call Open Food Facts directly
    try {
      const off = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
        { timeout: 5000 }
      );
      if (off.data && off.data.status === 1) {
        const p = off.data.product;
        return {
          found: true,
          data: {
            name: p.product_name || 'Unknown',
            category: p.categories_tags?.[0]?.replace('en:', '') || 'General',
            mrp: 100,
          },
        };
      }
    } catch (_) {}
    return { found: false };
  }
};

// ====== PRODUCTS ======
export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data;
};

export const getNearbyProducts = async (lat, lon) => {
  const res = await api.get('/products/nearby', {
    params: { lat, lon },
  });
  return res.data;
};

export const purchaseProduct = async (productId, quantity) => {
  const res = await api.post(`/products/${productId}/purchase`, { quantity });
  return res.data;
};

// ====== STORES ======
export const getStoreProducts = async (storeId) => {
  const res = await api.get(`/stores/${storeId}/products`);
  return res.data;
};

export default api;
