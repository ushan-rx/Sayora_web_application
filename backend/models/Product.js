const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  Product_ID: {
    type: String,
    required: true,
    unique: true 
  },
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
