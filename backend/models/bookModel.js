// Access the database connection from databse.js
const db = require('../database.js');

module.exports.getAllBooks = async () => {
  // get all the books info from book table , left join changelog table to get the latest changedate and the createdATE
  return db.query(
    `select book.bookID,bookTitle,originalTitle,yearofPublication,genre,millionsSold,
    languageWritten,coverImagePath,book.authorID, createLog.dateCreated,changeLog.lastUpdated from book 
    left join 
    (select bookID, dateCreated from changelog where dateCreated is not null) as createLog
    on book.bookID = createLog.bookID
    left join
    (select bookID,max(dateChanged)as lastUpdated from changelog group by bookID) as changeLog
      on book.bookID = changeLog.bookID`
  );
};

module.exports.getBookById = (id) => {
  return db.query('select * from book where bookID = ?', [id]);
};

// bind parameters, to avoid malicious sql injection
module.exports.createBook = (
  bookTitle,
  originalTitle,
  yearofPublication,
  genre,
  millionsSold,
  languageWritten,
  coverImagePath,
  authorID
) => {
  return db.query(
    'insert into book (  bookTitle,originalTitle,yearofPublication,genre,millionsSold,languageWritten,coverImagePath,authorID) values (?,?,?,?,?,?,?,?)',
    [
      bookTitle,
      originalTitle,
      yearofPublication,
      genre,
      millionsSold,
      languageWritten,
      coverImagePath,
      authorID,
    ]
  );
};

module.exports.updateBook = (
  bookId,
  bookTitle,
  originalTitle,
  yearofPublication,
  genre,
  millionsSold,
  languageWritten,
  coverImagePath,
  authorID
) => {
  return db.query(
    'update book set bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ? ,coverImagePath = ?, authorID = ? where bookID = ?',
    [
      bookTitle,
      originalTitle,
      yearofPublication,
      genre,
      millionsSold,
      languageWritten,
      coverImagePath,
      authorID,
      bookId,
    ]
  );
};

module.exports.deleteBook = (bookId) => {
  return db.query('delete from book where bookID = ?', [bookId]);
};
