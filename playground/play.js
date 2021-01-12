const validatorRouter  = require('express').Router()
const {check, validationResult} = require('express-validator')
const upload = require('../middleware/uploadMiddleware');

validatorRouter.get('/play', (req, res, next)=>{
    res.render('playground/play', {title:' playgorund'})
})

validatorRouter.post('/play', upload.single('file'), (req, res, next)=>{

    // if(req.file){
    //     console.log(req.file);
    // }
    
    res.render('playground/play', {title:'playgorund'})

})

module.exports = validatorRouter