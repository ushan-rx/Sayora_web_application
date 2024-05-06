const express = require("express");
const UserModel = require('../models/User');

const router = express.Router()


router.get('/:id', async (req, res) => {
    const user = await UserModel.findOne({userId: req.params.id});
    res.json(user);
});

module.exports = router;