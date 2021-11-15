const db = require('../database');

// bind parameters, to avoid malicious sql injection

module.exports.getCreatedLogByBookId = (bookId) => {
  return db.query(
    'select * from changelog where bookID = ? and not dateCreated = null',
    [bookId]
  );
};

module.exports.createLog = (dateCreated, dateChanged, bookId, userId) => {
  return db.query(
    'insert into changelog (dateCreated,dateChanged,bookId,userId) values (?,?,?,?)',
    [dateCreated, dateChanged, bookId, userId]
  );
};
