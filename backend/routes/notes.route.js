const express = require('express');
const router = express.Router();


const{ createNote, getManyNotes} = require('../controllers/notes.controller');

router.route('/').post(createNote);      // '/notes'
router.route('/patient/:id').get(getManyNotes); // '/patient/:id'

module.exports = router;