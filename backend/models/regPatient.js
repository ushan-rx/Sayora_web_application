import mongoose from "mongoose";

// Define the schema for the regPatient collection
const regPatientSchema = new mongoose.Schema({
    regPatientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    allagies:[
        {
            type: String,
            required: true
        }
    ],
    familyHistory:[
        {   name:{type: String,required: true},
            relationship:{type: String,required: true},
        }
    ],
    currentMedications:[
        {   name:{type: String,required: true},
            dosage:{type: String,required: true},
            frequency:{type: String,required: true},
        }
    ],
    surgicalProcedures:[
        {   name:{type: String,required: true},
            date:{type: Date,required: true},
        }
    ],
    vitals:[
        {   checkdate:{type: Date,required: true},
            height:{type: Number,required: true},
            weight:{type: Number,required: true},
            temperature:{type: Number,required: true},
            bloodPressure:{type: String,required: true},
            pulseRate:{type: Number,required: true},
            respiratoryRate:{type: Number,required: true},
            oxygenSaturation:{type: Number,required: true},
        }
    ],
    dailyQuestions:[
        {   date:{type: Date,required: true},
            questionId:{type: String,required: true},
            mark:{type: Number,required: true},
        }
    ],
});

// Create the patient model
const Patient = mongoose.model('Patient', reg_patientSchema);

module.exports = Patient;