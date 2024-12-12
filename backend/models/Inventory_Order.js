const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  OrderID: {
    type: String,
    required: true,
    unique: true 
  },
  OrderDate: {
    type: Date,
    default: Date.now 
  },
  OrderStatus: {
    type: String,
    enum: ['Pending', 'Completed'], 
    default: 'Pending'
  },
  SupplierID: {
    type: String,
    required: true,
  },
  ItemArray : [{
    type: Object
  }],
  OrderTotal : {
    type: Number,
    required: true
  }
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
