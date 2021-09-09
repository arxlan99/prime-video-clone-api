const User = require("./models/user");

const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const listsRoutes = require("./routes/lists");

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/*---- Routes -----*/
app.use(authRoutes);
app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);
app.use("/lists", listsRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: "This page wasn't found" });
// });

// error route
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(8080);
  })
  .catch((error) => console.log(error));
