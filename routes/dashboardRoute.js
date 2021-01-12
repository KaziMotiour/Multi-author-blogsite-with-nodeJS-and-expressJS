const dashboardRoute = require('express').Router()
const {
    dashboardControler, createProfileGetControler, 
    createProfilePostControler, editProfileGetControler,
    editProfilePostControler} = require('../controlers/dashboardControler');
const {isAuthenticate, isLoggedInUser} = require('../middleware/authMiddleware');
const profileValidor = require('../validator/profileValidor');

dashboardRoute.get('/', isAuthenticate, dashboardControler)
dashboardRoute.get('/create-profile', isAuthenticate, createProfileGetControler)
dashboardRoute.post('/create-profile', profileValidor, isAuthenticate, createProfilePostControler)
dashboardRoute.get('/edit-profile', isAuthenticate, editProfileGetControler)
dashboardRoute.post('/edit-profile', profileValidor, isAuthenticate, editProfilePostControler)
module.exports = dashboardRoute