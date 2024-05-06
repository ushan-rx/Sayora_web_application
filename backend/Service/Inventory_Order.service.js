const OrderModel = require('../models/Inventory_Order.js');


async function findID(accNo){
    const existinAccount = await OrderModel.findOne({OrderID:accNo});
    if(!existinAccount)
      return true
    else
      return false
  }


function generateID() {

    let chars = '63021'; // Characters to use for ID
    let accID = 'IOR';
    for (let i = 0; i < 5; i++) { 
      accID += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log(accID);
    // Check if ID has already been generated
    const existingAccNO = findID(accID);
  
    if (!existingAccNO) {
      return generateID();
    } else {
      let fAcc = accID.toString();
      return fAcc
    }
  }

//Add inventory order
async function addOrder(SupplierID, ItemArray, OrderTotal){
    console.log(SupplierID, ItemArray, OrderTotal);
    const OrderID = generateID();
    const newOrder = new OrderModel({
        OrderID,
        SupplierID,
        ItemArray,
        OrderTotal
    });
    await newOrder.save();
    return newOrder;
}

//Get all inventory orders
async function getOrders(){
    return await OrderModel.find();
}  

//Get one inventory order
async function getOrder(id){
    return await OrderModel.findOne({OrderID:id});
}

//Update inventory order
async function updateOrder(id , status , ItemArray , SupplierID){
    await OrderModel.findOneAndUpdate({OrderID: id} , {OrderStatus: status , ItemArray , SupplierID});
}

//Delete inventory order
async function deleteOrder(id){
    await OrderModel.findOneAndDelete({OrderID: id});
}

module.exports = {
    addOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
}