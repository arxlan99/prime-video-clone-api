const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => console.log(err));
