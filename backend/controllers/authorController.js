const express = require('express')

// create a router so that we can define API routes in this file
const router = express.Router()
// Acess the books model so that we can access book data in this file
const authorModel = require('../models/authorModel')

// Define a /api/books endpoint that responds with an array of all books
router.get('/authors', (req,res) => {
    authorModel.getAllAuthors()
    .then(results => {
        res.status(200).json(results)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json("query error")
    })

})

// Define an /api/books/:id endpoint that responds with a specific book by id
router.get("/authors/:id", (req,res) => {
    const {id} = req.params
    authorModel.getAuthorById(id)
    .then(result => {
        if(result.length > 0){res.status(200).json(result)}
        else{res.status(404).json('failed to find user by id')}
    })
    .catch(error => {
        console.log(error)
        res.status(500).json('query error')
    })
})

// export this router for other files to require
module.exports = router