const mongoose = require("mongoose");

const cashSchema = mongoose.Schema({
    patientId: {
        type: String,
        unique: true,
    },
    patientName: {
        type: String,
        required:  [true, 'Please add surgeon name']
    },
    docName: {
        type: String,
        required:  [true, 'Please name']
    },
    docFee: {
        type: String,
        required: [true, 'Please add veterinary surgeon name']
    },
    treatmentName: {
        type: String,
        required:  [true, 'Please add  name']
    },
    
    treatmentFee: {
        type: String,
        required: [true, 'Please add telephone number']
    },
    discount: {
        type: String,
        required: [false, 'Please add email address']
    },
    total: {
        type: String,
        required: [false, 'Please add experience']
    },
}, {
    timestamps: true
})

cashSchema.index({
    patientId: 'text',
    patientName: 'text',
    docName: 'text',
    docFee: 'text',
    treatmentName: 'text',  
    treatmentFee: 'text',
    discount: 'text',
    total: 'text',
    
})

module.exports = mongoose.model('Cashier', cashSchema);
