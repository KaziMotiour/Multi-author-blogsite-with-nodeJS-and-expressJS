const dashboardRoute = require('express').Router()
const {dashboardControler} = require('../controlers/dashboardControler');
dashboardRoute.get('/', dashboardControler)
module.exports = dashboardRoute