const express = require('express');
const ProductRouter = express.Router();

const ProductController = require('../controllers/Product.ctrl');
const upload = require('../utills/upload');


ProductRouter.post('/addProduct',upload.single('image') ,  ProductController.addProduct);
ProductRouter.get('/getProducts', ProductController.getProducts);
ProductRouter.get('/getProduct/:id', ProductController.getProductByID);
ProductRouter.put('/updateProduct/:id', ProductController.updateProduct);
ProductRouter.delete('/deleteProduct/:id', ProductController.deleteProduct);

module.exports = ProductRouter;