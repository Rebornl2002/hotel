import mongoose from 'mongoose';

const amenity = new mongoose.Schema({
    amenityName: {
        type: String,
        require: true,
        unique: true,
    },
    roomType: {
        type: String,
        require: true,
    },
    createdAt: {
        type: String,
        require: true,
    },
});

export default mongoose.model('amenity', amenity);
