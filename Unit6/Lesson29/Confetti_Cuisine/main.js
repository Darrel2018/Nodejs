const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const User = require("./models/user");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const passport = require("passport");
const app = express();
// const router = express.Router();
const router = require("./routes/index");

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

app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

app.use(expressSession({
    secret: "secretCuisine123",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated(); // Passport method to check if user is logged in
    res.locals.currentUser = req.user; // The logged-in user object
    next();
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", router);

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