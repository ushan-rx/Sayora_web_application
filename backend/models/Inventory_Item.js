const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  InventoryItemID: {
    type: String,
    required: true,
    unique: true 
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Unit_Price: {
    type: Number,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
