module.exports = (req, res) => {
  if (req.session.userId) {
    var title = "";
    var description = "";
    const data = req.flash("data")[0];
    if (typeof data != "undefined") {
      title = data.title;
      description = data.description;
    }
    return res.render("create", {
      errors: req.flash("validationErrors"),
      title: title,
      description: description,
    });
  }

  res.redirect("/auth/login");
};
