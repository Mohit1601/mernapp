const express = require("express");
const router = express.Router();

const BlogPostSchema = require("../models/model");
const { savePost } = require("../controllers/api");

router.get("/", (req, res) => {
  BlogPostSchema.find((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    console.log(data);
    res.json(data);
  });
});

router.post("/save", savePost);
module.exports = router;
