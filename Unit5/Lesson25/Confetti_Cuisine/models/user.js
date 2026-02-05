const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const Subscriber = require("./subscriber");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999
        },
        // password: {
        //     type: String,
        //     required: true
        // },
        courses: [
            {
                type: Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        subscribedAccount: {
            type: Schema.Types.ObjectId,
            ref: "Subscriber"
        }
    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

// userSchema.pre("save", async function(next) {
//   let user = this;
  
//   try {
//     // Hash the user's password
//     const hash = await bcrypt.hash(user.password, 10);
//     user.password = hash;
//     // next();
//   } catch (error) {
//     console.log(`Error in hashing password: ${error.message}`);
//     next(error);
//   }
// });

// // Add a function to compare hashed passwords
// userSchema.methods.passwordComparison = function(inputPassword) {
//   let user = this;
//   return bcrypt.compare(inputPassword, user.password);
// };

userSchema.pre("save", async function (next) {
  let user = this;
  
  if (user.subscribedAccount === undefined) {
    try {
      const subscriber = await Subscriber.findOne({
        email: user.email
      });
      user.subscribedAccount = subscriber;
    //   next();
    } catch (error) {
      console.log(`Error in connecting subscriber: ${error.message}`);
    //   next(error);
    }
  } else {
    // next();
  }
});

module.exports = mongoose.model("User", userSchema);