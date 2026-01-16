const port = 3000;

// You require Express.js by referring to the module name express and storing it as a constant. express offers a library of methods and functionality, including a class with built-in web server functionality. 
const express = require("express");

// We call the express function which returns an object that we store in a reference varible. The returned object is known as an express application or express instance. It will then have access to methods from express e.g web server functionality methods. (http methods like GET, POST, ect)
const app = express();

app.get("/", (req, res) => {
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    console.log("req.url", req.url);
    console.log("req.query", req.query);
    res.send("Hello, Universe!");
});

// .listen() method creates the server and waits for incoming requests.
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});