const db = require('../database')

module.exports.getAllAuthors = () => {
    return db.query('select * from author')
}

module.exports.getAuthorById = (id) => {
    return db.query("select * from author where authorID = ?",[id])
}