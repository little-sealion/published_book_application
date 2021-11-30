const db = require('../database');

// define the method to get all authors
module.exports.getAllAuthors = () => {
  return db.query('select * from author');
};

// define the method to get an author by authorId
module.exports.getAuthorById = (id) => {
  return db.query('select * from author where authorID = ?', [id]);
};
