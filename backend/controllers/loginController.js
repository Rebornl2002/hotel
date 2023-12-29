import login from '../models/login.js';

//Create login

export const createlogin = async (req, res) => {
    const newlogin = new login(req.body);
    try {
        const savelogin = await newlogin.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savelogin,
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

//update ticket

export const updatelogin = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedlogin = await login.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedlogin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

//delete ticket

export const deletelogin = async (req, res) => {
    const id = req.params.id;
    try {
        await login.findByIdAndDelete(id);

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

//getSingle ticket

export const getSinglelogin = async (req, res) => {
    const id = req.params.id;
    try {
        const login = await login.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: login,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//getAll ticket

export const getAllData = async (req, res) => {
    //for pagination
    const page = parseInt(req.query.page);
    console.log(page);

    console.log('vai ca cut');

    try {
        const data = await login
            .find({})
            .skip(page * 5)
            .limit(5);

        if (login.length > 0) {
            console.log('ao that day');
            res.status(200).json({
                success: true,
                count: data.length,
                message: 'Successfully',
                data: data,
            });
        } else {
            throw new Error('No tickets found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

//get ticket by search
export const getloginBySearch = async (req, res) => {
    //here 'i' means case sensitive

    // const codeTicket = new RegExp(req.query.CodeTicket);
    // const CodeTicket = new RegExp(req.query);

    const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);

    console.log('in codeTicket cho t', codeTicket);

    try {
        const logins = await login.find({
            // CodeTicket: { $eq: CodeTicket },
            CodeTicket: codeTicket,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: logins.length,
            data: logins,
        });

        console.log(logins);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found booked',
        });
    }
};
