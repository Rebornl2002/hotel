import express, { application } from 'express';
import dotenv, { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import hotelRoomRouter from './routes/hotelRoom.js';
import loginRoute from './routes/login.js';
import amenityRoute from './routes/amenity.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//for testing

// app.get("/tickets", (req, res) => {
//   res.send("page ticket");
// });
//database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected', process.env.MONGO_URL);
    } catch (error) {
        console.log('MongoDB database disconnected');
    }
};

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/room', hotelRoomRouter);
app.use('/login', loginRoute);
app.use('/amenity', amenityRoute);

app.listen(port, () => {
    connect();
    console.log('server listening on port', port);
});
