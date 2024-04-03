const SupplierService = require('../Service/Supplier.service.js');


const addSupplier = async (req, res) => {
    try{
        const {name , email , ContactNo , Address} = req.body;
        const newSupplier = await SupplierService.addSupplier(name ,Address , ContactNo ,  email  );
        res.status(201).json(newSupplier);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const updateSupplier = async (req , res) => {
    try{
        const SupplierID = req.params['id'];
        const {name , email , ContactNo , Address} = req.body;
        const supplier = await SupplierService.updateSupplier(SupplierID, name , email , ContactNo , Address);
        res.status(200).json(supplier);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const getSuppliers = async (req, res) => {
    try{
        const suppliers = await SupplierService.getSuppliers();
        res.status(200).json(suppliers);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const getSupplierByID = async (req, res) => {
    try{
        const id = req.params['id'];
        const supplier = await SupplierService.getSupplierByID(id);
        res.status(200).json(supplier);
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

const deleteSupplier = async (req , res) => {
    try{
        const id = req.params['id'];
        const supplier = await SupplierService.deleteSupplier(id);
        res.status(200).json({message: 'Supplier deleted successfully'});
    }catch(err){
        res.status(400).json({error: err});
        console.log(err.message);
    }
}

module.exports = {
    addSupplier,
    updateSupplier,
    getSuppliers,
    getSupplierByID,
    deleteSupplier

}

