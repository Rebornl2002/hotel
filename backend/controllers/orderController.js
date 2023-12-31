import order from '../models/order.js';

export const getAllData = async (req, res) => {
    //for pagination

    try {
        const data = await order.find({});

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

export const createOrder = async (req, res) => {
    const newOrder = new order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
        console.log(error);
    }
};

export const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await order.deleteOne({ orderName: id });

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};
