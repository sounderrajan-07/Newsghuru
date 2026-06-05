const mongoose = require("mongoose");

const newsSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    time: {
      type: String,
    },

    comments: {
      type: Number,
      default: 0,
    },

    views: {
      type: String,
      default: "0",
    },

  },
  {
    timestamps: true,
  });

module.exports =
  mongoose.model(
    "News",
    newsSchema
  );