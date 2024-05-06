const mongoose = require("mongoose");


const AddServicesSchema = new mongoose.Schema({

        serviceId: {
            type: String
        },


        sess_name: {
            type: String,
            required: [true, "Please provide session name"]
        },
        sess_description: {
            type: String,
            required: [true, "Please provide session description"]
        },
        selectedDoctor: {
            type: String,
            required: [true, "Please provide host doctor id"]
        },

        status: {
            type: String,
            required: [true, "Please provide status"]
        }
    },

    {
        timestamps: true
    }
);

//for id generation
const customIdPrefix = 'Ser';
const length = 3;

// Pre-save hook to generate id
AddServicesSchema.pre('validate', async function(next) {
    const MyModel = this.constructor;
    // Find the last document with a custom ID starting with the provided prefix
    let lastDoc = await MyModel.find({ serviceId: { $exists: true } }).sort({ _id: -1 }).limit(1);

    // Generate the new custom ID
    let newId = customIdPrefix;
    if (lastDoc && lastDoc.length > 0 && lastDoc[0] && lastDoc[0].serviceId) {
        console.log(lastDoc[0].serviceId);
        const currentNumber = parseInt(lastDoc[0].serviceId.slice(customIdPrefix.length));
        newId += String(currentNumber + 1).padStart(length, '0');
    } else {
        newId += "001";
    }

    this.serviceId = newId;
    console.log(newId);
    next();
});

const Service = mongoose.model("Service_data", AddServicesSchema);

module.exports = Service;