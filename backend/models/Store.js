import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: String },
    
    // GeoLocation
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [longitude, latitude]
    },
    
    // B2B Demand Matching threshold
    b2bDemandThreshold: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

storeSchema.index({ location: '2dsphere' });

export default mongoose.model('Store', storeSchema);
