const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    
    doctorId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    
    //personal details
	fName: {
		type: String,
		required: true,
	},
	lName: {
		type: String,
		required: true,d
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
				type: String,
				required: true,
			},

		},
	],

	appointments: [             // doctor's regular appointment dates
		{
			day: {
				type: String,
				required: true,
			},
			StartTime: {
				type: String,
				required: true,
			},
			EndTime: {
				type: String,
				required: true,
			},
			maxPatients: {
				type: Number,
				required: true,
				min: 0,
			},
		},
	],
},
{ timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
