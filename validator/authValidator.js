const {body} = require('express-validator');

const User = require('../models/User');


module.exports = [
    
    // username validator
    body('username').isLength({min:2, max:15}).withMessage("User name must be 2 to fifteen character")
    .custom( async username =>{
        let user = await User.findOne({username})
        if(user){
            return Promise.reject('username already exist')
        }
    }).trim(),
    
    // email validator
    body('email').isEmail().withMessage('Please provide a valid email')
    .custom(async email =>{
        let useremail = await User.findOne({email})
        if (useremail){
            return Promise.reject('Email already exist')
        }
    }).normalizeEmail(),

    // passwoed validateor
    body('password').isLength({min:5}).withMessage("Password must be gatter then 5 charecter"),
   
    body('password2').custom((password2, {req}) =>{

        console.log(password2);
        if (password2 !== req.body.password){
            throw new Error('password dose not match')
        }
        return true
    })
]