const express = require('express');
const bcrypt = require('bcrypt');
// introduce the validator package to sanitise data sent from client side
const validator = require('validator');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/users', (req, res) => {
  userModel
    .getAllUsers()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('query error');
    });
});
// Define an /api/users/create endpoint that insert a new user into database
router.post('/users/create', async (req, res) => {
  // extract post user form data from req.body
  const user = req.body;
  let result = await userModel.getUserByUsername(user.username);
  if (result.length > 0) {
    res.status(400).json('username already exists');
  } else {
    // Hash password before inserting into the DB
    let hashedPassword = bcrypt.hashSync(user.password, 6);

    // sanitise data before insert into database
    userModel
      .createUser(
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword,
        validator.escape(user.accessRights)
      )
      .then((result) => {
        res.status(200).json('user created with id' + result.insertId);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json('query error - failed to create user');
      });
  }
});

//Define an /api/users/:id endpoint that get user from database by userId
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userModel
    .getUserById(id)
    .then((results) => {
      // if databse returns result, return success code to the frontend
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json('failed to get user by id');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to get user - query error');
    });
});

// Define an /api/users/update endpoint that updates an existing user
router.post('/users/update', (req, res) => {
  // the req.body represents the posted json data

  let user = req.body;
  //   Each of the names below reference the "name" attribute in the form

  let hashedPassword = user.password;
  if (!user.password.startsWith('$')) {
    hashedPassword = bcrypt.hashSync(user.password, 6);
  }
  // sanitise input data before insert into database
  userModel
    .updateUser(
      validator.escape(user.userId),
      validator.escape(user.firstName),
      validator.escape(user.lastName),
      validator.escape(user.email),
      validator.escape(user.username),
      hashedPassword,
      validator.escape(user.accessRights)
    )
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json('user updated');
      } else {
        res.status(404).json('user not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to update user - query error');
    });
});

router.post('/users/delete', (req, res) => {
  const { userId } = req.body;
  //   ask the model to delete user by userId
  console.log(userId);
  userModel
    .deleteUser(userId)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json('user deleted');
      } else {
        res.status(404).json('user not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to delete user - query error');
    });
});

router.post('/users/login', (req, res) => {
  // Get the login information
  let login = req.body;

  // Find a user with a matching username
  userModel
    .getUserByUsername(login.username)
    .then((results) => {
      if (results.length > 0) {
        // Get the first found user
        let user = results[0];
        // verify user's password
        if (bcrypt.compareSync(login.password, user.password)) {
          // The user is now authticated

          // set up session
          req.session.user = {
            userID: user.userID,
            accessRights: user.accessRights,
          };
          res.cookie('username', user.username, {
            maxAge: 900000,
            httpOnly: false,
          });
          res.cookie('accessRights', user.accessRights, {
            maxAge: 900000,
            httpOnly: false,
          });
          // let the client know the login is successful
          res.status(200).json('login successful');
        } else {
          res.status(400).json('username or password incorrect');
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json('failed to login - query error');
    });
});
router.post('/users/logout', (req, res) => {
  // Destroy the session
  req.session.destroy();
  res.status(200).json('logout successful');
});

// This allows the server.js to import (require) the routes
module.exports = router;
