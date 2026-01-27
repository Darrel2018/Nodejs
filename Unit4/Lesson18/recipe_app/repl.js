const mongoose = require("mongoose"),
Subscriber = require("./models/subscriber");
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/recipe_db");

// var subscriber;

// Subscriber.findOne({
//     name: "Jon"
// }).then(result => {
//     subscriber = result;
//     console.log(subscriber.getInfo());
// });

// const Course = require("./models/course");

// var testCourse, testSubscriber;

// Course.create({
//   title: "Tomato2 Land",
//   description: "Locally farmed tomatoes only2",
//   zipCode: 12345,
//   items: ["cherry", "heirloom"]
// })
// .then(course => {
//   return Subscriber.findOne({}).then(subscriber => {
//     subscriber.courses.push(course._id);
//     return subscriber.save();
//   });
// })
// .then(subscriber => {
//   return Subscriber.populate(subscriber, "courses");
// })
// .then(subscriber => {
//   console.log(subscriber);
// })
// .catch(err => console.error(err));

//------------------------------------------------------------------

// async function createTestUser() {
//   try {
//     const testUser = await User.create({
//       name: {
//         first: "Good",
//         last: "Boii"
//       },
//       email: "goodboii@boii.com",
//       password: "pass123"
//     });
//     console.log(testUser); 
//     return testUser;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// createTestUser();

// async function findSubscriber() {
//   try {
//     const targetSubscriber = await Subscriber.findOne({ email: testUser.email });
//     console.log(targetSubscriber);
//     return targetSubscriber;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// findSubscriber();

async function createAndLinkUser() {
  try {
    const testUser = await User.create({
      name: {
        first: "Jon",
        last: "Wexler"
      },
      email: "jon@jonwexler.com",
      password: "pass123"
    });
    
    const subscriber = await Subscriber.findOne({ email: testUser.email });
    
    testUser.subscribedAccount = subscriber;
    await testUser.save();
    
    console.log("user updated");
    console.log(testUser);
    return testUser;
  } catch (error) {
    console.log(error.message);
  }
}
createAndLinkUser();
