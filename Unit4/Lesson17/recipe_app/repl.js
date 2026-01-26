const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db");

// Subscriber.create({
//     name: "Jon",
//     email: "jon@jonwexler.com",
//     zipCode: "12345"
// })
//     .then(subscriber => console.log(subscriber))
//     .catch(error => console.log(error.message));

// var subscriber;

// Subscriber.findOne({
//     name: "Jon"
// }).then(result => {
//     subscriber = result;
//     console.log(subscriber.getInfo());
// });

const Course = require("./models/course");

var testCourse, testSubscriber;

Course.create({
  title: "Tomato2 Land",
  description: "Locally farmed tomatoes only2",
  zipCode: 12345,
  items: ["cherry", "heirloom"]
})
.then(course => {
  return Subscriber.findOne({}).then(subscriber => {
    subscriber.courses.push(course._id);
    return subscriber.save();
  });
})
.then(subscriber => {
  return Subscriber.populate(subscriber, "courses");
})
.then(subscriber => {
  console.log(subscriber);
})
.catch(err => console.error(err));
