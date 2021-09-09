const router = require("express").Router();

const listController = require("../controller/list");
const isAuth = require("../middleware/is-auth");

// Create
router.post("/", isAuth, listController.createList);

// Delete
router.delete("/:id", isAuth, listController.deleteList);

// Get
router.get("/:id", isAuth, listController.getList);

module.exports = router;
