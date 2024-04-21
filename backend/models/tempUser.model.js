const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    tempUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, default: 'patient' },
    userRole: { type: String,  default: 'patient' }
    
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;