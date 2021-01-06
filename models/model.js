const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
