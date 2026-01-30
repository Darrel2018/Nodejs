const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const connectFlash = require("connect-flash");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe_db");

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(layouts);
app.use(express.static("public"));


app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.json());

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use("/", router);

router.use(expressSession({
    secret: "a_long_and_secure_secret_passcode",
    cookie: {
        maxAge: 4_000_000 // approx 1hr
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

// Home Routes
router.get("/", homeController.displayHomePage);

// Course Routes
router.get("/courses", coursesController.showCourses);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Subscriber Routes
router.get("/subscribers", subscribersController.showSubscribers);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

// User Routes
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});