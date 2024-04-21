const ProductModel =  require('../models/Product');



async function findID(accNo){
    const existinAccount = await ProductModel.findOne({Product_ID:accNo});
    if(!existinAccount)
      return true
    else
      return false
  }


function generateID() {

    let chars = '0123456789'; // Characters to use for ID
    let accID = '';
    for (let i = 0; i < 8; i++) { 
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


async function addProduct(productName, description, stock, unitPrice, url){
    const Product_ID = generateID();
    const newProduct = new ProductModel({
        Product_ID,
        productName,
        description,
        stock,
        unitPrice,
        url
    });
    await newProduct.save();
    return newProduct;
}

async function getProducts(){
    return await ProductModel.find();
}

async function getProductByID(id){
    return await ProductModel.findOne({Product_ID:id});
}

async function updateProduct(id, productName, description, stock, unitPrice){
  try{
    await ProductModel.findOneAndUpdate({Product_ID: id}, {productName, description, stock, unitPrice});
  }catch(err){
    console.log(err);
  }
}


async function deleteProduct(id){
    return await ProductModel.findOneAndDelete({Product_ID: id});
}


module.exports = {
    addProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct
}