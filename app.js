const express = require("express")
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');
const port = process.env.port || 5000


// Import auth route
const authRoute = require('./routes/auth');

// Import Validate route
const validatorRouter = require('./playground/validator') // todo should be romove
// set up view engine
app.set('view engine', 'ejs')
app.set('views','views')

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json()
]
app.use(middleware)


app.use('/auth', authRoute)
app.use('/playground', validatorRouter) // todo should be romove

app.get('/', (req, res)=>{
    res.render('pages/auth/singup',{title:"Create a new account"})
})


mongoose.connect(`mongodb+srv://motiour:uhCqcAgP7Qkc684F@cluster0.dfe62.mongodb.net/cluster0?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    app.listen(port, ()=>{
        console.log('Database is connected');
        console.log(`server is running at port ${port}`);
    })
}).catch(err => console.log(err))

