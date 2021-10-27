
// Access the database connection from databse.js
const db = require('../database.js')


module.exports.getAllBooks = () => {
    return db.query('select * from book')
}

module.exports.getBookById = (id) => {
    return db.query("select * from book where bookID = ?",[id])
}

module.exports.createBook = () => {
    return db.query("select * from book where bookID = ?",[id])
}