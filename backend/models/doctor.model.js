const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    
    doctorId: {
        type: String,     
        required: true,
    },
    userId: {
        type: String,   
    },
    
    //personal details
	fName: {
		type: String,
		required: true,
	},
	lName: {
		type: String,
		required: true,
	},
	phone: {
			type: String,
			required: true,
	},

	address: {
		street: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
	},
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},

	specialization: [  // doctor's specialization list
		{
			name: {
				type: String,
			},
		},
	],

	description: {
		type: String,
		maxlength: [1000, 'Description can not be more than 1000 characters'],
	},

	experience: {
		type: Number,
	},
	availability: {      // doctor is active or not
		type: Boolean,
		required: true,
		default: true,
	},
	treatments: [        // treatment list        populate this
		{
			treatmentId: {
				type: String,
			},
		},
	],
	appointmentPrice: {
		type: String,
	},
	profilePic: {
		type: String,
	},
	status: {                       //for delete purpose
		type: Boolean,
		default: true,
	}
},
{ timestamps: true });


//for id generation
const customIdPrefix = 'DOC';
const length = 5;


// Pre-save hook to generate id
doctorSchema.pre('validate', async function (next) {
	const MyModel = this.constructor; 
	// Find the last document with a custom ID starting with the provided prefix
	let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
	// Generate the new custom ID
	let newId = customIdPrefix;
	if (lastDoc[0]) {
	  const currentNumber = parseInt(lastDoc[0].doctorId.slice(customIdPrefix.length));
	  newId += String(currentNumber + 1).padStart(length, '0');
	} else {
	  newId += "00001";
	}
	this.doctorId = newId;
	next();
  });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
