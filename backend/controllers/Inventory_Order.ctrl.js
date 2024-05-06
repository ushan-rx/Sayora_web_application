const OrderService = require('../Service/Inventory_Order.service.js');

//Add new inventory order
const addOrder = async (req, res) => {
    try{
        const {SupplierID, ItemArray , OrderTotal} = req.body;
        const newOrder = await OrderService.addOrder( SupplierID, ItemArray , OrderTotal);
        res.status(200).json(newOrder);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

//Get all inventory orders
const getOrders = async (req, res) => {
    try{
        const orders = await OrderService.getOrders();
        res.status(200).json(orders);
    }catch(err) {
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

//Get one inventory order
const getOrderByID = async(req ,res) =>{
    try{
        const order = await OrderService.getOrder(req.params.id);
        res.status(200).json(order);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

//Update inventory order
const updateOrder = async(req ,res) =>{
    try{
        const ID = req.params['id'];
        const {status , ItemArray , SupplierID} = req.body;
        await OrderService.updateOrder(ID , status , ItemArray , SupplierID);
        
        res.status(200).json({status: "Inventory Order Updated"});
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}   

//Delete inventory order
const deleteOrder = async(req ,res) =>{
    try{
        const ID = req.params['id'];
        await OrderService.deleteOrder(ID);
        res.status(200).json({status: "Order Deleted"});
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}


module.exports = {
    addOrder,
    getOrders,
    getOrders,
    updateOrder,
    getOrderByID,
    deleteOrder
}
