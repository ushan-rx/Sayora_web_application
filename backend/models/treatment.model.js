const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const treatmentschema = new Schema({
    treatmentId:{
	    type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
});


//for id generation
const customIdPrefix = 'TRE';
const length = 5;


// Pre-save hook to generate id
treatmentschema.pre('validate', async function (next) {
	const MyModel = this.constructor; 
	// Find the last document with a custom ID starting with the provided prefix
	let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
	// Generate the new custom ID
	let newId = customIdPrefix;
	if (lastDoc[0]) {
	  const currentNumber = parseInt(lastDoc[0].treatmentId.slice(customIdPrefix.length));
	  newId += String(currentNumber + 1).padStart(length, '0');
	} else {
	  newId += "00001";
	}
	this.treatmentId = newId;
	next();
  });

const treatment = mongoose.model("Treatment", treatmentschema);

module.exports = treatment;