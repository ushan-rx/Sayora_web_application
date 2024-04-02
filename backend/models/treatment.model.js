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

const treatment = mongoose.model("Treatment", treatmentschema);

module.exports = treatment;