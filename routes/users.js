const router = require("express").Router;
const User = require("../models/user");
const userController = require("../controller/user");

// Update
router("/:id", userController.updateUser);

// Delete
router("/:id", userController.deleteUser);

// Get
router("/:id", userController.getUser);

// Get All
router("/", userController.getAllUsers);

//Get User Stats
router("/stats", userController.getUserStats);
