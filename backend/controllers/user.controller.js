const TempUser = require('../models/tempUser.model');
const User = require('../models/User');
// Import the controllers for doctor, staff, and patient
const doctorController = require('./doctor.controller');
const staffController = require('./staff.controller');
const patientController = require('./patient.controller');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const registerUser = async (req, res) => {
  const { tempId, firstName, lastName, password,phone, address, gender} = req.body;

  try {
    // Find the temporary user
    const tempUser = await TempUser.findOne({ tempUserId: tempId });
    if (!tempUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid tempId." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the User record
    const user = new User({
      firstName,
      lastName,
      email: tempUser.email,
      userType: tempUser.userType,
      role: tempUser.userRole,
      password: hashedPassword,
      phone,
      gender,
      address

    });

    const newUser = await user.save();

    // Prepare the common data for the userType specific models
    const commonData = {
      userId: newUser.userId,
      fName: firstName,
      lName: lastName,
      phone:phone,
      address:address,
      gender:gender,
     
    };

    const JobRole = tempUser.userRole;

    // Based on userType, call the respective function from the controllers
    switch (tempUser.userType) {
      case 'doctor':
        req.body = { ...commonData, ...req.body };
        doctorController.createDoctor(req, res);
        break;
      case 'staff':
   
        req.body = { ...commonData,JobRole,...req.body };
        staffController.createStaff(req, res);
        break;
      case 'patient':

        req.body = { ...commonData, ...req.body };
        patientController.createPatient(req, res);
        break;
      default:
        break;
    }

    // Remove the temporary user
    await TempUser.deleteOne({ tempUserId: tempId });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Registration failed." });
  }
};

module.exports = {
  registerUser,
};
