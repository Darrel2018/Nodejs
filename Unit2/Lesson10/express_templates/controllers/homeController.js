module.exports = {
    respondWithName : (req, res) => {
        let paramsName = req.params.myName; // Assign a local varible to a request
        res.render("index", { name: paramsName }); // Pass a local varible to a rendered view.
    },
}