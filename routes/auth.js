const authRoute = require('express').Router()
const {singupGetControler, singupPostControler, loginGetControler,loginPostControler, logout} = require('../controlers/authContoler')
const singupValidator = require('../validator/authValidator')




authRoute.get('/singup', singupGetControler)
authRoute.post('/singup',singupValidator, singupPostControler)
authRoute.get('/login', loginGetControler)
authRoute.post('/login', loginPostControler)
authRoute.get('/logout', logout)












module.exports = authRoute