const mysql = require('mysql');
require('dotenv').config()

const dboption = {
  host:'localhost',
  user:process.env.DBUSER,
  password:process.env.DBPWD,
  database:'booksDB'
}
let connection = mysql.createConnection(dboption)

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
});

module.exports = connection;