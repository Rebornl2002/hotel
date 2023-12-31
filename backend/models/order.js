import mongoose from 'mongoose';

const order = new mongoose.Schema({
    userName: {
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    roomName: {
        type: Number,
        require: true,
    },
    roomType: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    dayFrom: {
        type: String,
        require: true,
    },
    dayTo: {
        type: String,
        require: true,
    },
});

export default mongoose.model('order', order);
