const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  SupplierID: {
    type: String,
    required: true,
    unique: true 
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  ContactNo: [{
    type: Number
  }],
  Address: {
    type: String,
    required: true
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
