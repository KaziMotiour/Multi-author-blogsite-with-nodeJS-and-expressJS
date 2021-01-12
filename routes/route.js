const authRoute = require('./auth');
const dashboardRoute = require('./dashboardRoute');
const validatorRouter = require('../playground/play')
const uploadRoute = require('./uploadRoute');

const routers = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/',
        handler:dashboardRoute
    },
    {
        path:'/playground',
        handler:validatorRouter
    },
    {
        path:'/uploads',
        handler:uploadRoute
    },
    
]

module.exports = app =>{
    routers.map(data=>{
        app.use(data.path, data.handler)
    })
}