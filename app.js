const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const expressSession = require("express-session");

global.loggedIn = null;

const newUserCont = require("./controllers/newUser");
const newPostCont = require("./controllers/newPostCont.js");
const storePostCont = require("./controllers/storePostCont.js");
const getPostCont = require("./controllers/getPostCont.js");
const homeCont = require("./controllers/homeCont.js");
const validateMiddleWare = require("./middleware/validation.js");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");
const app = express();

const flash = require("connect-flash");
app.use(flash());
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSession({ secret: "keyboard cat" }));

app.use("*", (req, res, next) => {
  if (req.session.userId) {
    loggedIn = req.session.userId;
  }
  next();
});
app.get("/", homeCont);
app.get("/auth/logout", logoutController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserCont);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.get("/posts/new", authMiddleware, newPostCont);
app.get("/post/:id", getPostCont);
app.use("/posts/store", validateMiddleWare);
app.post("/posts/store", authMiddleware, storePostCont);
app.use((req, res) => res.render("notfound"));
app.listen(3000, () => console.log("Server is running on port 3000"));
