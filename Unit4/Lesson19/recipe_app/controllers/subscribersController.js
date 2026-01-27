const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

module.exports = {
  getAllSubscribers : (req, res, next) => {
    Subscriber.find({})
      .exec()
      .then(subscribers => {
        req.data = subscribers;
        next();
      })
      .catch(error => {
        console.log(error.message);
        next(error);
      })
      .then(() => {
        console.log("promise complete");
      });
  },

  displaySubscribers : (req, res, next) => {
    console.log(req.data);
  //   res.send(req.data);
      res.render("subscribers", {subscribers: req.data});
  },

  getSubscriptionPage : (req, res) => {
    res.render("contact");
  },
  
  saveSubscriber : (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save() // No callback - returns a Promise
    .then((result) => {
      res.render("thanks");
    })
    .catch((error) => {
      res.send(error);
    });
  },
};