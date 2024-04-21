const express = require('express');
const ProductOrderRouter = express.Router();
// const ProductOrder = require('../models/ProductOrder'); // Adjust the path as necessary

const ProductOrder = require('../models/ProductOrder'); // Ensure you've imported your ProductOrder model

async function findID(accID) {
    const existingOrder = await ProductOrder.findOne({ ProductOrder_ID: accID });
    if(!existingOrder)
      return true
    else
      return false
}


function generateID() {
    let chars = '123456'; // Expanded set for better uniqueness
    let accID = 'PO';
    for (let i = 0; i < 5; i++) { 
        accID += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const isValid = findID(accID);
    if (isValid) {
        return accID; // If valid, return the generated ID
    } else {
        return generateID(); // Recurse if not valid
    }
}


// Add a new Product Order
ProductOrderRouter.post('/productorders', async (req, res) => {
  try {
    const newOrder = new ProductOrder({
      ProductOrder_ID: generateID(),
      Total_price: req.body.Total_price,
      CustomerName: req.body.CustomerName,
      CustomerEmail: req.body.CustomerEmail,
      CustomerAddress: req.body.CustomerAddress,
      ProductArray: req.body.ProductArray,
    });
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update the 'Approve' status
ProductOrderRouter.put('/productorders/approve/:id', async (req, res) => {
    try {
      const order = await ProductOrder.findByIdAndUpdate(
        req.params.id,
        { $set: { Approve: req.body.Approve } },
        { new: true }
      );
      res.send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Update the 'status' field
ProductOrderRouter.put('/productorders/status/:id', async (req, res) => {
  try {
    const order = await ProductOrder.findByIdAndUpdate(
        req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an Order
ProductOrderRouter.delete('/productorders/:id', async (req, res) => {
  try {
    const order = await ProductOrder.findOneAndDelete({ ProductOrder_ID: req.params.id });
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all Orders
ProductOrderRouter.get('/productorders', async (req, res) => {
  try {
    const orders = await ProductOrder.find({});
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get an Order by ProductOrder_ID
ProductOrderRouter.get('/productorders/:id', async (req, res) => {
    try {
      const order = await ProductOrder.findById(req.params.id);
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = ProductOrderRouter;
