const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db");

let db = mongoose.connection;

db.once("open", () => {
    console.log("MongoDB connected succesfully to recipe_db");
});

var contacts = [
    {
        name: "snow Wexler",
        email: "snow@jonwexler.com",
        zipCode: 10016
    },
    {
        name: "Chef Eggplant",
        email: "eggplant@recipeapp.com",
        zipCode: 20331
    },
    {
        name: "Professor Souffle",
        email: "souffle@recipeapp.com",
        zipCode: 19103
    }
];

// Subscriber.deleteMany()
//     .exec()
//     .then(() => {
//         console.log("Subscriber data is empty!");
// });

// var commands = [];

// contacts.forEach((c) => {
//     commands.push(Subscriber.create({
//         name: c.name,
//         email: c.email,
//         zipCode: c.zipCode
//     }));
// });

// Promise.all(commands)
//     .then(r => {
//         console.log(JSON.stringify(r));
//         mongoose.connection.close();
//     })
//     .catch(error => {
//         console.log(`ERROR: ${error}`);
// });

Subscriber.deleteMany({})
  .then(() => {
    console.log("Subscriber data is empty!");

    const commands = [];

    contacts.forEach(c => {
      commands.push(
        Subscriber.create({
          name: c.name,
          email: c.email,
          zipCode: c.zipCode
        })
      );
    });

    return Promise.all(commands);
  })
  .then(results => {
    console.log(JSON.stringify(results));
    mongoose.connection.close();
  })
  .catch(err => console.error(err));