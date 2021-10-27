const express = require('express');
// const mysql = require('mysql');
// const db = require('./db.js')
// const session = require('express-session')
// const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const server = express();
const port = 8000;
require('dotenv').config();

server.use(express.static('frontend/views'));

// introduce middleware to parse json data & web form data & use express-session
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Link up book controller
const bookController = require('./backend/controllers/bookController');
server.use('/api', bookController);

// Link up author controller
const authorController = require('./backend/controllers/authorController');
server.use('/api', authorController);

// Link up user controller
const userController = require('./backend/controllers/userController');
server.use('/api', userController);

// var sessionStore = new MySQLStore({},db);
// server.use(session({
//     secret : process.env.SECRET,
//     name:'session_id',
//     saveUninitialized : true,
//     store : sessionStore,
//     cookie : {maxAge: 1000 * 60 * 60 * 24 * 14}, //equals to 14 days
//     resave : false
// }))

// // user register endpoint
// server.post('/api/register', async (req,res) => {
// //    get & destruct username, password from req.body
//     const {username,password} = req.body
//     const hash = await bcrypt.hash(password,saltRounds)

//     // check wether user exists in db
//     const findsql = "select * from users where username=" + mysql.escape(username);
//     db.query(findsql, (err,result,fields) => {
//         if(err) return console.log(err);
//         if(result.length !== 0 ){
//             return res.send('user already exist')
//         }else{
//             // add user to database users table
//             const insertsql = `insert into users (username,password) values (?,?)`
//             db.query(insertsql,[username,password], (err,result,fields) => {
//                 if(err) return console.log(err);

//                 // send back OK if user sucessfully registered
//                 res.status(200).type("json").send(JSON.stringify(
//                     {
//                         "status":"user registered",
//                         "username":username,
//                         "userId":result.insertId
//                     }
//                 ))
//             })
//         }
//     })
// })

// // user login endpoint
// server.post('/api/login', async (req,res) => {
//     //    get & destruct username, password from req.body

//     const {username,password} = req.body
//     // verify wether the user exists
//     const findsql = "select * from users where username=" + mysql.escape(username);
//     db.query(findsql, (err,result,fields) => {
//         if(err) return console.log(err);
//         if(result.length !== 0 ){
//             console.log(result[0])
//             bcrypt.compare(password,result[0].password).then(result => {
//                if(result){
//                     req.session.username = username;
//                     // console.log(req.session)
//                      res.send(`login sucessfully, welcome ${username}`)
//                     // res.redirect('/add_book.html')

//                 }
//                else{
//                 res.send(`login failed, password doesn't match`)
//                }
//             }).catch(err => console.log(err))
//         }else{
//             res.status(401).send("login failed, user doesn't exist")
//         }
//     })
// })
// server.get('/protected',isAuthenticated,(req,res) => {
//     res.send('congratulations, you are authenticated!')
// })

// server.get('/api/books',isAdmin,(req,res) => {
//     const findBooksSql = "select * from book"
//     db.query(findBooksSql, (err,result,fields) => {
//         // console.log(result)
//         if(err) res.send(err)

//         else(res.json(result))
//     })
// })

// server.post('/api/logout',(req,res) => {
//     req.session.destroy()
// })

// function isAuthenticated(req, res, next) {
//     if (req.session.username){
//         return next();
//     }else
//       res.redirect('/login.html')
// }
// function isAdmin(req, res, next) {
//     if (req.session.username === 'administrator'){
//         return next();
//     }else{
//         res.status(401).send('only admin can access, permission denied')
//     }

// }

server.listen(port, () => {
  console.log(`Backend is listening on http://localhost: ${port}`);
});
