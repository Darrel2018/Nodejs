const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const app = express();

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

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/courses", homeController.showCourses);
// app.get("/contact", homeController.showSignUp);
// app.post("/contact", homeController.postedSignUpForm);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

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