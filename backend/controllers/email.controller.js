const Email_data = require("../models/email.model.js");
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//find all emails
const getEmails = async(req, res) => {
    try {
        const email_data = await Email_data.find({});
        res.status(200).json({ email_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching email");
    }
};

//find email by id
const getEmail = async(req, res) => {
    try {
        const { id } = req.params;
        const email_data = await Email_data.findById({ _id: id });
        if (!email_data) {
            return res.status(404).json({ msg: `No email with id : ${id}` });
        }
        res.status(200).json({ email_data });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in fetching email");
    }
};

//create email
const createEmail = async(req, res) => {
    try {
        const email = new Email_data(req.body);
        const newEmail = await email.save();
        res.status(StatusCodes.CREATED).json(newEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in creating email");
    }
};

//update email
const updateEmail = async(req, res) => {
    try {
        const { id } = req.params;
        const email_data = await Email_data.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!email_data) {
            return res.status(404).json({ msg: `No email with id : ${id}` });
        }
        const updateEmail = await Email_data.findById(id);
        res.status(200).json(updateEmail);
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in updating email");
    }
};

//delete email
const deleteEmail = async(req, res) => {
    try {
        const { id } = req.params;
        const email_data = await Email_data.findByIdAndDelete(id);

        if (!email_data) {
            return res.status(404).json({ msg: `No email with id : ${id}` });
        }
        res.status(200).json({ msg: "Email deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json("Error in deleting email");
    }
};

module.exports = {
    getEmails,
    getEmail,
    createEmail,
    updateEmail,
    deleteEmail
};