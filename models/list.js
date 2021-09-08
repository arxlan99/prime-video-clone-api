const mongoose = require("mongoose");

const listSchmea = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    imgTitle: {
      type: String,
    },
    imgSmall: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: String,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchmea);
