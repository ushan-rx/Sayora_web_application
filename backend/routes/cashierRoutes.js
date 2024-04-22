const express = require('express');
const router = express.Router();

const {getCashiers, getOneCashier, createCashier, updateCashier, deleteCashier} = require('../controllers/cashierController')


router.get('/', getCashiers)
router.get('/:id', getOneCashier)

router.post('/', createCashier)
router.put('/:id', updateCashier)
router.delete('/:id', deleteCashier)

module.exports = router;