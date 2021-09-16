const List = require("../models/list");

exports.createList = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } else {
      const error = new Error("You are not allowed to create a list!.");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteList = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted!");
    } else {
      const error = new Error("You are not allowed to delete a list!.");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getList = async (req, res, next) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
