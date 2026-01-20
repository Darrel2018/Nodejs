const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const app = express();

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