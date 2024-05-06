const express = require('express');
const ItemRouter = express.Router();
const ItemController = require('../controllers/Inventory_Item.ctrl.js')

// GET all inventory items  
ItemRouter.get('/items', (req, res) => {
    ItemController.getItems(req, res);
});

// GET a specific inventory item by ID
ItemRouter.get('/item/:id', ItemController.getItem);

// POST a new inventory item
ItemRouter.post('/additem', ItemController.addItem);

// PUT/update an existing inventory item
ItemRouter.put('/updateitem/:id',ItemController.updateItem);

// DELETE an inventory item
ItemRouter.delete('/deleteitem/:id', ItemController.deleteItem);

module.exports = ItemRouter;
