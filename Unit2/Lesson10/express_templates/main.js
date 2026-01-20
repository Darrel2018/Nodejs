const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const app = express();

// This line tells your Express.js application to set its view engine as ejs. This line is how your application knows to expect EJS in your views folder in your main project directory.
app.set("view engine", "ejs");

// get a port from env or use port 3000 if no env port.
app.set("port", process.env.PORT || 3000);
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.json());

app.get("/name/:myName", homeController.respondWithName);

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});