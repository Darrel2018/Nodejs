const port = 3000;
const express = require("express");
const homeController = require("./controllers/homeController");
const app = express();

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/items/:vegetable", homeController.sendReqParams);

app.post("/", homeController.sendPostReq);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});