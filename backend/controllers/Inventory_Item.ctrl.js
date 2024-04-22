const ItemService = require('../Service/Inventory_Item.service.js');

const addItem = async (req, res) => {
    try{
        const {name , description , Unit_Price , itemType , quantity} = req.body;
        const newItem = await ItemService.addItem(name , description , Unit_Price , itemType , quantity);
        res.status(200).json(newItem);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const getItems = async (req, res) => {
    try{
        const items = await ItemService.getItems();
        res.status(200).json(items);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const getItem = async (req, res) => {
    
    try{
        const id = req.params['id']
        console.log(id);
        const item = await ItemService.getItem(id);
        res.status(200).json(item);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const updateItem =  async (req, res) => {
    try{
        const id = req.params['id']
        const {description , Unit_Price , itemType , quantity} = req.body;
        const item = await ItemService.updateItem(id, description , Unit_Price , itemType , quantity);
        res.status(200).json(item);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const deleteItem = async (req, res) => {
    try{
        const id = req.params['id']
        const item = await ItemService.deleteItem(id);
        res.status(200).json(item);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}


module.exports = { 
    addItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}
