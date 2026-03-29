import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    barcode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String },
    mrp: { type: Number, required: true },
    mfgDate: { type: Date },
    expiryDate: { type: Date, required: true },
    stock: { type: Number, required: true, default: 0 },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    
    // Lifecycle Math Fields
    lifespanDays: { type: Number },
    saleStart: { type: Date },
    saleEnd: { type: Date },
    initialSalePrice: { type: Number },
    currentSalePrice: { type: Number },
    
    // GeoLocation
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

// Geospatial indexing
productSchema.index({ location: '2dsphere' });

export default mongoose.model('Product', productSchema);
