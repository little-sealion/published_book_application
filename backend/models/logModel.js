const db = require('../database');

// bind parameters, to avoid malicious sql injection

// Define and export the method to get a log by logId
module.exports.getCreatedLogByBookId = (bookId) => {
  return db.query(
    'select * from changelog where bookID = ? and not dateCreated = null',
    [bookId]
  );
};
// Define and export the method to insert a log
module.exports.createLog = (dateCreated, dateChanged, bookId, userId) => {
  return db.query(
    // bind parameters,avoid sql injection
    'insert into changelog (dateCreated,dateChanged,bookId,userId) values (?,?,?,?)',
    [dateCreated, dateChanged, bookId, userId]
  );
};
