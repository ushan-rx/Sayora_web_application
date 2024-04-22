const SupplierModel = require('../models/Supplier.js');

async function findID(accNo){
    const existinAccount = await SupplierModel.findOne({SupplierID:accNo});
    if(!existinAccount)
      return true
    else
      return false
  }

  //Generating IDs
function generateID() {

    let chars = '00001'; // Characters to use for ID
    let accID = 'SUP';
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

//Add supplier
async function addSupplier(name, address, contact, email) {
    const SupplierID = generateID();
    const newSupplier = new SupplierModel({
        SupplierID,
        name,
        email,
        ContactNo: contact,
        Address: address
    });
    await newSupplier.save();
    return newSupplier;
}

async function getSuppliers() {
    return await SupplierModel.find();
}

async function getSupplierByID(id){
    return await SupplierModel.findOne({SupplierID:id});
}

async function updateSupplier(id, name, email ,contact,  address) {
    await SupplierModel.findOneAndUpdate({SupplierID: id}, {name, email, ContactNo: contact, Address: address});
    return SupplierModel.findOne({SupplierID: id});
}

async function deleteSupplier(id) {
    return await SupplierModel.findOneAndDelete({SupplierID: id});
}

//Exporting
module.exports = {
    addSupplier,
    getSuppliers,
    getSupplierByID,
    updateSupplier,
    deleteSupplier
}
