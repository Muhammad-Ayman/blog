const BlogPost = require("../models/BlogPost.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      throw new Error("No image uploaded");
    }
    let image = req.files.image;

    // Move the image file to the destination directory
    await image.mv(path.resolve(__dirname, "..", "public/img", image.name));

    // Create a new BlogPost
    const result = await BlogPost.create({
      ...req.body,
      image: "/img/" + image.name,
    });
    console.log(result);

    // Redirect after successful creation
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    // Handle errors
    const validationErrors =
      error.errors && typeof error.errors === "object"
        ? Object.keys(error.errors).map((key) => error.errors[key].message)
        : error.message;
    console.log(validationErrors);
    req.flash("validationErrors", validationErrors);
    req.flash("data", req.body);
    res.redirect("/posts/new");
  }
};
