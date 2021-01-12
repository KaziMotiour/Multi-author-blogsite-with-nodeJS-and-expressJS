const {body, validationResult} = require('express-validator');
const validator = require('validator');
const Profile = require('../models/Profile');

module.exports = [
    body('name').not().isEmpty().withMessage('Name cannot be empty').isLength({max:50}).withMessage('max length 50').trim(),

    body('title').isLength({max:50}).withMessage('max length 100').trim(),
    body('bio').isLength({max:500}).withMessage('max length 500').trim(),
    body('website').custom(value=>{
        if (value) if(!validator.isURL(value)) throw new Error('Please provide a valid url')      
        return true    
    }),
    body('facebook').custom(value=>{
        if (value) if(!validator.isURL(value)) throw new Error('Please provide a valid url')      
        return true    
    }),
    body('twitter').custom(value=>{
        if (value) if(!validator.isURL(value)) throw new Error('Please provide a valid url')  
        return true    
        
    }),
    body('github').custom(value=>{
        if (value) if(!validator.isURL(value)) throw new Error('Please provide a valid url')      
        return true    
    }),

]