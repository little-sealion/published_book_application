const express = require('express');
// const mysql = require('mysql');
// const db = require('./db.js')
const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
const server = express();
const port = 8000;
require('dotenv').config();

// introduce middleware to parse json data & web form data & use express-session
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// var sessionStore = new MySQLStore({},db);

// Enable session middleware we have stated
server.use(
  session({
    secret: process.env.SECRET,
    name: 'session_id',
    saveUninitialized: false,
    // store : sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 }, //equals to 14 days
    resave: false,
  })
);

server.use((req, res, next) => {
  console.log('req.session.user', req.session.user);
  // The user is logged in if they have session data
  let userLoggedIn = req.session.user != null;
  // Define a list of allowed urls for non-logged in users

  let allowedURLs = [
    '/index.html',
    '/js/index.js',
    '/js/header_nav_footer.js',
    '/login.html',
    '/js/login.js',
    '/css/style.css',
    '/css/book.css',
    '/api/users/login',
    '/api/books',
  ];
  // define urls that only admin can access
  let adminOnlyURLs = [
    '/list_users.html',
    '/create_user.html',
    '/update_user.html',
    'js/delete_user.js',
    'js/create_user.js',
    'js/update_user.js',
    '/delete_user.js',
    '/api/users/delete',
    '/api/users/update',
    '/api/users/create',
  ];

  // If the user is logged in
  if (userLoggedIn) {
    if (adminOnlyURLs.includes(req.originalUrl)) {
      // if user accessRights is admin
      if (req.session.user.accessRights == 'admin') {
        next();
      } else {
        res.redirect('/index.html');
      }
    } else {
      next();
    }
  }
  // Else(they are not logged in)
  else {
    console.log('req.originalUrl', req.originalUrl);
    if (
      allowedURLs.includes(req.originalUrl) ||
      req.originalUrl.match(/\/uploads\/.*/)
    ) {
      // Allow the guest user through
      next();
    } else {
      // If not allowed, redirect them to the login page
      res.redirect('/index.html');
    }
  }
});

server.use(express.static('frontend/views'));
// access control middleware

// Link up book controller
const bookController = require('./backend/controllers/bookController');
server.use('/api', bookController);

// Link up author controller
const authorController = require('./backend/controllers/authorController');
server.use('/api', authorController);

// Link up user controller
const userController = require('./backend/controllers/userController');
server.use('/api', userController);

server.listen(port, () => {
  console.log(`Backend is listening on http://localhost: ${port}`);
});
