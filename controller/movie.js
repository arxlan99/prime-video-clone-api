const Movie = require("../models/movie");

exports.createMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const newMovie = new Movie(req.body);

      const savedMovie = await newMovie.save();

      res.status(201).json(savedMovie);
    } else {
      const error = new Error("You are not allowed to create users!.");
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

exports.updateMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json(updatedMovie);
    } else {
      const error = new Error("You are not allowed to see all users!.");
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

exports.deleteMovie = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(200).json("The movie has been deleted!");
    } else {
      const error = new Error("You are not allowed to deleted a movie!.");
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

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getRandomMovie = async (req, res, next) => {
  try {
    const type = req.query.type;
    let movie;

    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllMovies = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } else {
      const error = new Error("You are not allowed to see all movies!.");
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
