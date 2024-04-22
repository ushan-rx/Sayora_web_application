const OrderController = require('../controllers/Inventory_Order.ctrl');
const express = require('express');
const Order = require('../models/Inventory_Order');
const OrderRouter = express.Router();

//Add inventory order
OrderRouter.post('/addorder', OrderController.addOrder);

//Get all inventory orders
OrderRouter.get('/orders', OrderController.getOrders);

//Get one inventory order
OrderRouter.get('/order/:id', OrderController.getOrderByID);

//Update inventory order
OrderRouter.put('/updateorder/:id', OrderController.updateOrder);

//Delete inventory order
OrderRouter.delete('/deleteorder/:id', OrderController.deleteOrder);

module.exports = OrderRouter;
