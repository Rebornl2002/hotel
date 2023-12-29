import mongoose from 'mongoose';

const hotelRoom = new mongoose.Schema({
    roomImg: {
        type: String,
    },
    roomName: {
        type: Number,
        require: true,
        unique: true,
    },
    roomType: {
        type: String,
        require: true,
    },
    roomAmenity: {
        type: Array,
        require: true,
    },
    roomRank: {
        type: String,
        require: true,
    },
    roomCreatAt: {
        type: Object,
        require: true,
    },
    roomPrice: {
        type: Number,
        require: true,
    },
    roomDescription: {
        type: String,
        default: 'Hiện chưa có thông tin mô tả cho phòng này !',
    },
});

export default mongoose.model('hotelRoom', hotelRoom);
