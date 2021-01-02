const validatorRouter  = require('express').Router()

validatorRouter.get('/validator', (req, res, next)=>{
    res.render('playground/singup', {title:'validator playgorund'})
})

module.exports = validatorRouter