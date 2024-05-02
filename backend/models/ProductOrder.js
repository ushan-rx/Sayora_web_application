const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  ProductOrder_ID: {
    type: String,
    required: true,
    unique: true 
  },
  Total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
    default: 'Pending'
  },
  Approve : {
    type: Boolean,
    default: false
  }, 
  patientId:{
    type: String,
  },
  OrderDate: {
    type: Date,
    default: Date.now 
  },
  CustomerName : {
    type: String,
    required: true
  },
  CustomerEmail : {
    type: String,
    required: true
  },
  CustomerAddress : {
    type: String,
    required: true
  },
  ProductArray : [{
    type: Object,
    required: true
  }]
});


const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);

module.exports = ProductOrder;

