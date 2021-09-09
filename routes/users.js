const router = require("express").Router();

const userController = require("../controller/user");
const isAuth = require("../middleware/is-auth");

// Update
router.put("/:id", isAuth, userController.updateUser);

// Delete
router.delete("/:id", isAuth, userController.deleteUser);

// Get
router.get("/find/:id", userController.getUser);

// Get All
router.get("/", isAuth, userController.getAllUsers);

// Get User Stats
router.get("/stats", userController.getUserStats);

module.exports = router;
