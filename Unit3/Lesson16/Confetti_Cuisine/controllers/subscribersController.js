const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            console.log(`DEBUG: found subscribers: ${subscribers}`);
            res.render("subscribers", {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber.save()
        .then(() => {
            console.log(`Adding new subscriber: ${newSubscriber}`);
            res.render("thanks");
        })
        .catch(error => {
            res.send(error);
        });
};

/*
Code Summary

This code defines a controller for managing subscribers in an Express/Mongoose application. It handles retrieving subscribers, displaying 
the subscription form, and saving new subscriber data to the database.

Key features include:
Model Integration: Uses the Subscriber Mongoose model to interact with the subscribers collection in MongoDB.

Retrieve Subscribers:
getAllSubscribers fetches all subscriber records from the database.
Renders a subscribers view and passes the retrieved data to it.
Includes basic logging for debugging and promise completion.

Render Subscription Page:
getSubscriptionPage renders the contact view, which contains the subscription form.

Save New Subscriber:
saveSubscriber creates a new subscriber using form data from the request body.
Saves the subscriber to the database and renders a thanks page upon success.

Sends an error response if saving fails.

Overall, this controller encapsulates all subscriber-related business logic, keeping database operations and view rendering separate from route 
definitions in the main application.
*/