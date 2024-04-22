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
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], 
    default: 'Pending'
  },
  SupplierID: {
    type: String,
    required: true,
  },
  ItemArray : [{
    type: Object
  }],
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
