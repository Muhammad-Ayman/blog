const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  body: {
    type: String,
    required: [true, "Please provide Description"],
  },
  username: String,
  datePosted: {
    /* can declare property type with an object like this because we need 'default' */
    type: Date,
    default: new Date(),
  },
  image: {
    type: String,
    required: [true, "Please provide Image"],
  },
});
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
