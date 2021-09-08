const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    var newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    console.log(result);
    res.status(201).json({ message: "User created", userId: result._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw errow;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    const { password: userPassword, ...info } = user._doc;

    res.status(200).json(info, accessToken);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
