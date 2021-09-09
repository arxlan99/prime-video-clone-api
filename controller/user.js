const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.updateUser = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json({ updatedUser: updatedUser });
    } else {
      const error = new Error("You can update only your account!.");
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

exports.deleteUser = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      const deletedUser = await User.findByIdAndUpdate(req.params.id);
      res.status(200).json({ message: "User has been deleted" });
    } else {
      const error = new Error("You can delete only your account!.");
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

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(201).json({ ...info });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  try {
    if (req.user.isAdmin) {
      const users = query
        ? await User.find.limit(10)(req.params.id)
        : await User.find();
      res.status(200).json(users);
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

exports.getUserStats = async (req, res, next) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear - 1);

  var month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
