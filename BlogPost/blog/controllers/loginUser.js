const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
            if (same) { // if passwords match
                // store user session, will talk about it later
                req.session.userId = user._id;
                console.log("user: " + user.username + " logged in.");
                res.redirect('/');
            } else {
                res.redirect('/auth/login');
                console.log("Entered password does not match.");
            }
        })
    }
    else {
        res.redirect('/auth/login');
        console.log("No user found.");
    }
}
