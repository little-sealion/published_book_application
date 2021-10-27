const express = require('express');
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
router.post('/users/create', (req, res) => {
  // extract post user form data from req.body
  const user = req.body;

  userModel
    .createUser(
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.password,
      user.accessRights
    )
    .then((result) => {
      res.status(200).json('user created with id' + result.insertId);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('query error - failed to create user');
    });
});

// OCT 22th *********************************************************************************************

//Define an /api/users/:id endpoint that get user from database by userId
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userModel
    .getUserById(id)
    .then((results) => {
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
  userModel
    .updateUser(
      user.userId,
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.password,
      user.accessRights
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

// OCT 22th *********************************************************************************************

// This allows the server.js to import (require) the routes
module.exports = router;
