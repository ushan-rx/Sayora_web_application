const InventoryItem =require('../models/Inventory_Item.js')

//add inventory item
async function addItem( name , description , Unit_Price , itemType , quantity){
    const InventoryItemID = generateID();
    const newItem = new InventoryItem({
        InventoryItemID,
        name,
        description,
        Unit_Price,
        itemType,
        quantity
    });
    await newItem.save();
    return newItem;
}

//Get items
async function getItems(){
    return await InventoryItem.find();
}   

//Get one item
async function getItem(id){
    return await InventoryItem.findOne({InventoryItemID:id});
}

//Update item
async function updateItem(id, description , Unit_Price , itemType , quantity){
     await InventoryItem.findOneAndUpdate({InventoryItemID: id} , {description, Unit_Price, itemType, quantity});
     return InventoryItem.findOne({InventoryItemID: id});
}

//Delete item
async function deleteItem(id){
    return await InventoryItem.findOneAndDelete({InventoryItemID: id});
}


async function findID(accNo){
    const existinAccount = await InventoryItem.findOne({InventoryItemID:accNo});
    if(!existinAccount)
      return true
    else
      return false
  }


//Generating IDs
function generateID() {

    let chars = '00001'; // Characters to use for ID
    let accID = 'INV';
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


module.exports = {
    addItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}
