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
	contacts: {
		phonePrimary: {
			type: String,
			required: true,
		},
		phoneSecondary: {
			type: Number,
			min: 0,
		},
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
		country: {
			type: String,
			required: true,
		},
	},

	NIC: {
		type: String,
		required: [true,'Please provide NIC']
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
			trName: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Treatment',
			},

		},
	],

	appointments: [             // doctor's regular appointment dates
		{
			day: {
				type: String,
			},
			StartTime: {
				type: String,
			},
			EndTime: {
				type: String,
			},
			maxPatients: {
				type: Number,
				min: 0,
			},
		},
	],
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
	console.log(lastDoc[0].doctorId);
	// Generate the new custom ID
	let newId = customIdPrefix;
	if (lastDoc) {
	  const currentNumber = parseInt(lastDoc[0].doctorId.slice(customIdPrefix.length));
	  newId += String(currentNumber + 1).padStart(length, '0');
	} else {
	  newId += "0001";
	}
	this.doctorId = newId;
	console.log(newId);
	next();

  });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
