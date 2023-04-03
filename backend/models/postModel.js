const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  subDescription: {
    type: String,
    required: false,
  },
  slug: {type: String, required: true},
  category: [String],
  tag: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
