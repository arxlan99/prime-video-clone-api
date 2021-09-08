const router = require("express").Router();
const authContoller = require("../controller/auth");

const User = new require("../models/user");
const { body } = require("express-validator");

// /register => POST
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email adress already exist!!!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().notEmpty().isEmpty(),
  ],
  authContoller.register
);

// /login => POST
router.post("/login", authContoller.login);

module.exports = router;
