const User = require("./models/user");

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const listsRoutes = require("./routes/lists");

dotenv.config();

console.log(process.env.MONGO_USER);
console.log(process.env.MONGO_PASSWORD);
console.log(process.env.MONGO_DATABASE_NAME);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/*---- Routes -----*/
app.use(authRoutes);
app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);
app.use("/lists", listsRoutes);

// app.use((req, res) => {
//   res.status(404).json({ message: "This page wasn't found" });
// });

app.use(helmet());
app.use(compression());

// error route
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ch9po.mongodb.net/${process.env.MONGO_DATABASE_NAME}`
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((error) => console.log(error));
