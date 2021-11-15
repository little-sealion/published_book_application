// import mysql2 module so that we can talk to the database
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.DBUSER,
  password: process.env.DBPWD,
  database: 'sample_books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// This wrapper willallow the use of promise functions
// like .then() and .catch() so that we can use it in an async
// way along with expressJS.
const query = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// export the new query function so that the models can use it
module.exports = { query };
