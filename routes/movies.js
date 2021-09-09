const router = require("express").Router();

const movieController = require("../controller/movie");
const isAuth = require("../middleware/is-auth");

// Create
router.post("/", isAuth, movieController.createMovie);

// Update
router.put("/:id", isAuth, movieController.updateMovie);

// Delete
router.delete("/:id", isAuth, movieController.deleteMovie);

// Get
router.get("/find/:id", isAuth, movieController.getMovie);

// Get Random
router.get("/random",isAuth, movieController.getRandomMovie);

// Get All
router.get("/",isAuth, movieController.getAllMovies);



module.exports = router;
