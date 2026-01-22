const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const Subscriber = require("./models/subscriber");
const app = express();



const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe_db");

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// // option 1
// let subscriber1 = new Subscriber({
//     name: "Jon Wexler",
//     email: "jon@jonwexler.com"
// });

// subscriber1.save()
// .then((savedDocument) => {
//     console.log(savedDocument);
// }).catch((error) => {
//     console.log(error);
// });

// // option 2
// Subscriber.create({
//   name: "Walter White",
//   email: "walter@white.com"
// })
// .then(savedDocument => {
//   console.log(savedDocument);
// })
// .catch(error => {
//   console.log(error);
// });

var myQuery = Subscriber.findOne({ name: "Jon Wexler" })
  .where("email", /wexler/);

myQuery
  .exec()
  .then(data => {
    if (data) console.log(data.name);
  })
  .catch(error => {
    console.error(error);
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

app.get("/name/:myName", homeController.respondWithName);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});