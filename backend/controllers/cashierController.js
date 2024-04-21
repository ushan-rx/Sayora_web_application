const asyncHandler = require('express-async-handler');

const Cashier = require('../models/cashierModel')

const getCashiers = asyncHandler(async (req, res) => {

    const cSearch = req.query.search
    //testing
    //console.log(vSearch)
    let cashiers

    if(cSearch){
        cashiers = await Cashier.find(
            {
                $text: { $search: cSearch }
            }
        )
    }
    else{
         cashiers = await Cashier.find();
    }
    
    res.status(200).json(cashiers);

})
  
const getOneCashier = asyncHandler(async (req, res) => {
    const cashier = await Cashier.findById(req.params.id)
  
    if (cashier) {
        res.status(200).json(cashier)
    } else {
        res.status(404)
        throw new Error('Casgier not found')
    }
})
  
const createCashier = asyncHandler(async (req, res) => {
    const { patientId, patientName,docName, docFee, treatmentName, treatmentFee, discount, total } = req.body;

    try {
        const cashier = new Cashier({
            patientId: patientId,
            patientName: patientName,
            docName: docName,
            docFee: docFee,
            treatmentName: treatmentName,   
            treatmentFee: treatmentFee,
            discount: discount,
            total: total
        });

        const savedCashier = await cashier.save(); // Corrected this line

        res.status(200).json(savedCashier);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create cashier', error: error.message });
    }
});

  
const updateCashier = asyncHandler(async (req, res) => {

    const cashier = await Cashier.findById(req.params.id)
  
    if (cashier) {
  
        const updatedCashier = await Cashier.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedCashier)

    } else {
        res.status(404)
        throw new Error('Cashier not found')
    }
  })
const deleteCashier = asyncHandler(async (req, res) => {
    const cashier = await Cashier.findById(req.params.id)
  
    if (cashier) {
        await cashier.deleteOne();
        res.status(200).json({message: 'Cashier removed'})
    } else {
        res.status(404)
        throw new Error('Cashier not found')
    }
})

module.exports = {getCashiers, getOneCashier, createCashier, updateCashier, deleteCashier}