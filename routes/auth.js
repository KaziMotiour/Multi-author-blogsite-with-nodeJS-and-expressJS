const authRoute = require('express').Router()
const {singupGetControler, singupPostControler, loginGetControler,loginPostControler, logout} = require('../controlers/authContoler')


authRoute.get('/singup', singupGetControler)
authRoute.post('/singup', singupPostControler)
authRoute.get('/login', loginGetControler)
authRoute.post('/login', loginPostControler)
authRoute.get('/logout', logout)












module.exports = authRoute