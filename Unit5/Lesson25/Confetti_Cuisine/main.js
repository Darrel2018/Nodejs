const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const userController = require("./controllers/userController");
const courseController = require("./controllers/coursesController");
const methodOverride = require("method-override");
const User = require("./models/user");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const passport = require("passport");
const app = express();
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/confetti_cuisine");

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

mongoose.connection.on("error", error => {
  console.log(`MongoDB connection error: ${error.message}`);
});

app.use(
    express.urlencoded({
        extended: false
    }),
);
app.use(express.json());

app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

router.use(expressSession({
    secret: "secretCuisine123",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated(); // Passport method to check if user is logged in
    res.locals.currentUser = req.user; // The logged-in user object
    next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", router);

// Home routes
app.get("/", homeController.displayHomePage);
app.get("/courses", homeController.showCourses);

// Subscriber routes
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete",subscribersController.delete, subscribersController.redirectView);

// User routes
router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.validate, userController.create, userController.redirectView);
router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate, userController.redirectView);
router.get("/users/logout", userController.logout, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);


// ===============================================================================================================
//                    COURSE ROUTES
// ===============================================================================================================

router.get("/courses", courseController.showCourses);
router.get("/courses/new", courseController.new);
router.post(
  "/courses/create",
  courseController.create,
  courseController.redirectView
);
router.get("/courses/:id", courseController.show, courseController.showView);
router.get("/courses/:id/edit", courseController.edit);
router.put(
  "/courses/:id/update",
  courseController.update,
  courseController.redirectView
);
router.delete(
  "/courses/:id/delete",
  courseController.delete,
  courseController.redirectView
);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

/*
Code Summary

This code sets up a basic Node.js web server using Express and connects it to a MongoDB database with Mongoose. The application uses EJS as its 
templating engine along with express-ejs-layouts to manage page layouts.

Key features include:
Database Connection: Connects to a local MongoDB database named confetti_cuisine.

Middleware Configuration:
Parses URL-encoded and JSON request bodies.
Serves static files from the public directory.

App Configuration:
Sets the server port (defaulting to 3000).
Configures EJS as the view engine.

Routing:
Renders the home page at /.
Displays courses using homeController.showCourses.
Handles subscriber-related routes, including viewing subscribers, showing a contact/subscription page, and saving new subscribers.

Error Handling:
Uses custom controllers to handle 404 (page not found) and 500 (internal server) errors.

Server Startup:
Starts the server and logs the running URL to the console.
Overall, this application follows an MVC-style structure, separating routing logic, controllers, views, and database interactions for better 
organization and maintainability.
*/