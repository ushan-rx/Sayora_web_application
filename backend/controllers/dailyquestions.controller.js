const DailyQuestions = require("../models/DailyQuestions");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

//create new daily question
const createQuestion = async (req, res) => {
  try {
    const question = new DailyQuestions(req.body);
    const newQuestion = await question.save();
    res.status(StatusCodes.CREATED).json(newQuestion);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// get daily question using question id
const getSingleQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  console.log(questionId);
  try {
    const question = await DailyQuestions.findOne({ questionId: questionId });
    if (!question) {
      throw new CustomError.NotFoundError(
        `No question with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ question });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

//update daily question using question id
const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  try {
    const question = await DailyQuestions.findOneAndUpdate(
      { questionId: questionId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!question) {
      throw new CustomError.NotFoundError(
        `No question with id : ${req.params.id}`
      );
    }
    res.status(StatusCodes.OK).json({ question });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// delete daily question from database
const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  try {
    const question = await DailyQuestions.findOneAndDelete({
      questionId: questionId,
    });
    if (!question) {
      throw new CustomError.NotFoundError(`No question with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ question });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// get all daily questions
const getAllQuestion = async (req, res) => {
  try {
    const question = await DailyQuestions.find();
    res.status(StatusCodes.OK).json({ question });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = {
  getAllQuestion,
  createQuestion,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
