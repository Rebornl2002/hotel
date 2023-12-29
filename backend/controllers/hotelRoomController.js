import hotelRoom from '../models/hotelRoom.js';

export const getAllData = async (req, res) => {
    //for pagination

    try {
        const data = await hotelRoom.find({});

        if (data.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: data,
            });
        } else {
            throw new Error('No data found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const createRoom = async (req, res) => {
    const newRoom = new hotelRoom(req.body);
    try {
        const saveRoom = await newRoom.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveRoom,
        });
        console.log('vao day di');
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
        console.log(error);
    }
};

export const deleteRoom = async (req, res) => {
    const id = req.params.id;
    try {
        await hotelRoom.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

export const updateRoom = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedRoom = await hotelRoom.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedRoom,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};
