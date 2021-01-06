const BlogPostSchema = require("../models/model");

exports.savePost = (req, res) => {
  const newPost = new BlogPostSchema(req.body);
  newPost
    .save()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
