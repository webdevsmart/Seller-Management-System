const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: 'Super Administrator',
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


// @route POST api/users/add
// @desc Add user
// @access Public
router.post("/add", (req, res) => {
  // Form validation

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


// @route POST api/users/update
// @desc update user
// @access Public
router.post("/update", (req, res) => {
  // Form validation
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      const newUser = { $set: {
          name: req.body.name,
          email: req.body.email,
          password: hash
        }
      };
      User.updateOne({_id: req.body._id}, newUser, function(err, response) {
        return res.status(200).json({message: "Success"});
      });
    });
  });
});


// @route GET api/users/list
// @desc list user
// @access Public
router.get("/list", (req, res) => {
  // Form validation

  User.find().then(users => {
    res.json(users);
  });
});


// @route GET api/users/get
// @desc Get all users
// @access Public
router.get("/get", (req, res) => {
  // Form validation

  User.findOne({_id: req.query.uid}).then(user => {
    res.json(user);
  });
});


// @route GET api/users/get
// @desc Get all users
// @access Public
router.post("/delete", (req, res) => {
  User.deleteOne({_id: req.query.uid}).then(response => {
    return res.status(200).json({message: "Success"});
  });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              user: user,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
