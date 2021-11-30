// import db from the other file
const db = require('../database');

// Define and export the method to get all users
module.exports.getAllUsers = () => {
  return db.query(
    'select userId,firstName,lastName,email,username,accessRights from users'
  );
};

module.exports.createUser = (
  firstName,
  lastName,
  email,
  username,
  password,
  accessRights
) => {
  return db.query(
    // bind parameters, to avoid malicious sql injection
    'insert into users (firstName,lastName,email,username,password,accessRights) values (?,?,?,?,?,?)',
    [firstName, lastName, email, username, password, accessRights]
  );
};

// Define and export the method to get an user by userId
module.exports.getUserById = (userId) => {
  return db.query('select * from users where userId = ?', [userId]);
};

// Define and export the method to get an user by username
module.exports.getUserByUsername = (username) => {
  return db.query('select * from users where username = ?', [username]);
};

module.exports.updateUser = (
  userId,
  firstName,
  lastName,
  email,
  username,
  password,
  accessRights
) => {
  // bind parameters, to avoid malicious sql injection
  return db.query(
    'update users set firstName = ?, lastName = ?, email = ?, username = ?, password = ?, accessRights = ? where userID = ?',
    [firstName, lastName, email, username, password, accessRights, userId]
  );
};

// Define and export the method to delete user
module.exports.deleteUser = (userId) => {
  return db.query('delete from users where userId = ? ', [userId]);
};
