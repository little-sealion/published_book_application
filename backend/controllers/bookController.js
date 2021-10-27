const express = require('express')

// create a router so that we can define API routes in this file
const router = express.Router()
// Acess the books model so that we can access book data in this file
const bookModel = require('../models/bookModel')
// Define a /api/books endpoint that responds with an array of all books
router.get('/books', async (req,res) => {
   let results
    try {
        results = await bookModel.getAllBooks()
        res.status(200).json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json("query error")
    }
})


// Define an /api/books/:id endpoint that responds with a specific book by id
router.get("/books/:id", (req,res) => {
    const {id} = req.params
    bookModel.getBookById(id)
    .then(results => {
        if(results.length > 0){
            res.status(200).json(results[0])
        }else{
            res.status(404).json("failed to find book by id") // not found 404 status code
        }
    }).catch(error => {
        // log sql errors to node console
        console.log(error)
        res.status(500).json("query error") //Server error 500 status code
    })
})

// export this router for other files to require
module.exports = router