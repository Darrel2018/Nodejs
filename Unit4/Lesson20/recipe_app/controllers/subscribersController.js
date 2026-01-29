const mongoose = require("mongoose");
const Subscriber = require("../models/subscriber");

module.exports = {
  // getAllSubscribers : (req, res, next) => {
  //   Subscriber.find({})
  //     .exec()
  //     .then(subscribers => {
  //       req.data = subscribers;
  //       next();
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //       next(error);
  //     })
  //     .then(() => {
  //       console.log("promise complete");
  //     });
  // },

  // displaySubscribers : (req, res, next) => {
  //   console.log(req.data);
  // //   res.send(req.data);
  //     res.render("subscribers/index", {subscribers: req.data});
  // },

  // getSubscriptionPage : (req, res) => {
  //   res.render("subscribers/index");
  // },

  // saveSubscriber : (req, res) => {
  //   let newSubscriber = new Subscriber({
  //       name: req.body.name,
  //       email: req.body.email,
  //       zipCode: req.body.zipCode
  //   });

  //   newSubscriber.save() // No callback - returns a Promise
  //   .then((result) => {
  //     res.render("thanks");
  //   })
  //   .catch((error) => {
  //     res.send(error);
  //   });
  // },

  showSubscribers: async (req, res) => {

    let subscribers = await Subscriber.find({});

    res.render("subscribers/index", {
      subscribers: subscribers
    });
  },

  new: (req, res) => {
    res.render("subscribers/new");
  },

  create: async (req, res, next) => {
    try {
      let subscriberParams = {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode,
      };

      const subscriber = await Subscriber.create(subscriberParams);
      res.locals.redirect = "/subscribers";
      res.locals.subscriber = subscriber;
      next();
    } catch (error) {
      console.log(`Error saving subscriber: ${error.message}`);
      next(error);
    }
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: async (req, res, next) => {
    try {
      let subscriberId = req.params.id;
      const subscriber = await Subscriber.findById(subscriberId);
      res.locals.subscriber = subscriber;
      next();
    } catch (error) {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    }
  },

  showView: (req, res) => {
    res.render("subscribers/show");
  },

  edit: async (req, res, next) => {
    let subscriberId = req.params.id;

    try {
      let subscriber = await Subscriber.findById(subscriberId);
      res.render("subscribers/edit", { subscriber: subscriber });
    } catch (error) {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    }
  },

  update: async (req, res, next) => {
    let subscriberId = req.params.id;

    let subscriberParams = {
      name: req.body.name,
      email: req.body.email,
      zipCode: req.body.zipCode,
    };

    try {
      let subscriber = await Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams });
      res.locals.redirect = `/subscribers/${subscriberId}`;
      res.locals.subscriber = subscriber;
      next();
    } catch (error) {
      console.log(`Error updating subscriber by ID: ${error.message}`);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    let subscriberId = req.params.id;

    try {
      await Subscriber.findByIdAndDelete(subscriberId);
      res.locals.redirect = "/subscribers";
      next();
    } catch (error) {
      console.log(`Error deleting subscriber by ID: ${error.message}`);
      next(error);
    }
  },
};