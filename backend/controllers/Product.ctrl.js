const ProducrService =  require('../Service/Product.service');


const addProduct = async (req, res) => {   
    try{
        const {productName, description, stock, unitPrice} = req.body;
        let url;
        if(!req.file){
            return res.status(400).json({message: 'Please upload an image'});
        }
        else{
             url = req.file.path;
        }
        const newProduct = await ProducrService.addProduct(productName, description, stock, unitPrice, url);
        res.status(201).json(newProduct);
    }catch(err){
        console.log(err);
    }
}


const getProducts = async (req, res) => {
    try{
        const products = await ProducrService.getProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}

const getProductByID = async (req, res) => {
    try{
        const id = req.params['id'];
        const product = await ProducrService.getProductByID(id);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}

const updateProduct = async (req, res) => {
    try{
        const {productName, description, stock, unitPrice} = req.body;
        const id = req.params['id'];
        await ProducrService.updateProduct(id, productName, description, stock, unitPrice);
        res.status(200).json({message: 'Product updated successfully'});
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }

}

const deleteProduct = async(req, res) => {
    try{
        const id = req.params['id'];
        await ProducrService.deleteProduct(id);
        res.status(200).json({message: 'Product deleted successfully'});
    }catch(err){
        res.status(400).json({message: err.message});
        console.log(err);
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct
}