module.exports = {
    sendReqParams : (req, res) => {
        let veg = req.params.vegetable;
        console.log("Params: ", req.params);
        res.send(`This is the page for ${veg}`);
    },
    sendPostReq : (req, res) => {
        console.log("req.body: ", req.body);
        console.log("req.query: ", req.query);
        res.send("POST Successful!");
    },
}