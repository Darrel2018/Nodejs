const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
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

app.use("/", router);

router.get("/subscribers", subscribersController.getAllSubscribers, subscribersController.displaySubscribers);
router.get("/contact", subscribersController.getSubscriptionPage);
router.post("/subscribe", subscribersController.saveSubscriber);

router.get("/users", usersController.index, usersController.indexView);

router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});