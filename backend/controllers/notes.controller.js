const Notes = require('../models/notes.model');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create new note
const createNote = async (req, res) => {
  try {
    const note = new Notes(req.body);
    const newNote = await note.save();
    res.status(StatusCodes.CREATED).json(newNote);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

//get notes by patient id
const getManyNotes = async (req, res) => {
  const {id: patientId} = req.params;
  try {
    const notes = await Notes.find({patientId: patientId});
    if (!notes) {  
      throw new CustomError.NotFoundError(
        `No notes for patient with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ notes });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};


module.exports = { createNote, getManyNotes};