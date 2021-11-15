const db = require('../database');

module.exports.getAllUsers = () => {
  return db.query(
    'select userId,firstName,lastName,email,username,accessRights from users'
  );
};
// bind parameters, to avoid malicious sql injection
module.exports.createUser = (
  firstName,
  lastName,
  email,
  username,
  password,
  accessRights
) => {
  return db.query(
    'insert into users (firstName,lastName,email,username,password,accessRights) values (?,?,?,?,?,?)',
    [firstName, lastName, email, username, password, accessRights]
  );
};

module.exports.getUserById = (userId) => {
  return db.query('select * from users where userId = ?', [userId]);
};

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
  return db.query(
    'update users set firstName = ?, lastName = ?, email = ?, username = ?, password = ?, accessRights = ? where userID = ?',
    [firstName, lastName, email, username, password, accessRights, userId]
  );
};

module.exports.deleteUser = (userId) => {
  return db.query('delete from users where userId = ? ', [userId]);
};
