const express = require('express')
const mysql = require('mysql');
const db = require('./db.js')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const server = express()
const port = 6060
require('dotenv').config()

server.use(express.static('frontend/views'))
server.use("/api", express.static('backend'))

// introduce middleware to parse json data & web form data & use express-session
server.use(express.json())
server.use(express.urlencoded({extended:true}))



// user register endpoint
server.post('/api/register', async (req,res) => {
//    get & destruct username, password from req.body
    const {username,password} = req.body
    const hash = await bcrypt.hash(password,saltRounds)

    
    // check wether user exists in db
    const findsql = "select * from users where username=" + mysql.escape(username);
    db.query(findsql, (err,result,fields) => {
        if(err) return console.log(err);
        if(result.length !== 0 ){
            return res.send('user already exist')
        }else{
            // add user to database users table
            const insertsql = `insert into users (username,password) values 
            (${mysql.escape(username)},${mysql.escape(hash)})`

            db.query(insertsql, (err,result,fields) => {
                if(err) return console.log(err);
        
                // send back OK if user sucessfully registered
                res.status(200).json(
                    {
                        status:"user registered",
                        username,
                        "userId":result.insertId
                    }
                )
            })
        }
    })
})

// user login endpoint
server.post('/api/login', async (req,res) => {
    //    get & destruct username, password from req.body

    const {username,password} = req.body
    // verify wether the user exists
    const findsql = "select * from users where username=" + mysql.escape(username);
    db.query(findsql, (err,result,fields) => {
        if(err) return console.log(err);
        if(result.length !== 0 ){
            console.log(result[0])
            bcrypt.compare(password,result[0].password).then(result => {
               if(result){
                    const token = jwt.sign({username,password},process.env.SECRET)
                    // console.log(token) 
                    res.json({
                        success: true,
                        message: `login sucessfully, welcome ${username}`,
                        token
                    })
                }
               else{
                res.send(`login failed, password doesn't match`)
               }
            }).catch(err => console.log(err))
        }else{
            res.status(401).send("login failed, user doesn't exist")
        }  

    }) 
})

function isAuthenticate(req,res,next){
    if(req.authorization){
        jwt.verify(token,process.env.SECRET,(err,decoded) => {
          if(err) res.send('failed authentication')
          else{
              req.username = decode.username
          }
        })
    }
    next()
}

server.get('/hello',(req,res) => {
    console.log(req.headers['authorization'])
    res.send('hi')
})

  

server.listen(port, () => {
    console.log(`Backend is listening on http://localhost: ${port}`)
})