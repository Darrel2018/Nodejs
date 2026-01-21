const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const app = express();

//-----------

/*
Code Summary:
This Node.js script connects to a local MongoDB database named recipe_db 
using the MongoDB native driver. Once connected, it inserts a new document 
containing a name and email into the contacts collection. After the 
insertion, it retrieves all documents from the same collection and logs 
them to the console. The script includes basic error handling to stop 
execution if a connection, insertion, or query error occurs.
*/

const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);

    db.collection("contacts")
    .insert({
        name: "Freddie Mercury",
        email: "fred@queen.com"
    }, (error, db) => {
        if (error) throw error;
        console.log(db);
    });

    db.collection("contacts").find().toArray((error, data) => {
        if (error) throw error;
        console.log(data);
    });
});

//-----------

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