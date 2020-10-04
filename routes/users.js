const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User model
const User = require("../models/User");

// POST api/users. Sign up a new user

router.post("/api/users", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields." })
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists." })
            const newUser = new User({
                name,
                email,
                password
            });

            //generate salt to create hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        })

                })
            })
        })
});

module.exports = router