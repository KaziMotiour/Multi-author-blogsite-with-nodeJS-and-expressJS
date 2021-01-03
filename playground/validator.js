const validatorRouter  = require('express').Router()
const {check, validationResult} = require('express-validator')

validatorRouter.get('/validator', (req, res, next)=>{
    res.render('playground/singup', {title:'validator playgorund'})
})

validatorRouter.post('/validator',[

    check('username').not().isEmpty().withMessage("username is messing").isLength({max:15}).withMessage('Username Cannot be greter then fifteen charecter').trim,
    
    check('email').isEmail().withMessage('Provide a valid email').normalizeEmail(),

    check('password').custom(value =>{
        if (value.length <5 ){
            throw new Error('Password must be getter then 5 characters')
        }
        true
    }),
    check('password2').custom((value, {req})=>{
        if (value !== req.password){
            throw new Error('Password not matched')
        }
    })

], (req, res, next)=>{
    
    let error = validationResult(req)
    const formatter = (error) => error.msg 
    console.log(error.formatWith(formatter).mapped())
    res.render('playground/singup', {title:'validator playgorund'})

})

module.exports = validatorRouter