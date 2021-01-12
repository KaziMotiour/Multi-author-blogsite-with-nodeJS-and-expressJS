require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');
const session = require('express-session')
const chalk = require('chalk')

const  MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.port || 5000

// uhCqcAgP7Qkc684F
let DB_Admin = process.env.DB_Admin
let DB_Password = process.env.DB_Password
const mongodbUri = `mongodb+srv://${DB_Admin}:${DB_Password}@cluster0.dfe62.mongodb.net/cluster0?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: mongodbUri,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });


// Import auth route
const setRoute = require('./routes/route');



// middleware section
// Import middleare 
const {bindUserWithRequest, isAuthenticate} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocal')
// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY|| 'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store:store,
       
    }),
    bindUserWithRequest(),
    setLocals()
]
app.use(middleware)



// set up view engine
app.set('view engine', 'ejs')
app.set('views','views')



// app route
setRoute(app)

// handle 404 error
app.use((req, res, next) =>{
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    if (error.status === 404){
        return res.render('pages/error/404', {flashMessage:{}})
    }
    res.render('pages/error/500',{flashMessage:{}})

})


mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() =>{
    app.listen(port, ()=>{
        console.log(chalk.green('Database is connected'));
        console.log(chalk.green(`server is running at port ${port}`));
    })
}).catch(err => console.log(err))

