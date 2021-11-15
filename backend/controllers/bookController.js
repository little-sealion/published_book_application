const express = require('express');
const validator = require('validator');
const multer = require('multer');
const date = require('date-and-time');

// create a router so that we can define API routes in this file
const router = express.Router();
// Acess the books model so that we can access book data in this file
const bookModel = require('../models/bookModel');
const logModel = require('../models/logModel');
const upload = multer({ dest: 'frontend/views/uploads' });

// Define a /api/books endpoint that responds with an array of all books
router.get('/books', async (req, res) => {
  let results;
  try {
    results = await bookModel.getAllBooks();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json('query error');
  }
});

// Define an /api/books/:id endpoint that responds with a specific book by id
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  bookModel
    .getBookById(id)
    .then((results) => {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json('failed to find book by id'); // not found 404 status code
      }
    })
    .catch((error) => {
      // log sql errors to node console
      console.log(error);
      res.status(500).json('query error'); //Server error 500 status code
    });
});

// Define an /api/books/create endpoint that insert a new book into database
router.post('/books/create', upload.single('coverImagePath'), (req, res) => {
  // extract post book form data from req.body
  const book = req.body;
  const now = new Date();
  let coverImagePath = 'uploads/' + req.file.originalname;
  bookModel
    .createBook(
      validator.escape(book.bookTitle),
      validator.escape(book.originalTitle),
      validator.escape(book.yearofPublication),
      validator.escape(book.genre),
      validator.escape(book.millionsSold),
      validator.escape(book.languageWritten),
      coverImagePath,
      validator.escape(book.authorID)
    )
    .then((result) => {
      res.status(200).json('book created with id' + result.insertId);
      console.log('req.session', req.session);
      logModel
        .createLog(
          date.format(now, 'YYYY/MM/DD HH:mm:ss'),
          null,
          result.insertId,
          req.session.user.userID
        )
        .then((result) => console.log(result.insertId))
        .catch((err) => console.log(err.message));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('query error - failed to create book');
    });
});

// Define an /api/books/update endpoint that updates an existing book
router.post(
  '/books/update',
  upload.single('coverImagePath'),
  async (req, res) => {
    // the req.body represents the posted json data

    const book = req.body;
    const now = new Date();
    let result = await bookModel.getBookById(book.bookId);
    let coverImagePath = result[0].coverImagePath;
    if (req.file) {
      coverImagePath = 'uploads/' + req.file.originalname;
    }
    console.log('coverImagePath', coverImagePath);
    //   Each of the names below reference the "name" attribute in the form

    bookModel
      .updateBook(
        book.bookId,
        validator.escape(book.bookTitle),
        validator.escape(book.originalTitle),
        validator.escape(book.yearofPublication),
        validator.escape(book.genre),
        validator.escape(book.millionsSold),
        validator.escape(book.languageWritten),
        coverImagePath,
        validator.escape(book.authorID)
      )
      .then((result) => {
        if (result.affectedRows > 0) {
          res.status(200).json('book updated');
          logModel
            .createLog(
              null,
              date.format(now, 'YYYY/MM/DD HH:mm:ss'),
              book.bookId,
              req.session.user.userID
            )
            .then((result) => console.log(result.insertId))
            .catch((err) => console.log(err.message));
        } else {
          res.status(404).json('book not found');
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json('failed to update book - query error');
      });
  }
);

router.post('/books/delete', (req, res) => {
  const { bookId } = req.body;
  //   ask the model to delete user by userId
  bookModel
    .deleteBook(bookId)
    .then((result) => {
      if (result.affectedRows > 0) {
        res.status(200).json('Book deleted');
      } else {
        res.status(404).json('Book not found');
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json('failed to delete book - query error');
    });
});

// export this router for other files to require
module.exports = router;
