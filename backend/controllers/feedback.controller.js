const Feedback = require('../models/Feedback');

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors')

//crete new feedback
const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        const newFeedback = await feedback.save();
        res.status(StatusCodes.CREATED).json(newFeedback);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message});
    }
};

module.exports = { createFeedback };