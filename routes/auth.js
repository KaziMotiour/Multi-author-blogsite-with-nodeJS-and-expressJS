const authRoute = require('express').Router()
const {singupGetControler, singupPostControler, loginGetControler,loginPostControler, logout} = require('../controlers/authContoler')
const singupValidator = require('../validator/authValidator')
const {isAuthenticate, isLoggedInUser} = require('../middleware/authMiddleware');




authRoute.get('/singup', isLoggedInUser, singupGetControler)
authRoute.post('/singup', isLoggedInUser, singupValidator, singupPostControler)
authRoute.get('/login', isLoggedInUser, loginGetControler)
authRoute.post('/login', isLoggedInUser, loginPostControler)
authRoute.get('/logout',isAuthenticate, logout)












module.exports = authRoute