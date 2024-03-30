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
		required: true,
	},
	contacts: [
		{
			phonePrimary: {
				type: String,
				required: true,
			},
			phoneSecondary: {
				type: Number,
				required: true,
				min: 0,
			},
		},
	],

	address: {
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},

	NIC: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},

	specialization: [  // doctor's specialization list
		{
			name: {
				type: String,
				required: true,
			},
		},
	],

	description: {
		type: String,
	},

	experience: {
		type: Number,
		required: true,
	},
	availability: {      // doctor is active or not
		type: Boolean,
		required: true,
	},

	treatments: [        // treatment list
		{
			trName: {
				type: String,
				required: true,
			},

			// cost: {
			//   type: Number,
			//   required: true,
			//   min: 0
			// }
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
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
