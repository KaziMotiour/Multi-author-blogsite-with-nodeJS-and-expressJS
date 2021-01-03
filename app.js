const express = require("express")
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');
const session = require('express-session')
const  MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.port || 5000



const mongodbUri = `mongodb+srv://motiour:uhCqcAgP7Qkc684F@cluster0.dfe62.mongodb.net/cluster0?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: mongodbUri,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
  });
// Import auth route
const authRoute = require('./routes/auth');

// Import dashboard route
const dashboardRoute = require('./routes/dashboardRoute');


// Import middleare 
const {bindUserWithRequest, isAuthenticate} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocal')

// set up view engine
app.set('view engine', 'ejs')
app.set('views','views')

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


app.use('/auth', authRoute)
app.use('/', isAuthenticate, dashboardRoute)

mongoose.connect(mongodbUri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    app.listen(port, ()=>{
        console.log('Database is connected');
        console.log(`server is running at port ${port}`);
    })
}).catch(err => console.log(err))

