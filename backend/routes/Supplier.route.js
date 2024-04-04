const express = require('express');
const SupplierRoute = express.Router();
const SupplierController = require('../controllers/Supplier.ctrl.js')

//Get supplier details
SupplierRoute.get('/suppliers', SupplierController.getSuppliers);

//Getting one supplier details
SupplierRoute.get('/supplier/:id', SupplierController.getSupplierByID);

//Add new supplier
SupplierRoute.post('/addsupplier', SupplierController.addSupplier);

//Update supplier details
SupplierRoute.put('/updatesupplier/:id', SupplierController.updateSupplier);

//Delete one supplier
SupplierRoute.delete('/deletesupplier/:id', SupplierController.deleteSupplier);

module.exports = SupplierRoute;